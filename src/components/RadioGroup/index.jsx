import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { RadioGroup } from '@mui/material';
import { FormControlLabel } from '@material-ui/core';
import { Radio } from '@mui/material';

RadioButtonGroup.propTypes = {

};

function RadioButtonGroup(props) {
    const { value, handleChangeValue, list, direction } = props
    const [val, setVal] = useState(value ? value : '')
    const isRow = direction === 'row'
    useEffect(() => {
        if (!handleChangeValue) {
            return
        }
        handleChangeValue(val)
    }, [val, handleChangeValue])



    return (
        <RadioGroup row={isRow} aria-label="gender" name="row-radio-buttons-group" value={val} onChange={(event) => setVal(event.target.value)}>
            {
                list.map(item =>
                    <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />

                )
            }
        </RadioGroup>
    );
}

export default RadioButtonGroup;