import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { COURSE_DETAIL_TEST_TAB, COURSE_DETAIL_SUBMISSION_TAB } from 'features/Course/constant/tabs';
import TabList from 'components/Tabs/TabList';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import './style.scss'
import { useTranslation } from 'react-i18next';
import qs from 'query-string';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from 'hooks/useQuery';
import { _LIST_LINK } from 'constant/config';

CourseContentHandler.propTypes = {

};

function CourseContentHandler(props) {
    const [selectedTab, setSelectedTab] = useState(0)
    const { t } = useTranslation()
    const location = useLocation()
    const history = useHistory()
    const { tab } = useQuery()
    const {courseId} = useParams()
    const tabs = [
        {
            label: t('tab_label.test'),
            value: COURSE_DETAIL_TEST_TAB,
        },
        {
            label: t('tab_label.assignment'),
            value: COURSE_DETAIL_SUBMISSION_TAB
        }
    ]

    useEffect(() => {
        if (!tab) {
            console.log("hjerex", tab)
            const selected = tabs.map(v => v.value).indexOf(COURSE_DETAIL_TEST_TAB)
            setSelectedTab(selected)
            handleChangeTab(selected)
        } else {
            const selected = tabs.map(v => v.value).indexOf(tab)
            setSelectedTab(selected)
            handleChangeTab(selected)

        }

    }, [tab])

    const handleChangeTab = (newValue) => {
        const query = { tab: tabs[newValue].value }
        const searchString = qs.stringify(query)
        history.push({ pathname: location.pathName, search: searchString })
    }
    
    const handleCreateNewTest = () => {
        if (!courseId) {
            return
        }

        const url = _LIST_LINK.testCreate.replace(':courseId', courseId)
        history.push({pathname: url})
    }

    return (
        <div className="content-handler-container">
            {/* <section className="content__tab">
                <TabList data={tabs} selected={selectedTab} handleChangeTab={handleChangeTab} />
            </section> */}
            <section className="content__action">
            <Button startIcon={<AddIcon />} variant="contained" onClick={handleCreateNewTest}>Add new test</Button>

            </section>
        </div>
    );
}

export default CourseContentHandler;