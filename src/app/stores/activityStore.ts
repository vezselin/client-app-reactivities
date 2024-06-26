import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity.ts";
import agent from "../api/agent.ts";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";
export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    private setActivity = (activity: Activity) => {
        activity.date = new Date(activity.date!);
        this.activityRegistry.set(activity.id, activity);
    };

    private getActivity(id: string) {
        return this.activityRegistry.get(id);
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort(
            (activityA, activityB) => activityA.date!.getTime() - activityB.date!.getTime()
        );
    }

    get groupedActivities() {
        //Array of object, each object has activity date as key
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = format(activity.date!, "dd MMMM yyyy");
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as { [key: string]: Activity[] })
        );
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            this.setLoadingInitial(true);
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                });
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    };

    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            // throw error;
            const activities = await agent.Activities.list();
            // 2nd Alternative with Map object
            activities.forEach((activity) => {
                this.setActivity(activity);
                // 1st Alternative mapping an object
                // this.activities = activities.map(activity => ({
                //     ...activity,
                //     date: activity.date.split('T')[0],
                //     }))
                // Using push for some reason adds the second fetch from useEffect to the activity list and causing re-render and child with same key
                // activities.forEach(activity =>{
                //     activity.date = activity.date.split('T')[0]
                //     this.activities.push(activity)
            });
            this.setLoadingInitial(false);
        } catch (err) {
            console.error(err);
            this.setLoadingInitial(false);
            console.log("Manual error");
        }
    };

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    };

    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    };
}
