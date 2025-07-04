import React from 'react';
import TopNavigationMainPage from '../Navigation/TopNavigation/TopNavigationMainPage';
import SideNavigationMainPage from '../Navigation/SideNavigation/SideNavigationMainPage';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

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
    return (
        <AnnualLeaveContainerMainPageMainDivBox>
            <TopNavigationMainPage></TopNavigationMainPage>
            <div className="Personal_Main_Float">
                <div className="Personal_Main_Float_Left">
                    <SideNavigationMainPage NavState={'Man_Day'}></SideNavigationMainPage>
                </div>

                <div className="Personal_Main_Float_Right">{/* <ToolSelect></ToolSelect> */}</div>
            </div>
        </AnnualLeaveContainerMainPageMainDivBox>
    );
};

export default ManDayMainPage;
