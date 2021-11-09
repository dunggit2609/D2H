import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import Search from 'components/Search';
import Courses from 'features/Course/components/Courses';
SideBar.propTypes = {

};

function SideBar(props) {

    return (
        <div className="sidebar">
            <div className="sidebar__search">
              <Search />
            </div>
            <div className="sidebar__list-class">
                <Courses />
            </div>
        </div>
    );
}

export default SideBar;