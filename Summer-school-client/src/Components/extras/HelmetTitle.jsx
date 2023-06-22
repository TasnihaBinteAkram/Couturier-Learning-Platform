import React from 'react';
import { Helmet } from 'react-helmet-async';

const HelmetTitle = ({children}) => {
    return (
        <Helmet>
            <title>{children}</title>
        </Helmet>
    );
};

export default HelmetTitle;