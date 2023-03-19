import { useField } from "formik"
import { TextField } from "@mui/material"
import { Field } from "formik"

function CustomInput({name, ...props}) {
  const [field, meta] = useField(name)

  const configTextField = {
    ...field,
    ...props,
    fullWidth: true,
    variant: 'outlined',
    //variant: 'standard',
  }

  if (meta && meta.touched && meta.error){
    configTextField.error = true
    configTextField.helperText = meta.error
  }

  return <TextField {...configTextField}/>
}

export default CustomInput

