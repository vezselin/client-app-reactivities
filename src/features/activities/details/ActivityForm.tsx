import {Button, Form, Segment} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity.ts";
import {ChangeEvent, useEffect, useState} from "react";

interface ActivityFormProps {
    activity?: Activity,
    closeFrom: () => void,
    createOrEdit: (activity: Activity) => void
}

export default function ActivityForm({closeFrom, activity: selectedActivity, createOrEdit}: ActivityFormProps) {

    const initialForm = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: '',

    }
    const [activity, setActivity] = useState<Activity>(initialForm);

    useEffect(() => {
        if (selectedActivity) {
            setActivity(selectedActivity);
        }
    }, [selectedActivity]);

    function handleSubmit() {
        console.log(activity);
        createOrEdit(activity)
    }

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Input placeholder={"Title"} value={activity.title} name={'title'}
                            onChange={handleChange}></Form.Input>
                <Form.Input placeholder={"Description"} value={activity.description} name={'description'}
                            onChange={handleChange}></Form.Input>
                <Form.Input placeholder={"Category"} value={activity.category} name={'category'}
                            onChange={handleChange}></Form.Input>
                <Form.Input placeholder={"Date"} value={activity.date} name={'date'}
                            onChange={handleChange}></Form.Input>
                <Form.Input placeholder={"City"} value={activity.city} name={'city'}
                            onChange={handleChange}></Form.Input>
                <Form.Input placeholder={"Venue"} value={activity.venue} name={'venue'}
                            onChange={handleChange}></Form.Input>
                <Button type="submit" floated="right" content="Submit" positive></Button>
                <Button onClick={closeFrom} type="button" floated="right" content="Cancel"></Button>
            </Form>
        </Segment>
    )
}