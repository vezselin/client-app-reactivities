import {Dimmer, Loader} from "semantic-ui-react";

interface LoadingProps{
    inverted?:boolean;
    content?: string;
}
export default  function Loading({inverted= true , content = "loading..."}: LoadingProps){
    return(
    <Dimmer active={true} inverted={inverted}>
            <Loader content={content}/>
        </Dimmer>
    )
}