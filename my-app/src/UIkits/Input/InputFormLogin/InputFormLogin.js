import "./InputFormLogin.css";

export const InputFormLogin = ({ field, form }) => {
  const touched = form.touched[field.name];
  const errors = form.errors[field.name];

  return (
    <div className="formik-input-container-login">
      <label htmlFor={field.name}>{field.name}</label>
      <input type={field.name} {...field} />
      <div> {touched && errors} </div>
    </div>
  );
};