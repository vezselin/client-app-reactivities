import {Grid} from "semantic-ui-react";
import ActivitiesList from "./ActivityList.tsx";
import ActivityDetails from "../details/ActivityDetails.tsx";
import ActivityForm from "../details/ActivityForm.tsx";
import {useStore} from "../../../app/stores/store.ts";
import {observer} from "mobx-react-lite";

export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore
    return (
        <Grid>
            <Grid.Column width={"10"}>
                <ActivitiesList/>
            </Grid.Column>
            <Grid.Column width={"6"}>
                {selectedActivity &&
                    <>
                        <ActivityDetails/>
                    </>
                }
                {editMode &&
                    <ActivityForm/>
                }
            </Grid.Column>
        </Grid>
    )
})