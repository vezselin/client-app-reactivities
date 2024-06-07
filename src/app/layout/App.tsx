import './styles.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {List} from "semantic-ui-react";
import {Activity} from "../models/activity.ts";
import Navbar from "./Navbar.tsx";

function App() {
    const [activities,setActivities] = useState<Activity[]>([])

    useEffect(()=>{
        axios.get<Activity[]>('http://localhost:5000/api/activities').then(res => setActivities(res.data))
    },[])
  return (
      <>
          <Navbar/>
          <List>
              {activities.map(activity =>(
                  <List.Item key={activity.id}>
                      {activity.title}
                  </List.Item>
              ))}
          </List>
      </>
  )
}

export default App
