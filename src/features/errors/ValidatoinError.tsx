import {Message} from "semantic-ui-react";

interface ValidationErrorProps {
    errors: string[];
}

export default function ValidationError({errors}: ValidationErrorProps){
    return(
        <Message error>
            {errors && (
                <Message.List>
                    {errors.map((error:string, i)=>(
                        <Message.Item key={i}>{error}</Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    )
}