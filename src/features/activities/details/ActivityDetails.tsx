import {Card, Image, ButtonGroup, Button} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity.ts";

interface ActivityDetailsProps {
    activity: Activity,
    cancelSelectActivity: () => void,
    openForm: (id: string) => void
}

export default function ActivityDetails({activity, cancelSelectActivity, openForm}: ActivityDetailsProps) {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false}/>
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths={2}>
                    <Button onClick={()=>openForm(activity.id)} basic color={"blue"} content={"Edit"}></Button>
                    <Button onClick={cancelSelectActivity} basic color={"grey"} content={"Cancel"}></Button>
                </ButtonGroup>
            </Card.Content>
        </Card>
    )
}