import {Button, Form, Segment} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity.ts";
import {useEffect, useState} from "react";
import {useStore} from "../../../app/stores/store.ts";
import {observer} from "mobx-react-lite";
import {Link, useParams} from "react-router-dom";
import Loading from "../../../app/layout/Loading.tsx";
import {Formik} from "formik";

export default observer(function ActivityForm() {
    const {activityStore} = useStore();
    const {loading,loadActivity,loadingInitial} = activityStore
    const {id} = useParams();
    const [activity,setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: '',
    })

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity((activity!)))
    }, [id,loadActivity]);

    // function handleSubmit() {
    //     if(!activity.id){
    //         activity.id= uuid();
    //         createActivity(activity).then(()=> navigate(`/activities/${activity.id}`));
    //     }
    //     else{
    //         updateActivity(activity).then(()=> navigate(`/activities/${activity.id}`));
    //     }
    // }
    //
    // function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     const {name, value} = event.target;
    //     setActivity({...activity, [name]: value});
    // }

    if(loadingInitial) {return <Loading/>}

    return (
        <Segment clearing>
            <Formik enableReinitialize initialValues={activity} autoComplete="off" onSubmit={values=> console.log(values)}>
                {({values: activity, handleChange, handleSubmit})=>(
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
                        <Button as={Link} to='/activities' type="button" floated="right" content="Cancel"></Button>
                    </Form>
                )}
            </Formik>

        </Segment>
    )
})