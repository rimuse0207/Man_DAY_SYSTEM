import React from 'react';
import { AnnualLeaveContainerMainPageMainDivBox } from '../../ManDayMainPage';
import TopNavigationMainPage from '../../../Navigation/TopNavigation/TopNavigationMainPage';
import SideNavigationMainPage from '../../../Navigation/SideNavigation/SideNavigationMainPage';
import ContentMainPage from './Contents/ContentMainPage';

const ManDayApplyMain = () => {
    return (
        <AnnualLeaveContainerMainPageMainDivBox>
            <TopNavigationMainPage></TopNavigationMainPage>
            <div className="Personal_Main_Float">
                <div className="Personal_Main_Float_Left">
                    <SideNavigationMainPage NavState={'Man_Day'}></SideNavigationMainPage>
                </div>

                <div className="Personal_Main_Float_Right">
                    <ContentMainPage></ContentMainPage>
                </div>
            </div>
        </AnnualLeaveContainerMainPageMainDivBox>
    );
};

export default ManDayApplyMain;
