import { Form, Formik } from 'formik'
import MyTextInput from '../../app/common/form/MyTextInput.tsx'
import { Button } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store.ts'
import { observer } from 'mobx-react-lite'
import UserStore from '../../app/stores/userStore.ts'

export default observer(function LoginForm() {
    const { userStore } = useStore()
    return (
        <Formik initialValues={{ email: '', password: '' }} onSubmit={(values) => userStore.login(values)}>
            {({ handleSubmit, isSubmitting }) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <MyTextInput placeholder="Email" name="email"></MyTextInput>
                    <MyTextInput placeholder="Password" name="password" type="password"></MyTextInput>
                    <Button loading={isSubmitting} positive content="Login" type="submit" fluid></Button>
                </Form>
            )}
        </Formik>
    )
})
