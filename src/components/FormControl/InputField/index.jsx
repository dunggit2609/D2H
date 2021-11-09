import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";

//component này để nhập vào 1 field ,
//handle error => xem loginform hoặc registerform để biết cách sử dụng
InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled, placeholder } = props;
  const { errors, formState } = form;
  const hasError = errors[name] && formState.touched;
  
  return (
    <Controller
      
      placeholder={placeholder}
      fullWidth
      control={form.control}
      name={name}
      label={label}
      disabled={disabled}
      error={!!hasError}
      helperText={errors[name]?.message}
      variant="outlined"
      margin="normal"
      as={TextField}
    />
  );
}

export default InputField;
