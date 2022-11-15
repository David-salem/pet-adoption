import "./TextArea.css";
import { useField } from 'formik';

export const MyTextArea = ({label, ...props}) => {
    const [field, meta] = useField(props);

    return (
        <div className="txt-area-body">
            <label htmlFor={props.id || props.name}>{label}</label>
            <textarea className="text-area" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
  };