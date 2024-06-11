import {Segment, Item} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store.ts";
import {observer} from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem.tsx";

export default observer(function ActivitiesList() {
    const {activityStore} = useStore();
    const {activitiesByDate} = activityStore;


    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <ActivityListItem activity={activity}/>
                ))}
            </Item.Group>
        </Segment>
    )
})
