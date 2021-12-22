import React from 'react';
import { SearchOutlined } from  '@material-ui/icons';
import './styles.scss'
import { useTranslation } from 'react-i18next';

function Search(props) {
    //data
    const { t } = useTranslation()
    //methods
    const onSearch = (event) => {
    }
    return (
        <div className="search-container d-flex">
            <span className=" d-flex align-items-center">
                <SearchOutlined style={{ fontSize: 16 }} />
            </span>
            <span>
                <input className="search__input" placeholder={t("search.placeholder")} onChange={onSearch} />
            </span>
        </div>
    );
}

export default Search;