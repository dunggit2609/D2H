import SelectField from "components/SelectField";
import PropTypes from "prop-types";
import React, { useState, useRef } from "react";
import { Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import RadioButtonGroup from "components/RadioGroup";
import { Checkbox } from "@mui/material";

//component này để select 1 value từ danh sách field ,
//handle error => xem loginform hoặc registerform để biết cách sử dụng
CheckboxForm.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function CheckboxForm(props) {
    const { form, name, label, disabled, placeholder, list, onChangeSelected, direction } = props;
    const { errors, formState } = form;
    const hasError = errors[name] && formState.isSubmitted;
    const handleChangeSelected = () => {
        if (!onChangeSelected) {
            return
        }
        onChangeSelected()
    }
    return (
        <div>
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
                render={({ onChange, value, ref }) => (
                    <Checkbox
                        onChange={(val) => {
                            onChange(val)
                            handleChangeSelected()
                        }}
                        checked={value}
                        inputRef={ref}
                        direction={direction}
                    />
                )}
            />
            <ErrorMessage errors={errors} name={name} render={({ message }) => <p className="err-msg">{message}</p>} />
        </div>

    );
}

export default CheckboxForm;
