import { useField, ErrorMessage } from "formik"

function CustomInput({label, ...props}) {
  const [field, meta] = useField(props)
  // console.log(field, meta)
  return (
    <div className="mb-2">
      <label htmlFor={field.name}>{label}</label>
      <input 
        className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
        {...field}{...props}
        autoComplete="off"
      />
      <ErrorMessage name={field.name}/>
    </div>
  )
}

export default CustomInput
