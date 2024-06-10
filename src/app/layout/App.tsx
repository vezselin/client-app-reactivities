import './styles.css'
import {useEffect} from "react";
import {Container} from "semantic-ui-react";
import Navbar from "./Navbar.tsx";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";
import Loading from "./Loading.tsx";
import {useStore} from "../stores/store.ts";
import {observer} from "mobx-react-lite";

function App() {

    const {activityStore} = useStore();

    useEffect(()=>{
        activityStore.loadActivities().then(
            ()=> {console.log('use effect executed')}
        );
    },[activityStore])

    if (activityStore.loadingInitial) return (<Loading content={"Loading activities"}/>)

    return (
        <>
            <Navbar/>
            <Container style={{marginTop:'7em'}}>
                <ActivityDashboard/>
            </Container>
        </>
    )
}

export default observer(App);
