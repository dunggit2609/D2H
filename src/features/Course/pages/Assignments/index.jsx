import React from 'react';
import PropTypes from 'prop-types';
import CourseDetailAssignmentFilter from 'features/Course/components/CourseDetailAssignmentFilter';
import AssignmentList from 'features/Course/components/AssignmentList';
import './styles.scss'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useParams, useHistory } from 'react-router-dom';
import { _LIST_LINK } from 'constant/config';
Assignments.propTypes = {

};



function Assignments(props) {

    const { courseId, testId } = useParams()
    const history = useHistory()
    const handleClickBackToTest = () => {
        if (!courseId || !testId) {
            return
        }

        const url = _LIST_LINK.testDetail.replace(':courseId', courseId).replace(':testId', testId)
        history.push({ pathname: url })

    }
    return (
        <div className="assigment-container">
            <section className='assignment-page-label'>
                <span className="back-to-test" onClick={handleClickBackToTest}><ArrowBackIosIcon /></span>
                <span className="assignment-label" >
                    Assignments
                </span>
            </section>
            <section className="course-detail__filter">
                <CourseDetailAssignmentFilter />
            </section>
            <section className="course-detail__data">
                <AssignmentList />
            </section>
        </div>
    );
}

export default Assignments;