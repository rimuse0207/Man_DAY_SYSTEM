import React, { useEffect } from 'react';
import { AnnualLeaveContainerMainPageMainDivBox } from '../../ManDayMainPage';
import TopNavigationMainPage from '../../../Navigation/TopNavigation/TopNavigationMainPage';
import SideNavigationMainPage from '../../../Navigation/SideNavigation/SideNavigationMainPage';
import ContentMainPage from './Contents/ContentMainPage';
import { AllManDayItemfetchData } from '../../../../Models/ReduxThunks/ManDaySelectItemReducer';
import { useDispatch } from 'react-redux';
import { Man_Day_Select_Option_fetchData } from '../../../../Models/ReduxThunks/ManDaySelectOptionReducer';

const ManDayApplyMain = () => {
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(AllManDayItemfetchData());
    // }, []);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Man_Day_Select_Option_fetchData());
    }, []);
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
