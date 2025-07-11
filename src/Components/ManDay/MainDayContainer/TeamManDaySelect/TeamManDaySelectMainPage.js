import React, { useEffect } from 'react';
import { AnnualLeaveContainerMainPageMainDivBox } from '../../ManDayMainPage';
import SideNavigationMainPage from '../../../Navigation/SideNavigation/SideNavigationMainPage';
import TopNavigationMainPage from '../../../Navigation/TopNavigation/TopNavigationMainPage';
import MainContent from './Content/MainContent';
import { useDispatch } from 'react-redux';
import { AllManDayItemfetchData } from '../../../../Models/ReduxThunks/ManDaySelectItemReducer';

const TeamManDaySelectMainPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(AllManDayItemfetchData());
    }, []);
    return (
        <AnnualLeaveContainerMainPageMainDivBox>
            <TopNavigationMainPage></TopNavigationMainPage>
            <div className="Personal_Main_Float">
                <div className="Personal_Main_Float_Left">
                    <SideNavigationMainPage NavState={'Man_Day'}></SideNavigationMainPage>
                </div>

                <div className="Personal_Main_Float_Right">
                    <MainContent></MainContent>
                </div>
            </div>
        </AnnualLeaveContainerMainPageMainDivBox>
    );
};

export default TeamManDaySelectMainPage;
