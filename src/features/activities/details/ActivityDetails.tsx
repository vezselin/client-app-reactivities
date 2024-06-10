import {Card, Image, ButtonGroup, Button} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store.ts";
import Loading from "../../../app/layout/Loading.tsx";

export default function ActivityDetails() {
    const {activityStore} = useStore();
    const {selectedActivity:activity, openForm, cancelSelectedActivity} = activityStore

    if(!activity) return <Loading></Loading>;

    return (
        <Card fluid key={activity.id}>
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
                    <Button onClick={cancelSelectedActivity} basic color={"grey"} content={"Cancel"}></Button>
                </ButtonGroup>
            </Card.Content>
        </Card>
    )
}