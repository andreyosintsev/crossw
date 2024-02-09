import React from 'react'
import { FC } from 'react';

import { BrowserRouter as Router} from 'react-router-dom';

import AppHeader from  '../app-header/app-header';
import AppWrapper from '../app-wrapper/app-wrapper';
import PageSwitch from '../page-switch/page-switch';

import { SITE_NAME } from '../../options';

const App: FC = () => {
    return (
        <>
        <AppWrapper>
            <AppHeader siteName = { SITE_NAME } />

            <Router>
                
                <PageSwitch />

            </Router>
        
        </AppWrapper>

        </>
    )
}

export default App;
