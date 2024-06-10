import {makeAutoObservable, runInAction} from "mobx";
import {Activity} from "../models/activity.ts";
import agent from "../api/agent.ts";
import {v4 as uuid} from "uuid";
export default class ActivityStore{

    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true

    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate(){
        return Array.from((this.activityRegistry.values()))
            .sort((activityA, activityB)=> Date.parse(activityA.date) - Date.parse(activityB.date));
    }

    setLoadingInitial = (state:boolean) =>{
        this.loadingInitial = state;
    }

    loadActivities = async () =>{
        try{
            // throw error;
            const activities = await agent.Activities.list();
            // 2nd Alternative with Map object
            activities.forEach(activity =>{
                    activity.date = activity.date.split('T')[0]
                    this.activityRegistry.set(activity.id, activity)
            // 1st Alternative mapping an object
            // this.activities = activities.map(activity => ({
            //     ...activity,
            //     date: activity.date.split('T')[0],
            //     }))
            // Using push for some reason adds the second fetch from useEffect to the activity list and causing re-render and child with same key
            // activities.forEach(activity =>{
            //     activity.date = activity.date.split('T')[0]
            //     this.activities.push(activity)
            })
            this.setLoadingInitial(false);
        }catch(err){
            console.error(err);
            this.setLoadingInitial(false);
                console.log("Manual error")
        }
    }
    selectActivity = (id:string) =>{
        this.selectedActivity = this.activityRegistry.get(id)
    }
    cancelSelectedActivity = () =>{
        this.selectedActivity = undefined;
    }
    openForm=(id?:string) =>{
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }
    closeForm = ()=>{
        this.editMode = false
    }
    createActivity = async (activity:Activity) =>{
        this.loading = true;
        activity.id = uuid()
        try{
            await agent.Activities.create(activity);
            runInAction(()=>{
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false
                this.loading = false;
            })
        }catch (error){
            runInAction(()=>{
                this.loading = false;
            })
        }
    }
    updateActivity = async (activity:Activity) =>{
    this.loading = true;
    try{
        await agent.Activities.update(activity);
        runInAction(()=>{
            this.activityRegistry.set(activity.id, activity);
            this.selectedActivity = activity;
            this.editMode = false;
            this.loading = false;
        })
    } catch (error){
        console.log(error)
        runInAction(()=>{
            this.loading = false;
        })
        }
    }
    deleteActivity = async(id:string) =>{
        this.loading = true;
        try{
            await agent.Activities.delete(id);
            runInAction(()=>{
                this.activityRegistry.delete(id);
                if (this.selectedActivity?.id === id){
                    this.selectedActivity = undefined;
                }
                this.loading = false;
            })
        }catch (error){
            console.log(error);
            runInAction(()=> {
                this.loading = false;
            })
        }
    }
}
