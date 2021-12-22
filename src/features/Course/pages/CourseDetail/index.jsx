import React from 'react';
import PropTypes from 'prop-types';
import CourseInfo from 'features/Course/components/CourseInfo';
import './style.scss'
import CourseContent from 'features/Course/components/CourseContent';
CourseDetail.propTypes = {

};

function CourseDetail(props) {
    return (
        <div className="course-detail-container">
            <section className="course-info">
                <CourseInfo courseNameProp={'Math course'} courseCodeProp={'MATH001'} />
            </section>
            <section className="course-content">
                <CourseContent />
            </section>
        </div>
    );
}

export default CourseDetail;