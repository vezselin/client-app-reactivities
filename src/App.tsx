import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {Header, List} from "semantic-ui-react";

function App() {
    const [activities,setActivities] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:5000/api/activities').then(res => setActivities(res.data))
    },[])
  return (
      <>
          <Header as='h1' icon='users' content='Reactities'/>
          <List>
              {activities.map(
                  (activity: any)=>(
                  <List.Item
                        key={activity.id}>{activity.id}</List.Item>
              ))}
          </List>
      </>
  )
}

export default App
