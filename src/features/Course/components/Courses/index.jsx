import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { Add } from '@material-ui/icons';
import './style.scss'
import { NavLink, useHistory, useRouteMatch, useLocation, Link } from 'react-router-dom';

function Courses(props) {
    const [showAddCourseButton, setShowAddCourseButton] = useState(true)
    let history = useHistory();
    const rootPath = useRouteMatch()
    const addNewCoursePath = `${rootPath.path}/create-course/new`
    const location = useLocation()
    useEffect(() => {
        if (location.pathname === addNewCoursePath) {
            setShowAddCourseButton(false)
        } else {
            setShowAddCourseButton(true)
        }

    }, [location.pathname]);
    const data = [
        {
            id: 1,
            name: 'Math Course'
        },
        {
            id: 2,
            name: 'Biology Course'
        },
        {
            id: 3,
            name: 'Chemistry Course'
        },
        {
            id: 4,
            name: 'Physic Course'
        },
        {
            id: 5,
            name: 'English Course'
        },

    ]
    return (
        <div className="class">

            {showAddCourseButton && <>
                <div className="class__add-class">
                    <Link to={addNewCoursePath} className="add-new-course">
                        <Button style={{ width: 100 + '%' }} variant="contained" endIcon={<Add />}>
                            Add new class
                        </Button>
                    </Link>
                </div>
            </>}



            {
                data.length > 0 &&
                <>
                    <ul className="class__list">
                        {
                            data.map(c =>
                                <li className="list-style-none" key={c.id}>
                                    <NavLink activeClassName="activelass" className="class__item pointer d-flex align-items-center justify-content-center" to={`${rootPath.path}/${c.id}`}>
                                        {c.name}
                                    </NavLink>
                                </li>

                            )
                        }
                    </ul>
                </>
            }


        </div>
    );
}

export default Courses;