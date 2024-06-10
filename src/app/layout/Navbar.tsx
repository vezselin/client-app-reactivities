import {Button, Container, Menu} from "semantic-ui-react";
import {useStore} from "../stores/store.ts";


export default function Navbar() {

    const {activityStore} = useStore();
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header> <img src="/assets/logo.png" alt="logo" style={{marginRight: 10}}/> </Menu.Item>
                <Menu.Item name="Home"></Menu.Item>
                <Menu.Item>
                    <Button onClick={()=>activityStore.openForm()} positive content={"Create Activity"}/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}