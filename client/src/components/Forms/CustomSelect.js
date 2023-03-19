import { useField, useFormikContext } from "formik"
import { TextField, MenuItem } from "@mui/material"

function CustomSelect({name, options, ...props}){
  const { setFieldValue } = useFormikContext()
  const [field, meta] = useField(name)

  const handleChange = e => {
    const { value } = e.target
    setFieldValue(name, value)
  }

  const configSelect = {
    ...field,
    ...props,
    select: true,
    fullWidth: true,
    variant: 'outlined',
    onChange: handleChange
  }

  if (meta && meta.touched && meta.error){
    configSelect.error = true
    configSelect.helperText = meta.error
  }

  return <TextField {...configSelect}>
    {options.map((option, key) => {
      return (
        <MenuItem key={key} value={option}>
          {option}
        </MenuItem>
      )
    })}
  </TextField>
}

export default CustomSelect
