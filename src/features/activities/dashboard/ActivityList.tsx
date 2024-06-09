import {Activity} from "../../../app/models/activity.ts";
import {Segment, Item, Button, Label} from "semantic-ui-react";

interface ActivityListProps {
    activities: Activity[],
    selectActivity: (id: string) => void,
    deleteActivity: (id: string) => void
}

export default function ActivitiesList({activities, selectActivity, deleteActivity}: ActivityListProps) {
    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as="a">{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}</div>
                                <div>{activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectActivity(activity.id)} floated="right" content="View"
                                        color={"blue"}></Button>
                                <Button onClick={() => deleteActivity(activity.id)} floated="right" content="Delete"
                                        color={"red"}></Button>
                                <Label basic content={activity.category}></Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}