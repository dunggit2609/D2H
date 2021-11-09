import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router';
import Onboarding from 'features/Course/components/Onboarding';

CreateCourse.propTypes = {
    
};

function CreateCourse(props) {
    const match = useRouteMatch();
    console.log(match)
    return (
        <div className="create-class-container">
            <div className="onboarding">
                <Onboarding />
            </div>
            <div className="create-class-body">

            </div>
        </div>
    );
}

export default CreateCourse;