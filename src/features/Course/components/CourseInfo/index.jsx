import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import { useSelector } from 'react-redux';
import { isEmpty } from 'core/utils/object';
CourseInfo.propTypes = {

};

function CourseInfo(props) {
    const [courseName, setCourseName] = useState('')
    const [courseCode, setCourseCode] = useState('')

    const handleChangeCourseName = (e) => {
        setCourseName(e.target.value)
    }
    const handleChangeCourseCode = (e) => {
        setCourseCode(e.target.value)
    }
    
   
    const currentCourse = useSelector(state => state.course.curCourse)

    useEffect(() => {
        if (!currentCourse || isEmpty(currentCourse)) {
            return
        }
        setCourseName(currentCourse.courseName)
        setCourseCode(currentCourse.courseCode)
    }, [currentCourse])
    return (
        <div className="course-info-container">
            <section className="course-info__code">
                <input className="course-info__input-code" value={courseCode} onChange={handleChangeCourseCode} />
            </section>
            <section className="course-info__name">
                <input className="course-info__input-name" value={courseName} onChange={handleChangeCourseName} />
            </section>

        </div>
    );
}

export default CourseInfo;