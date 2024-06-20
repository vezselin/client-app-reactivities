import {useField} from "formik";
import {FormField, Label} from "semantic-ui-react";

interface MyTextInputProps {
    placeholder: string;
    name: string;
    label?: string;
}

export default function MyTextInput(props: MyTextInputProps) {
    const[field,meta] = useField(props.name)
    return(
        <FormField error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <input {...field} {...props} />
            {meta.touched && meta.error ? (
                <Label basic color={'red'}>{meta.error}</Label>
            ) : null
            }
        </FormField>
    )
}