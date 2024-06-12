import {Header, Menu} from "semantic-ui-react";
import {Calendar} from "react-calendar";

export default function ActivityFilter() {
    return (
        <>
            <Menu vertical size={'large'} style={{width:'100%', marginTop:'27px'}}>
                <Header icon={'filter'} attached color={'teal'} content={'Filters'}/>
                <Menu.Item content={"All activities"}/>
                <Menu.Item content={"I'm going"}/>
                <Menu.Item content={"I'm going"}/>
            </Menu>
            <Header/>
            <Calendar/>
        </>
    )
}