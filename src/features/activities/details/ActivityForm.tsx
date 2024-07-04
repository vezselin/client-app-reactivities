import { Button, Header, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity.ts'
import { useEffect, useState } from 'react'
import { useStore } from '../../../app/stores/store.ts'
import { observer } from 'mobx-react-lite'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loading from '../../../app/layout/Loading.tsx'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import MyTextInput from '../../../app/common/form/MyTextInput.tsx'
import MyTextArea from '../../../app/common/form/MyTextArea.tsx'
import MySelectInput from '../../../app/common/form/MySelectInput.tsx'
import { categoryOptions } from '../../../app/common/options/categoryOptions.ts'
import MyDatePicker from '../../../app/common/form/MyDatePicker.tsx'
import { v4 as uuid } from 'uuid'

export default observer(function ActivityForm() {
    const { activityStore } = useStore()
    const { loading, loadActivity, loadingInitial, createActivity, updateActivity } = activityStore
    const { id } = useParams()
    const navigate = useNavigate()

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: '',
    })

    const ValidationSchema = Yup.object({
        title: Yup.string().required('Please enter a title'),
        description: Yup.string().required('Please enter activity description'),
        category: Yup.string().required(),
        date: Yup.string().required(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    })

    useEffect(() => {
        if (id) loadActivity(id).then((activity) => setActivity(activity!))
    }, [id, loadActivity])

    function handleFormSubmit(activity: Activity) {
        if (!activity.id) {
            activity.id = uuid()
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        } else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }
    }

    if (loadingInitial) {
        return <Loading />
    }

    return (
        <Segment clearing>
            <Header content="Activity Details" sub color="teal" />
            <Formik
                enableReinitialize
                initialValues={activity}
                autoComplete="off"
                onSubmit={(values) => handleFormSubmit(values)}
                validationSchema={ValidationSchema}
            >
                {({ handleSubmit, isSubmitting, isValid, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <MyTextInput name={'title'} placeholder={'title'} />
                        <MyTextArea placeholder={'Description'} name={'description'} rows={3} />
                        <MySelectInput options={categoryOptions} placeholder={'Category'} name={'category'} />
                        <MyDatePicker
                            placeholderText="Date"
                            name="date"
                            showTimeSelect
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                        />
                        <Header content="Location Details" sub color="teal" />

                        <MyTextInput placeholder={'City'} name={'city'} />
                        <MyTextInput placeholder={'Venue'} name={'venue'} />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading}
                            type="submit"
                            floated="right"
                            content="Submit"
                            positive
                        ></Button>
                        <Button as={Link} to="/activities" type="button" floated="right" content="Cancel"></Button>
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})
