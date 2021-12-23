import React from 'react';
import StartForTabs from './tabs/StartForTabs';
import Tabs from './tabs/Tabs';

/*
an empty home page showing only a welcome message
*/

const Home = () => {
    return (
        <>
            <Tabs />
            <StartForTabs />
        </>
    );
}

export default Home;