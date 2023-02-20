import { useField } from "formik"

function CustomInput({label, ...props}) {
  const [field, meta] = useField(props)
  // console.log(field, meta)
  return (
    <div className="mb-2">
      <label htmlFor={field.name}>{label}</label>
      <select
        {...field}
        {...props}
        autoComplete="off"
        className={`form-control shadow-none ${meta.touched && meta.error ? "input-error" : ""}`}
      />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  )
}

export default CustomInput
