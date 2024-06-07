import {Button, Container, Menu} from "semantic-ui-react";

export default function Navbar() {
    return (
        <Menu inverted fixed={"top"}>
            <Container>
                <Menu.Item header> <img src="/logo.png" /> </Menu.Item>
                <Menu.Item name="Home"></Menu.Item>
                <Menu.Item>
                    <Button positive content={"Create Activity"}/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}