import './styles.css'
import {useEffect, useState} from "react";
import {Container} from "semantic-ui-react";
import {Activity} from "../models/activity.ts";
import Navbar from "./Navbar.tsx";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";
import {v4 as uuid} from "uuid"
import agent from '../api/agent.ts';
import Loading from "./Loading.tsx";

function App() {
    const [activities,setActivities] = useState<Activity[]>([])
    const [selectedActivities,setSelectedActivities] = useState<Activity | undefined>(undefined)
    const [editMode,setEditMode] = useState<boolean>(false)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)

    useEffect(()=>{
        agent.Activities.list().then(res =>{
            const activities: Activity[] = [];
            res.forEach(activity =>{
                activity.date = activity.date.split('T')[0]
                activities.push(activity)
            })
            setActivities(activities)
            setLoading(false)
        })
    },[])

    function HandleSelectActivity(id:string){
        handleFormClose();
        setSelectedActivities(activities.find(activity=>activity.id === id))
    }

    function handleCancelSelectedActivity(){
        setSelectedActivities(undefined)
        setEditMode(false)
    }

    function handleFormOpen(id?:string){
        if (id) {
            HandleSelectActivity(id)
        } else {
            handleCancelSelectedActivity()
        }
        setEditMode(true);

    }

    function handleFormClose(){
        setSelectedActivities(undefined)
        setEditMode(false);
    }

    function handleCreateOrEditActivity(activity:Activity){
        // setActivities(activities.map(activity =>
        //     activity.id === updatedActivity.id ? updatedActivity : activity
        // )); This one will only edit the activity and keep it in the same position
        setSubmitting(true);
        if(activity.id){
            agent.Activities.update(activity).then(()=>{
                setActivities([...activities.filter(a=> a.id !== activity.id), activity])
                setSelectedActivities(activity);
                setEditMode(false);
                setSubmitting(false);
            })
        } else{
            activity.id = uuid()
            agent.Activities.create(activity).then(()=>{
                setActivities([...activities , {...activity, id: uuid()}])
                setSelectedActivities(activity);

                setEditMode(false);
                setSubmitting(false);
            })
        }
    }

    function HandleDeleteActivity(id:string){
        setSubmitting(true)
        agent.Activities.delete(id).then(()=>{
            setActivities([...activities.filter(a=>a.id != id)])
            setSubmitting(false);
        })
    }

if (loading) return <Loading content={"Loading activities"}/>
  return (
      <>
          <Navbar openForm={handleFormOpen}/>
          <Container style={{marginTop:'7em'}}>
            <ActivityDashboard activities={activities}
                               selectedActivity={selectedActivities}
                               selectActivity={HandleSelectActivity}
                               cancelSelectActivity={handleCancelSelectedActivity}
                               editMode={editMode}
                               openForm={handleFormOpen}
                               closeForm={handleFormClose}
                               createOrEditActivity={handleCreateOrEditActivity}
                               deleteActivity={HandleDeleteActivity}
                               submitting={submitting}
            />
          </Container>
      </>
  )
}

export default App
