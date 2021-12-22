import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss'
CourseInfo.propTypes = {

};

function CourseInfo(props) {
    const {courseNameProp, courseCodeProp} = props
    const [courseName, setCourseName] = useState(courseNameProp || '')
    const [courseCode, setCourseCode] = useState(courseCodeProp || '')

    const handleChangeCourseName = (e) => {
        setCourseName(e.target.value)
    }
    const handleChangeCourseCode = (e) => {
        setCourseCode(e.target.value)
    }

    return (
        <div className="course-info-container">
            <section className="course-info__name">
                <input className="course-info__input" value={courseName} onChange={handleChangeCourseName} />
            </section>
            <section className="course-info__code">
                <input className="course-info__input" value={courseCode} onChange={handleChangeCourseCode} />
            </section>

        </div>
    );
}

export default CourseInfo;