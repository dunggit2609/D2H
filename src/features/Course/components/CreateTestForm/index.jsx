import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useTranslation } from 'react-i18next';
import InputField from 'components/FormControl/InputField';
import './styles.scss'
import { Divider, InputLabel } from '@material-ui/core';
import { Button, IconButton, Snackbar, Tooltip, Grid, Alert } from '@mui/material';

import { Chip, TextField } from '@mui/material';
import InputResultPopup from 'features/Course/components/InputResultPopup';
import SelectFieldForm from 'components/FormControl/SelectField'

import { RESULT_TYPE_FILE, RESULT_TYPE_IMAGE, RESULT_TYPE_INPUT } from 'features/Course/constant/resultType';
import { PAPER_TYPE_1, PAPER_TYPE_2 } from 'features/Course/constant/paperType';
import CheckboxForm from 'components/FormControl/CheckboxForm';
import { cloneDeep } from 'core/utils/common';
import { isEmpty } from 'core/utils/object';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { createTest } from 'core/redux/testSlice';
import { UseSpinnerLoading } from 'hooks/useSpinnerLoading';
import { useSnackbar } from 'notistack';
import { Link, useRouteMatch, useParams } from 'react-router-dom';
import { _LIST_LINK } from 'constant/config';
import { useHistory } from 'react-router';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import ContentPasteOffOutlinedIcon from '@mui/icons-material/ContentPasteOffOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
CreateTestForm.propTypes = {

};

