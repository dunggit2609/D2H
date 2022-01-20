import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useTranslation } from 'react-i18next';
import InputField from 'components/FormControl/InputField';
import './styles.scss'
import { Button, Divider, FormControl, FormLabel, InputLabel, MenuItem, Select } from '@material-ui/core';
import { Chip, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import InputResultPopup from 'features/Course/components/InputResultPopup';
import SelectFieldForm from 'components/FormControl/SelectField'

import { RESULT_TYPE_FILE, RESULT_TYPE_IMAGE, RESULT_TYPE_INPUT } from 'features/Course/constant/resultType';
import { PAPER_TYPE_1, PAPER_TYPE_2 } from 'features/Course/constant/paperType';
import uploadService from 'core/API/uploadService';
import CheckboxForm from 'components/FormControl/CheckboxForm';
import { cloneDeep } from 'core/utils/common';

CreateTestForm.propTypes = {

};

function CreateTestForm(props) {
    const { t } = useTranslation()

    const { handleNextStep } = props
    const listPaper = [{ value: PAPER_TYPE_1, label: "Code1" }, { value: PAPER_TYPE_2, label: "Code2" },]
    const listResult = [{ value: RESULT_TYPE_IMAGE, label: t("resultType.image") }, { value: RESULT_TYPE_FILE, label: t("resultType.file") },
    { value: RESULT_TYPE_INPUT, label: t("resultType.input") }]
    const [data, setData] = useState([{ testCode: '', result: null, }])
    const [disabledChangeResult, setdisabledChangeResult] = useState(false)
    const [isVisibleResultPopup, setIsVisibleResultPopup] = useState(false)
    const [displayAmountOfQuestion, setDisplayAmountOfQuestion] = useState(false)
    const schema = yup.object().shape({
        testName: yup
            .string()
            .required(t("yupValidate.required_field")),
        //  generate handle
        testCode: yup
            .string()
            .required(t("yupValidate.required_field")),
        paperType: yup.mixed()
            .oneOf([PAPER_TYPE_1, PAPER_TYPE_2], t("yupValidate.required_field")),

        resultType: yup
            .mixed()
            .oneOf([RESULT_TYPE_IMAGE, RESULT_TYPE_FILE, RESULT_TYPE_INPUT], t("yupValidate.required_field")),


    });
    const form = useForm({
        defaultValues: {
            testName: "",
            testCode: "",
            amountOfQuestion: "",
            paperType: '',
            resultType: '',
            isMultiple: false,
        },
        resolver: yupResolver(schema),
    });
    const handleDisableChangeResultAndDisplayAmountOfQuestion = () => {
        const resultType = form.getValues('resultType')
        const amount = form.getValues('amountOfQuestion')
        const disabled = !resultType || (resultType === RESULT_TYPE_INPUT && (+amount === 0 || !amount))
        setdisabledChangeResult(disabled)
        const display = resultType === RESULT_TYPE_INPUT
        setDisplayAmountOfQuestion(display)
    }

    const handleChangeFileResult = async (file, index) => {

    }
    // const { isSubmitting } = form.formState;
    const handleOnSubmit = async (values) => {

        //handle call api
        handleNextStep()
        form.reset();
    };
    const handleChangeResult = () => {
        setIsVisibleResultPopup(true)

    }

    const handleCloseResultPopup = () => {
        setIsVisibleResultPopup(false)
    }

    const addNewTest = () => {
        const newData = { testCode: '', resultType: null, }
        const newListData = [...data, newData]
        setData(newListData)
    }

    const handleChangeTestCode = (value, index) => {
        const dummy = cloneDeep(data)
        dummy[index].testCode = value
        if (!value) {
            dummy[index].error = true
        } else {
            dummy[index].error = false
        }

        setData(dummy)
    }

    return (
        <div className="create-course__body">
            <form onSubmit={form.handleSubmit(handleOnSubmit)}>
                <h3>{t("create_test.test_info")}</h3>
                <section className="test-name">

                    <InputField
                        name="testName"
                        label={t("create_test.test_name")}
                        form={form}
                        disabled={false}
                    />
                </section>
                <Divider></Divider>
                <h3>{t("create_test.test_config")}</h3>
                <section className="test-config-extend">
                    {/* <div className="test-config__item-test-result-type">
                        

                    </div> */}
                    <div className="general-config">
                        <div className="result-type flex-grow-3">
                            {/* <InputLabel id="result-type-label">{t("create_test.result_type")}</InputLabel> */}
                            <SelectFieldForm form={form}
                                list={listResult}
                                disabled={false}
                                name="resultType"
                                label={t("create_test.result_type")}
                                onChangeSelected={handleDisableChangeResultAndDisplayAmountOfQuestion}
                            />
                        </div>
                        <div className="question-type flex-grow-1">
                            <div className="container">
                                <InputLabel id="paper-type-label">{t("create_test.multiple_choice")}</InputLabel>
                                <CheckboxForm form={form}
                                    disabled={false}
                                    name="isMultiple"
                                    label={t("create_test.multiple_choice")}
                                />
                            </div>


                        </div>
                        <div className="paper-type flex-grow-3">

                            <div className="config-paper-type">
                                {/* <InputLabel id="paper-type-label">{t("create_test.paper_type")}</InputLabel> */}
                                <SelectFieldForm form={form}
                                    list={listPaper}
                                    disabled={false}
                                    name="paperType"
                                    label={t("create_test.paper_type")} />
                            </div>

                            {displayAmountOfQuestion && <>
                                <div className="config-amount-question">
                                    <InputField
                                        name="amountOfQuestion"
                                        label={t("create_test.amount_of_question")}
                                        form={form}
                                        disabled={false}
                                        onChangeVal={handleDisableChangeResultAndDisplayAmountOfQuestion}
                                    />
                                </div>   </>}
                        </div>
                    </div>



                </section>
                <section >
                    {data.map((item, index) => <div className="test-config" key={index}>
                        <div className="test-config__item-test-code">
                            <TextField
                                label={t("create_test.test_code")}
                                value={item.testCode}
                                onChange={(event) => handleChangeTestCode(event.target.value, index)}
                                fullWidth
                                error={item.error}
                            />
                            {item.error && <p className="err-msg">{t("yupValidate.required_field")}</p>}


                        </div>
                        <div className="test-config__input-result-status">
                            {
                                item.url || (item.result && item.result.length) > 0 ? <Chip variant='outlined' label={t("create_test.had_result")} color="success" /> :
                                    <Chip label={t("create_test.has_no_result")} color="error" variant='outlined' />
                            }

                        </div>
                        <div className="test-config__item-test-change-result">
                            <Button variant="outlined" color="primary" onClick={handleChangeResult} disabled={disabledChangeResult}>{t("create_test.change_result")}</Button>
                        </div>

                        <InputResultPopup index={index} onChange={handleChangeFileResult} type={form.getValues('resultType')} isOpen={isVisibleResultPopup} handleClose={handleCloseResultPopup} />

                    </div>

                    )}
                    <div className="add-new-test-config">
                        <Button variant="outlined" color="primary" onClick={addNewTest} >Add New</Button>
                    </div>

                </section>

                <section className="course-info__submit">
                    <Button
                        color="primary"
                        className="mainBox__submitButton"
                        variant="contained"
                        fullWidth
                        type="submit"
                    >
                        {t("button.next_step")}
                    </Button>
                </section>
                <section className="do-later">
                    <Button
                        color="primary"
                        className="mainBox__submitButton"
                        variant="text"
                        fullWidth
                        type="default"
                    >
                        {t("button.do_later")}
                    </Button>
                </section>
            </form>

        </div>
    );
}

export default CreateTestForm;