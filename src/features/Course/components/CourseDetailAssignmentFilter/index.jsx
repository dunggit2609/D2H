import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Search from 'components/Search';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import './styles.scss'
import { InputAdornment } from '@material-ui/core';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Button, Chip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Autocomplete from '@mui/material/Autocomplete';

import { TEST_STATUS_GRADED, TEST_STATUS_NEW } from 'features/Course/constant/testStatus';
import { format } from 'date-fns'
import { getAllTest } from 'core/redux/testSlice';
import { useDispatch, useSelector } from 'react-redux';
import { UseSpinnerLoading } from 'hooks/useSpinnerLoading';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';
import { getAllAssignment } from 'core/redux/assignmentSlice';
import { useQuery } from 'hooks/useQuery';

CourseDetailAssignmentFilter.propTypes = {

};

function CourseDetailAssignmentFilter(props) {
    const [date, setDate] = useState([null, null]);
    const [search, setSearch] = useState('')
    const { t } = useTranslation()
    const dateFormat = "dd/MM/yyyy"
    const dispatch = useDispatch()
    const { handleDisplaySpinner } = UseSpinnerLoading()
    const { enqueueSnackbar } = useSnackbar();
    const {size, page} = useQuery()
    const {courseId, testId} = useParams()
    const filter = {
        page: 1,
        size: 50,
        name: '',
        start_date: format(new Date(), 'dd/MM/yyyy'),
        end_date: format(new Date(), 'dd/MM/yyyy'),

    }
    const handleChangeSearch = (searchString) => {
        setSearch(searchString)
    }
    useEffect(async () => {
        if (!courseId || !testId) {
            return
        }
        //config size và page
        const payload = {
            filter: {
                course_id: courseId,
                test_id: testId,
                test_code: 210
            },
            size: size ? size : 10,
            page: page ? page : 1
        }
        const action = getAllAssignment(payload)
        try {
            handleDisplaySpinner(true)
            const rs = await dispatch(action)
            unwrapResult(rs)
            handleDisplaySpinner(false)
        } catch (err) {
            enqueueSnackbar(err.message, { variant: "error" });
            handleDisplaySpinner(false)
        }

    }, [courseId, testId, size, page])
    const handleView = () => {
        filter.name = search
        filter.start_date = format(date[0], 'dd/MM/yyyy')
        filter.end_date = format(date[1], 'dd/MM/yyyy')
    }
    return (
        <div className='course-detail-filter__container'>
            {/* <div className="search">
                <Search onChange={handleChangeSearch} value={search}/>
            </div> */}
            {
                //tách component status và date
            }
            {/* <div className="status">
                <Autocomplete
                    sx={{ width: 'auto !important',  minWidth: '100px' }}
                    id="checkboxes-tags-import { useQuery } from 'hooks/useQuery';
demo"
                    options={statuses}
                    autoComplete={true}
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>

                            {option.id === TEST_STATUS_NEW ?  <Chip label={option.label} color="primary" /> :  <Chip label={option.label} color="success" />}
                        </li>
                    )}
                    onChange={(event, newValue) => {
                        setStatus(newValue);
                    }}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    value={status}
                    renderInput={(params) => (
                        <TextField {...params} label="Checkboxes" fullWidth size='small' />
                    )}
                />
            </div> */}
            {/* <div className="date-range">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                        startText={t('from_date')}
                        endText={t('to_date')}
                        inputFormat={dateFormat}
                        value={date}
                        onChange={(newValue) => {
                            setDate(newValue)
                        }}
                        renderInput={(startProps, endProps) => (
                            <React.Fragment>
                                <TextField {...startProps}
                                    size="small"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <DateRangeIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Box sx={{ mx: 1 }}></Box>
                                <TextField {...endProps}
                                    size="small"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <DateRangeIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </React.Fragment>
                        )}
                    />
                </LocalizationProvider>
            </div>

            <div className="view">
                <Button onClick={handleView} variant="outlined" startIcon={<VisibilityIcon />}>{t('button.view')}</Button>

            </div> */}
        </div>
    );
}

export default CourseDetailAssignmentFilter;