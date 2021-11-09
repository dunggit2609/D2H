import React from 'react';


import CourseContentHandler from '../CourseContenHandler';
CourseContent.propTypes = {

};

function CourseContent(props) {

    return (
        <div className="course-content-container">
            <section className="courses-content__handler">
                <CourseContentHandler></CourseContentHandler>
            </section>
        </div>
    );
}

export default CourseContent;