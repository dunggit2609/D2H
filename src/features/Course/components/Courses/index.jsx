import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { Add } from '@material-ui/icons';
import './style.scss'
import { NavLink, useHistory } from 'react-router-dom';
import { _LIST_LINK } from 'constant/config';

function Courses(props) {
    let history = useHistory();
    const rootPath = _LIST_LINK.course
    const onClickAddNewClass = () => {
        history.push(`${rootPath}/create-class/new`)
    }
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
            <div className="class__add-class">
                <Button onClick={onClickAddNewClass} style={{ width: 100 + '%' }} variant="contained" endIcon={<Add />}>
                    Add new class
                </Button>
            </div>
            <ul className="class__list">
                {
                    data.length > 0 &&
                    <>
                        {
                            data.map(c =>
                                <li className="list-style-none" key={c.id}>
                                    <NavLink activeClassName="activelass" className="class__item pointer d-flex align-items-center justify-content-center" to={`${rootPath}/${c.id}`}>
                                        {c.name}
                                    </NavLink>
                                </li>

                            )
                        }
                    </>
                }
            </ul>

        </div>
    );
}

export default Courses;