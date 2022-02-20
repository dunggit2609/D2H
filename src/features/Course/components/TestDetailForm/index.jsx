import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
import { useSelector } from 'react-redux';
import { isEmpty } from 'core/utils/object';
import { TextField } from '@material-ui/core';
import { useState } from 'react';
import { Divider, Grid, IconButton, Tooltip } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RESULT_TYPE_FILE, RESULT_TYPE_IMAGE, RESULT_TYPE_INPUT } from 'features/Course/constant/resultType';
import { PAPER_TYPE_1, PAPER_TYPE_2 } from 'features/Course/constant/paperType';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AttachFileIcon from '@mui/icons-material/AttachFile';
TestDetailForm.propTypes = {

};

function TestDetailForm(props) {
    const [testName, setTestName] = useState('')
    const [resultType, setResultType] = useState('')
    const [multiple, setMultiple] = useState('')
    const [paperType, setPaperType] = useState('')
    const [numberOfQuestion, setNumberOfQuestion] = useState(0)
    const [tests, setTests] = useState([])
    const { t } = useTranslation()
    const curTest = useSelector(state => state.test.curTest)

    const getResultType = (type) => {
        switch (type) {
            case RESULT_TYPE_IMAGE:
                return t('resultType.image')
            case RESULT_TYPE_FILE:
                return t('resultType.file')
            case RESULT_TYPE_INPUT:
                return t('resultType.input')

        }
    }

    const getPaperModel = (model) => {
        switch (model) {
            case PAPER_TYPE_1:
                return t('paper_type.model_1')
            case PAPER_TYPE_2:
                return t('paper_type.model_2')
        }
    }

    useEffect(() => {
        if (isEmpty(curTest) || !curTest.testConfig) {
            return
        }

        setTestName(curTest.testName)
        setResultType(getResultType(curTest.testConfig.test_answer_type))
        setPaperType(getPaperModel(curTest.testConfig.paper_type))
        setMultiple(curTest.testConfig.is_multiple_choice)
        setNumberOfQuestion(curTest.testConfig.total_number_of_question)
        setTests(curTest.testCodes)
    }, [curTest])
    return (
        <div className='test-detail-form'>
            <Grid container>
                <Grid item xs={12}>
                    <h3>{t("test_detail.info")}</h3>    <br />
                    <TextField variant="outlined" fullWidth label={t('create_test.test_name')} value={testName} onChange={(e) => setTestName(e.target.value)} />
                </Grid>
                <Divider></Divider>

                <Grid item xs={12}>
                    <h3>{t("test_detail.config")}</h3> <br />

                    <Grid container>
                        <Grid item xs={5}>
                            <TextField variant="outlined" fullWidth label={t('create_test.result_type')} value={resultType} disabled={true} />
                        </Grid>
                        <Grid item xs={2} className='multiple-choice-detail'>
                            <span className='multiple-choice__label'>{t('create_test.multiple_choice')}</span>
                            <span>
                                {multiple ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}

                            </span>
                            {/* <TextField variant="outlined" label={t('create_test.multiple_choice')} fullWidth label={t('create_test.multiple_choice')} value={multiple ? 'True' : 'False'} disabled={true} /> */}
                        </Grid>
                        <Grid item xs={5}>
                            <TextField variant="outlined" fullWidth label={t('create_test.paper_type')} value={paperType} disabled={true} />
                        </Grid>
                    </Grid>
                </Grid>
                <Divider></Divider>

                <Grid item xs={12} className="mt-24 test-codes">
                    {tests && tests.length > 0 && tests.map((test) =>
                        <Grid container key={test.test_code} spacing={4}>
                            <Grid item xs={6} className='test-code'>
                                <TextField variant="outlined" fullWidth label={t('create_test.test_code')}
                                    value={test.test_code} disabled={true} />
                            </Grid>
                            {test.image_url && <Grid item xs={6} className='view-test-result'>
                                <a href={test.image_url} target='_blank'>
                                    <Tooltip title="View result file">
                                        <IconButton>
                                            <AttachFileIcon />

                                        </IconButton>

                                    </Tooltip>

                                </a>
                            </Grid>}

                        </Grid>

                    )}

                </Grid>


            </Grid>
        </div>
    );
}

export default TestDetailForm;