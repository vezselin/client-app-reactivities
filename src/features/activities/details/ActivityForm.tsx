import {Button, Form, Segment} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity.ts";
import {ChangeEvent, useEffect, useState} from "react";
import {useStore} from "../../../app/stores/store.ts";
import {observer} from "mobx-react-lite";



export default observer(function ActivityForm() {
    const {activityStore} = useStore();
    const {selectedActivity, closeForm, createActivity, updateActivity, loading} = activityStore
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
        activity.id ? updateActivity(activity) : createActivity(activity);
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
                <Form.Input type='date' placeholder={"Date"} value={activity.date} name={'date'}
                            onChange={handleChange}></Form.Input>
                <Form.Input placeholder={"City"} value={activity.city} name={'city'}
                            onChange={handleChange}></Form.Input>
                <Form.Input placeholder={"Venue"} value={activity.venue} name={'venue'}
                            onChange={handleChange}></Form.Input>
                <Button loading={loading} type="submit" floated="right" content="Submit" positive></Button>
                <Button onClick={closeForm} type="button" floated="right" content="Cancel"></Button>
            </Form>
        </Segment>
    )
})