import "./InputFormRegister.css";

export const InputFormRegister = ({ field, form }) => {
  const touched = form.touched[field.name];
  const errors = form.errors[field.name];

  return (
    <div className="formik-input-container-register">
      <label htmlFor={field.name}>{field.name}</label>
      <input type={field.name} {...field} />
      <div> {touched && errors} </div>
    </div>
  );
};