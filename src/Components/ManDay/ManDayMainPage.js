import React, { useEffect } from 'react';
import TopNavigationMainPage from '../Navigation/TopNavigation/TopNavigationMainPage';
import SideNavigationMainPage from '../Navigation/SideNavigation/SideNavigationMainPage';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ManDaySelectMain from './MainDayContainer/ManDaySelect/ManDaySelectMain';
import { AllManDayItemfetchData } from '../../Models/ReduxThunks/ManDaySelectItemReducer';

export const AnnualLeaveContainerMainPageMainDivBox = styled.div`
    .Personal_Main_Float {
        display: flex;
        .Personal_Main_Float_Left {
            height: 100%;
            min-height: calc(100vh - 80px);
            width: 230px;
        }
    }
    .Personal_Main_Float_Right {
        width: calc(100vw - 230px);
        padding-left: 30px;
        max-height: calc(100vh - 80px);
        overflow: auto;
    }
`;
const ManDayMainPage = () => {
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
                    <ManDaySelectMain></ManDaySelectMain>
                </div>
            </div>
        </AnnualLeaveContainerMainPageMainDivBox>
    );
};

export default ManDayMainPage;
