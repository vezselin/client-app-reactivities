import {observer} from "mobx-react-lite";
import {Button, Item, Label} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {Activity} from "../../../app/models/activity.ts";
import {useStore} from "../../../app/stores/store.ts";
import {SyntheticEvent, useState} from "react";

interface ActivityListItemProps {
    activity: Activity;
}

export default observer (function ActivityListItem({activity}: ActivityListItemProps){
    const {activityStore} = useStore();
    const {deleteActivity,loading} = activityStore;
    const [target,setTarget] = useState('');

    function handleActivityDelete(event: SyntheticEvent<HTMLButtonElement>, id:string) {
        setTarget(event.currentTarget.name);
        deleteActivity(id);
    }
    return(
        <Item key={activity.id + " in List"}>
            <Item.Content>
                <Item.Header as="a">{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                    <div>{activity.description}</div>
                    <div>{activity.city}</div>
                    <div>{activity.venue}</div>
                </Item.Description>
                <Item.Extra>
                    <Button as={Link} to={`/activities/${activity.id}`} floated="right" content="View"
                            color={"blue"}></Button>
                    <Button onClick={(e) => handleActivityDelete(e,activity.id)} loading={loading && target === activity.id} name={activity.id} floated="right" content="Delete"
                            color={"red"}></Button>
                    <Label basic content={activity.category}></Label>
                </Item.Extra>
            </Item.Content>
        </Item>
    )
})