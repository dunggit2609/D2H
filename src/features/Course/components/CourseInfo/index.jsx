import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss'
CourseInfo.propTypes = {
    
};

function CourseInfo(props) {
    const [course, setCourse] = useState('Math Course ')
    
    const handleChange = (e) => {
        setCourse(e.target.value)
    }
    
    return (
        <div className="course-info-container">
            <input className="course-info__input" value={course} onChange={handleChange}/>
           
        </div>
    );
}

export default CourseInfo;