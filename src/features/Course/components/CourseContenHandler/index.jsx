import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { COURSE_DETAIL_TEST_TAB, COURSE_DETAIL_SUBMISSION_TAB } from 'features/Course/constant/tabs';
import TabList from 'components/Tabs/TabList';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import './style.scss'
CourseContentHandler.propTypes = {

};

function CourseContentHandler(props) {
    const [selectedTab, setSelectedTab] = useState(COURSE_DETAIL_TEST_TAB)
    const tabs = [
        {
            label: 'Tests',
            value: COURSE_DETAIL_TEST_TAB,
        },
        {
            label: 'Submissions',
            value: COURSE_DETAIL_SUBMISSION_TAB
        }
    ]
    const handleChangeTab = (newValue) => {
        setSelectedTab(newValue)
    }
    return (
        <div className="content-handler-container">
            <section className="content__tab">
                <TabList data={tabs} selected={selectedTab} handleChangeTab={handleChangeTab} />
            </section>
            <section className="content__action">
                <Button startIcon={<AddIcon />} variant="contained">Add new test</Button>
            </section>
        </div>
    );
}

export default CourseContentHandler;