function CreateTestForm(props) {
    const { t } = useTranslation()

    const { handleNextStep } = props
    const listPaper = [{ value: PAPER_TYPE_1, label: t('paper_type.model_1') }, { value: PAPER_TYPE_2, label: t('paper_type.model_2') },]
    const listResult = [{ value: RESULT_TYPE_IMAGE, label: t("resultType.image") }, { value: RESULT_TYPE_FILE, label: t("resultType.file") },
    { value: RESULT_TYPE_INPUT, label: t("resultType.input") }]
    const [data, setData] = useState([{ testCode: '', url: '', answer: {}, error: false, message: '', visiblePopup: false }])
    const [disabledSubmit, setDisabledSubmit] = useState(false)
    const [isInputFromUI, setIsInputFromUI] = useState(false)
    const dispatch = useDispatch()
    const { handleDisplaySpinner } = UseSpinnerLoading();
    const { enqueueSnackbar } = useSnackbar();
    const match = useRouteMatch()
    const currentCourse = useSelector(state => state.course.curCourse)
    const createPage = match.path === _LIST_LINK.testCreate
    const history = useHistory()
    const [openConfirmRemoveTestCode, setOpenConfirmRemoveTestCode] = useState(false)
    const [currentIndexRemoved, setCurrentIndexRemoved] = useState(null)
    const { courseId } = useParams()
    const schema = yup.object().shape({
        testName: yup
            .string()
            .required(t("yupValidate.required_field")),
        //  generate handle
        paperType: yup.mixed()
            .oneOf([PAPER_TYPE_1, PAPER_TYPE_2], t("yupValidate.required_field")),

        resultType: yup
            .mixed()
            .oneOf([RESULT_TYPE_IMAGE, RESULT_TYPE_FILE, RESULT_TYPE_INPUT], t("yupValidate.required_field")),


    });
    const form = useForm({
        defaultValues: {
            testName: "",
            numberOfQuestion: 0,
            paperType: '',
            resultType: '',
            multipleChoice: false,
        },
        resolver: yupResolver(schema),
    });
    const handleDisableChangeResultAndDisplaynumberOfQuestion = () => {
        const resultType = form.getValues('resultType')
        const amount = form.getValues('numberOfQuestion')
        const disabled = !resultType || (resultType === RESULT_TYPE_INPUT && (+amount === 0 || !amount))
        setDisabledSubmit(disabled)
        const display = resultType === RESULT_TYPE_INPUT
        setIsInputFromUI(display)
    }

    const handleChangeResult = (values, index) => {
        if (values.length === 0) {
            return
        }

        const dummy = cloneDeep(data)
        dummy[index].visiblePopup = false

        if (form.getValues('resultType') === RESULT_TYPE_INPUT) {
            dummy[index].answer = values[0]
            setData(dummy)
            return
        }
        dummy[index].url = values[0].url
        dummy[index].fileName = values[0].name
        setData(dummy)
    }
    // const { isSubmitting } = form.formState;
    const handleOnSubmit = async (values) => {
        const isInValid = isInValidTests();
        if (isInValid || (!courseId && !currentCourse.courseId)) {
            return
        }

        let dummy
        let urls
        if (form.getValues('resultType') === RESULT_TYPE_INPUT) {
            dummy = data.map(v => {
                return { test_code: v.testCode, url: v.url, answer: v.answer }
            })
        } else {
            urls = data.map(v => v.url)
        }

        const payload = { ...values, url: urls, results: dummy || [], numberOfQuestion: values.numberOfQuestion ? values.numberOfQuestion : 0 }
        try {
            handleDisplaySpinner(true)
            const payloadData = { courseID: currentCourse.courseId ? currentCourse.courseId : courseId, payload: payload }
            const action = createTest(payloadData)
            const rs = await dispatch(action)
            unwrapResult(rs)

            handleDisplaySpinner(false)
            form.reset();

            if (!createPage) {
                handleNextStep()

            } else {
                const courseId = currentCourse.courseId ? currentCourse.courseId : courseId
                history.push({ pathname: `${_LIST_LINK.course}/${courseId}` })
            }
        } catch (err) {
            enqueueSnackbar(err.message, { variant: "error" });
            handleDisplaySpinner(false)
        }

    };
    const handleOpenInputResult = (index) => {
        const dummy = cloneDeep(data)
        dummy[index].visiblePopup = true
        setData(dummy)

    }

    const handleCloseResultPopup = (index) => {
        const dummy = cloneDeep(data)
        dummy[index].visiblePopup = false
        setData(dummy)
    }

    const addNewTest = () => {
        const newData = { testCode: '', url: '', answer: {}, error: false, message: '', visiblePopup: false }
        const newListData = [...data, newData]
        setData(newListData)
    }

    const handleChangeTestCode = (value, index) => {
        const dummy = cloneDeep(data)
        dummy[index].testCode = value

        setData(dummy)
    }

    const handleRemoveTestCode = (index) => {
        setCurrentIndexRemoved(index)
        setOpenConfirmRemoveTestCode(true)
    }

    const handleConfirmRemoveTestCode = () => {
        if (currentIndexRemoved === null || currentIndexRemoved === undefined) {
            return
        }

        const dummy = cloneDeep(data)
        dummy.splice(currentIndexRemoved, 1)
        setData(dummy)

        setCurrentIndexRemoved(null)
        setOpenConfirmRemoveTestCode(false)
    }

    const handleCancelRemoveTestCode = () => {
        setCurrentIndexRemoved(null)
        setOpenConfirmRemoveTestCode(false)
    }

    const isInValidTests = () => {
        const dummy = cloneDeep(data)
        let inValid = true;
        const listTestCode = dummy.map(v => v.testCode);
        dummy.forEach((val, index) => {
            if (!val.url && isEmpty(val.answer)) {
                val.error = true
                val.message = t("create_test.enter_result")
                inValid = true
            } else {
                val.error = false
                val.message = ''
                inValid = false
            }
            if (isInputFromUI && !val.testCode) {
                val.error = true
                val.message = t("yupValidate.required_field")
                inValid = true
            } else if (isInputFromUI && listTestCode.indexOf(val.testCode) != index) {
                val.error = true
                val.message = t("create_test.duplicate_test_code")
                inValid = true

            } else if ((val.testCode || !isInputFromUI) && !inValid) {
                val.error = false
                val.message = ''

            }
        })
        setData(dummy)
        return inValid
    }

    return (
        <div className="create-course__body">
            <form onSubmit={form.handleSubmit(handleOnSubmit)}>
                <h2>{t("create_test.test_info")}</h2>
                <section className="test-name">

                    <InputField
                        name="testName"
                        label={t("create_test.test_name")}
                        form={form}
                        disabled={false}
                    />
                </section>
                <Divider></Divider>
                <h2>{t("create_test.test_config")}</h2>
                <section className="test-config-extend">

                    <div className="general-config">
                        <div className="result-type flex-grow-3">
                            <SelectFieldForm form={form}
                                list={listResult}
                                disabled={false}
                                name="resultType"
                                label={t("create_test.result_type")}
                                onChangeSelected={handleDisableChangeResultAndDisplaynumberOfQuestion}
                            />
                        </div>
                        <div className="question-type flex-grow-1">
                            <div className="container">
                                <InputLabel id="paper-type-label">{t("create_test.multiple_choice")}</InputLabel>
                                <CheckboxForm form={form}
                                    disabled={false}
                                    name="multipleChoice"
                                    label={t("create_test.multiple_choice")}
                                />
                            </div>


                        </div>
                        <div className="paper-type flex-grow-3">

                            <div className="config-paper-type">
                                <SelectFieldForm form={form}
                                    list={listPaper}
                                    disabled={false}
                                    name="paperType"
                                    label={t("create_test.paper_type")} />
                            </div>

                            {isInputFromUI && <>
                                <div className="config-amount-question">
                                    <InputField
                                        name="numberOfQuestion"
                                        label={t("create_test.amount_of_question")}
                                        form={form}
                                        disabled={false}
                                        onChangeVal={handleDisableChangeResultAndDisplaynumberOfQuestion}
                                    />
                                </div>   </>}
                        </div>
                    </div>



                </section>
                <Divider></Divider>
                {form.getValues('resultType') &&
                    <section className='test-config__test-codes'>
                        <h2>{t("create_test.test_codes")}</h2>

                        {data.map((item, index) => <div className="test-config" key={index}>
                            {
                                isInputFromUI ? <div className="test-config__item-test-code">
                                    <TextField
                                        label={t("create_test.test_code")}
                                        value={item.testCode}
                                        onChange={(event) => handleChangeTestCode(event.target.value, index)}
                                        fullWidth
                                        error={item.error}
                                    />
                                    {item.error && <p className="err-msg">{item.message}</p>}


                                </div> : <div className="test-config__item-test-code">
                                    <TextField
                                        label={t("create_test.file_name")}
                                        value={item.fileName ? item.fileName : ''}
                                        fullWidth
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />


                                </div>
                            }

                            {/* <div className="test-config__input-result-status">
                                

                            </div> */}
                            <div className="test-config__item-test-change-result">
                                <Grid container>
                                    <Grid item xs={4} className='change-result-item  width-202'>
                                        {
                                            item.url || !isEmpty(item.answer) ? <Chip icon={<CheckCircleOutlineOutlinedIcon />} variant='contained' label={t("create_test.had_result")} color="success" /> :
                                                <Chip icon={<ContentPasteOffOutlinedIcon />} label={t("create_test.has_no_result")} color="error" variant='contained' />
                                        }
                                    </Grid>
                                    <Grid item xs={4} className='change-result-item'>
                                        <Tooltip title={item.url || !isEmpty(item.answer) ? t("create_test.change_result") : t("create_test.upload_answer")}>
                                            <IconButton color="primary" onClick={() => { handleOpenInputResult(index) }} disabled={disabledSubmit}>
                                                {item.url || !isEmpty(item.answer) ? <ChangeCircleOutlinedIcon /> : <BackupOutlinedIcon />}
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item xs={4} className='change-result-item width-150'>
                                        {index !== 0 && <Tooltip title={item.url || !isEmpty(item.answer) ? t("create_test.change_result") : t("create_test.upload_answer")}>
                                            <IconButton color="error" onClick={() => { handleRemoveTestCode(index) }} disabled={disabledSubmit}>
                                                <RemoveCircleOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>}
                                    </Grid>
                                </Grid>






                            </div>
                            <InputResultPopup multiple={form.getValues('multipleChoice')} amount={form.getValues('numberOfQuestion')} index={index} onChange={handleChangeResult} type={form.getValues('resultType')} isOpen={item.visiblePopup} handleClose={handleCloseResultPopup} />

                        </div>

                        )}
                        {form.getValues('resultType') && <div className="add-new-test-config">
                            <Button variant="outlined" color="primary" onClick={addNewTest} >Add New</Button>
                        </div>}

                    </section>}

                <Snackbar
                    open={openConfirmRemoveTestCode}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}

                >
                    <Alert severity="warning" sx={{ width: '100%' }}>
                        Are you sure to remove this test code?
                        <span onClick={handleConfirmRemoveTestCode} className='confirm-remove'>CONFIRM</span>
                        <span onClick={handleCancelRemoveTestCode} className='cancel-remove'>CANCEL</span>
                        {/* <Button color="inherit" size="small" color='error' onClick={handleConfirmRemoveTestCode}>
                            Confirm
                        </Button>
                        <Button color="inherit" size="small" onClick={handleCancelRemoveTestCode} >
                            Cancel
                        </Button> */}
                    </Alert>
                </Snackbar>
                <section className="course-info__submit">
                    <Button
                        color="primary"
                        className="mainBox__submitButton"
                        variant="contained"
                        fullWidth
                        type="submit"
                    >
                        {t("create_test.label")}
                    </Button>
                </section>
                <section className="do-later">
                    <Link to={_LIST_LINK.course} className='decoration-none'>
                        <Button
                            color="primary"
                            variant="text"
                            fullWidth
                            type="default"
                        >
                            {t("button.do_later")}
                        </Button></Link>

                </section>
            </form>

        </div>
    );
}

export default CreateTestForm;