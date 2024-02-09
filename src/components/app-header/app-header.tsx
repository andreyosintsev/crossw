import React from 'react';
import { FC } from 'react';

import IAppHeader from './app-header.interface';
import styles from './app-header.module.scss';

const AppHeader: FC<IAppHeader> = ({ siteName }) => {
    return (
        <h1 className={styles.title}>
            
            { siteName }        

        </h1>
    )
}

export default AppHeader