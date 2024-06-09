import './styles.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {Container} from "semantic-ui-react";
import {Activity} from "../models/activity.ts";
import Navbar from "./Navbar.tsx";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";
import {v4 as uuid} from "uuid"

function App() {
    const [activities,setActivities] = useState<Activity[]>([])
    const [selectedActivities,setSelectedActivities] = useState<Activity | undefined>(undefined)
    const [editMode,setEditMode] = useState<boolean>(false)

    useEffect(()=>{
        axios.get<Activity[]>('http://localhost:5000/api/activities').then(res => setActivities(res.data))
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
        activity.id
            ? setActivities([...activities.filter(a=> a.id !== activity.id), activity])
            : setActivities([...activities , {...activity, id: uuid()}])
        setEditMode(false)
        setSelectedActivities(activity)
    }

    function HandleDeleteActivity(id:string){
        setActivities([...activities.filter(a=>a.id != id)])
    }

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
            />
          </Container>
      </>
  )
}

export default App
