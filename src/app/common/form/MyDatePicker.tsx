import { useField } from "formik";
import { FormField, Label } from "semantic-ui-react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

//We don't need to pass the onChange from the activity form, we use it directly
//Partial makes all props optional

export default function MyDatePicker(props: Partial<ReactDatePickerProps>) {
    const [field, meta, helpers] = useField(props.name);
    return (
        <FormField error={meta.touched && !!meta.error}>
            <DatePicker
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={(value) => helpers.setValue(value)}
            />
            {meta.touched && meta.error ? (
                <Label basic color={"red"}>
                    {meta.error}
                </Label>
            ) : null}
        </FormField>
    );
}
