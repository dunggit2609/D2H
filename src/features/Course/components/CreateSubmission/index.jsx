import React, { useState } from 'react';
import { Dialog, InputLabel, MenuItem, Select } from '@material-ui/core';
import './styles.scss'
import DropzoneUpload from 'components/DropzoneUpload';
import { useTranslation } from 'react-i18next';
import { Button, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { _LIST_LINK } from 'constant/config';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createAssignment } from 'core/redux/assignmentSlice';
import { UseSpinnerLoading } from 'hooks/useSpinnerLoading';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';
import { isEmpty } from 'core/utils/object';
import { useRouteMatch, useHistory } from 'react-router';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function CreateSubmission(props) {
    const dropzoneConfig = {
        filesLimit: 1000,
        showPreviews: false,
        showPreviewsInDropzone: true,
        showFileNamesInPreview: true,
        previewText: "",
        useChipsForPreview: true,
        acceptedFiles: ['image/*']
    }
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [data, setData] = useState()
    const [isValid, setIsValid] = useState(false)
    const { handleDisplaySpinner } = UseSpinnerLoading()
    const { enqueueSnackbar } = useSnackbar();
    const [openDialog, setOpenDialog] = useState(false)
    const history = useHistory()
    const { courseId, testId } = useParams()
    const match = useRouteMatch()
    const handleChangeFile = (values) => {

        const dummy = values.map(v => v.url)
        setData(dummy)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }
    const currentTest = useSelector(state => state.test.curTest)
    const currentCourse = useSelector(state => state.course.curCourse)
    const handleConfirmAssignSucces = () => {

        if ((!courseId || !testId) && (!currentTest || !currentTest.testId || !currentCourse || !currentCourse.courseId)) {
            return
        }
        const url = `${_LIST_LINK.viewAssignment}`
            .replace(':courseId', courseId ? courseId : currentCourse.courseId)
            .replace(':testId', testId ? testId : currentTest.testId)
        history.push({ pathname: url })
    }
    const handleSubmitAssignment = async () => {
        console.log("data", data)
        if (data.length === 0 || (!testId && !currentTest.testId)) {
            setIsValid(true)
            return
        }
        setIsValid(false)
        const payload = { test_id: testId ? testId : currentTest.testId, url: data }
        const action = createAssignment(payload)
        try {
            handleDisplaySpinner(true)
            const rs = await dispatch(action)
            handleDisplaySpinner(false)
            unwrapResult(rs)
            setOpenDialog(true)
        } catch (err) {
            enqueueSnackbar(err.message, { variant: "error" });
            handleDisplaySpinner(false)
        }
    }
    const handleClickBackToTest = () => {
        if (!courseId || !testId) {
            return
        }

        const url = _LIST_LINK.testDetail.replace(':courseId', courseId).replace(':testId', testId)
        history.push({ pathname: url })

    }
    return (
        <div className='assignment-container'>
            <div className="upload-submission-image">
                <div className="upload-submission-label">
                    {match.path === _LIST_LINK.assginmentCreate && <span className="back-to-test" onClick={handleClickBackToTest}><ArrowBackIosIcon /></span>
                    }

                    {t("create_submission.upload_assignment")}
                </div>
                <DropzoneUpload config={dropzoneConfig} onChange={handleChangeFile} />
                {isValid && <p className="err-msg">{t('yupValidate.required_field')}</p>}
            </div>
            <div className="result-assign">
                <Dialog onClose={handleCloseDialog} open={openDialog} disableBackdropClick={true}
                    disableEscapeKeyDown={true}>
                    <DialogTitle className="dialog-title">Assignment result</DialogTitle>
                    <DialogContent>
                        <span>
                            Assign successfully!!! Result will send to your email

                        </span>
                        <br />
                        <span>
                            You will be redirected to course detail
                        </span>

                        {/* {curAssignment && data && data.length === 1 &&
                            <Grid container spacing={2}>
                                <Grid item xs={12} className='row-result'>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <div className="result__label">Student ID</div> <br />
                                            {curAssignment.studentId}
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className="result__label">Grade</div> <br />
                                            {curAssignment.grade * 10}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} className='row-result' className="result__label">
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <div className="result__label">Assigment image</div> <br />
                                            <a href={curAssignment.imageUrl} target='_blank'>
                                                <img src={curAssignment.imageUrl} width={50 + 'px'} height={50 + 'px'} />
                                            </a>
                                        </Grid>
                                        <Grid item xs={6}>

                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>}
                        {data && data.length !== 1 && <span>
                        </span>} */}


                    </DialogContent>
                    <DialogActions>

                        <Button
                            color='primary'
                            variant="contained"
                            onClick={handleConfirmAssignSucces}
                        >
                            {t("button.ok")}
                        </Button>

                    </DialogActions>
                </Dialog>
            </div>
            <div className="submit-assignment">
                <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="default"
                    onClick={handleSubmitAssignment}
                >
                    {t("button.assign")}
                </Button>
            </div>
            <section className="do-later">
                <Link to={_LIST_LINK.course} className='decoration-none'>
                    <Button
                        color="primary"
                        variant="text"
                        fullWidth
                        type="default"
                    >
                        {t("button.do_later")}
                    </Button>
                </Link>

            </section>

        </div>
    );
}

export default CreateSubmission;