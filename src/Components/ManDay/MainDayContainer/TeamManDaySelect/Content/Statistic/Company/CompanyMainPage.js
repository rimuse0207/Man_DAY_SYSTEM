import React from 'react';
import CommonFilters from '../CommonFilters/CommonFilters';
import { PersonMainPageMainDivBox } from '../Person/PersonMainPage';

const CompanyMainPage = ({ menuCode }) => {
    return (
        <PersonMainPageMainDivBox>
            <CommonFilters menuCode={menuCode}></CommonFilters>
        </PersonMainPageMainDivBox>
    );
};

export default CompanyMainPage;
