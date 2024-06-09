import {Grid} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity.ts";
import ActivitiesList from "./ActivityList.tsx";
import ActivityDetails from "../details/ActivityDetails.tsx";
import ActivityForm from "../details/ActivityForm.tsx";

// Props
interface ActivityDashboardProps {
    activities: Activity[],
    selectedActivity: Activity | undefined,
    selectActivity: (id: string) => void,
    cancelSelectActivity: () => void,
    editMode: boolean,
    openForm: (id: string) => void,
    closeForm: () => void,
    createOrEditActivity: (activity: Activity) => void,
    deleteActivity: (id: string) => void,
    submitting: boolean
}

export default function ActivityDashboard({
                                              activities,
                                              selectedActivity,
                                              selectActivity,
                                              cancelSelectActivity,
                                              editMode,
                                              openForm,
                                              closeForm,
                                              createOrEditActivity,
                                              deleteActivity,
                                              submitting
                                          }: ActivityDashboardProps) {
    return (
        <Grid>
            <Grid.Column width={"10"}>
                <ActivitiesList activities={activities} selectActivity={selectActivity}
                                deleteActivity={deleteActivity}
                submitting={submitting}/>
            </Grid.Column>
            <Grid.Column width={"6"}>
                {selectedActivity &&
                    <>
                        <ActivityDetails activity={selectedActivity}
                                         cancelSelectActivity={cancelSelectActivity}
                                         openForm={openForm}/>

                    </>
                }
                {editMode &&
                    <ActivityForm closeFrom={closeForm} activity={selectedActivity}
                                  createOrEdit={createOrEditActivity} submitting={submitting}/>
                }
            </Grid.Column>
        </Grid>
    )
}