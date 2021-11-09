import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
TabList.propTypes = {

};

function TabList(props) {
    const { selected, data, handleChangeTab } = props
    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const onChangeTab = (event, newValue) => {
        handleChangeTab(newValue);
    };
    return (
        <div>
            <Tabs indicatorColor="secondary"
                textColor="secondary"
                value={selected} onChange={onChangeTab} aria-label="basic tabs example">
                {
                    data.map((d) => <Tab label={d.label} {...a11yProps(d.value)} />)
                }
            </Tabs>
        </div>
    );
}

export default TabList;