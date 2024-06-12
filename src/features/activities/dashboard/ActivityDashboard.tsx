import {Grid} from "semantic-ui-react";
import ActivitiesList from "./ActivityList.tsx";
import {useStore} from "../../../app/stores/store.ts";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import Loading from "../../../app/layout/Loading.tsx";
import ActivityFilter from "./ActivityFilter.tsx";

export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;
    useEffect(()=>{
        if(activityRegistry.size <= 1 ) loadActivities();
    },[loadActivities,activityRegistry.size])

    if (activityStore.loadingInitial) return (<Loading content={"Loading activities"}/>)

    return (
        <Grid>
            <Grid.Column width={"10"}>
                <ActivitiesList/>
            </Grid.Column>
            <Grid.Column width={"6"}>
                <ActivityFilter/>
            </Grid.Column>
        </Grid>
    )
})