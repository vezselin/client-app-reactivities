import {Segment, Item, Button, Label} from "semantic-ui-react";
import {SyntheticEvent, useState} from "react";
import {useStore} from "../../../app/stores/store.ts";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";

export default observer(function ActivitiesList() {
    const {activityStore} = useStore();
    const {deleteActivity,activitiesByDate,loading} = activityStore;
    const [target,setTarget] = useState('');

    function handleActivityDelete(event: SyntheticEvent<HTMLButtonElement>, id:string) {
        setTarget(event.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
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
                ))}
            </Item.Group>
        </Segment>
    )
})
