import React from 'react';
import { Link } from 'react-router-dom';

const Tab = ({ tab, active }) => {
    return (
        <Link to={"/insight/" + tab._id} className={('button1' + (active ? ' active' : ''))}>
            {tab.name}
        </Link>
    )
}

export default Tab;