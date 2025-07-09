import React, { useState } from 'react';
import { Route, Routes, Router, BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginRoute from './LoginRoute/LoginRouteMainPage';
import LoginMainPage from '../Login/LoginMainPage';
import HomeMainPage from '../../Components/HomeMain/HomeMainPage';
import ManDayMainPage from '../ManDay/ManDayMainPage';
import ManDayApplyMain from '../ManDay/MainDayContainer/ManDayApply/ManDayApplyMain';
import UserMainPage from '../User/UserMainPage';
const RouterMainPage = () => {
    const User_Info = useSelector(state => state.Login_Info_Reducer_State.Login_Info);
    const [RouterInfo, setRouterInfo] = useState([
        {
            path: '/',
            element: <LoginMainPage></LoginMainPage>,
            withAuthorization: false,
            withAdminAuthorization: false,
        },
        {
            path: '/Home',
            element: <HomeMainPage></HomeMainPage>,
            withAuthorization: true,
            withAdminAuthorization: false,
        },
        {
            path: '/Man_Day',
            element: <ManDayMainPage></ManDayMainPage>,
            withAuthorization: true,
            withAdminAuthorization: false,
        },
        {
            path: '/Man_Day/Apply',
            element: <ManDayApplyMain></ManDayApplyMain>,
            withAuthorization: true,
            withAdminAuthorization: false,
        },
        {
            path: '/User_Manage',
            element: <UserMainPage></UserMainPage>,
            withAuthorization: true,
            withAdminAuthorization: false,
        },
        {
            path: '/User_Manage/:Select_Menus',
            element: <UserMainPage></UserMainPage>,
            withAuthorization: true,
            withAdminAuthorization: false,
        },
        // {
        //     path: '/Tool',
        //     element: <ToolMainPage></ToolMainPage>,
        //     withAuthorization: true,
        //     withAdminAuthorization: false,
        // },
        // {
        //     path: '/Tool/Apply',
        //     element: <ToolApply></ToolApply>,
        //     withAuthorization: true,
        //     withAdminAuthorization: false,
        // },
        // {
        //     path: '/Tool/Apply/:Disco_Code/:Disco_Name',
        //     element: <ToolApply></ToolApply>,
        //     withAuthorization: true,
        //     withAdminAuthorization: false,
        // },
        // {
        //     path: '/Tool/Select',
        //     element: <ToolsLists></ToolsLists>,
        //     withAuthorization: true,
        //     withAdminAuthorization: false,
        // },
        // {
        //     path: '/Safety_Management',
        //     element: <SafetyManagementMainPage></SafetyManagementMainPage>,
        //     withAuthorization: true,
        //     withAdminAuthorization: false,
        // },
        // // 관리자용
        // {
        //     path: '/Tool/Administrator/DashBoard',
        //     element: <DashBoard></DashBoard>,
        //     withAuthorization: true,
        //     withAdminAuthorization: false,
        // },
        // {
        //     path: '/Tool/Administrator/Select',
        //     element: <AdminToolInfoList></AdminToolInfoList>,
        //     withAuthorization: true,
        //     withAdminAuthorization: false,
        // },
        // {
        //     path: '/Tool/Administrator/Insert/addToolsInfo',
        //     element: <InsertMainPage></InsertMainPage>,
        //     withAuthorization: true,
        //     withAdminAuthorization: false,
        // },
        // {
        //     path: '/Tool/Administrator/Update/UpdateToolsInfo/:tool_code',
        //     element: <UpdateMainPage></UpdateMainPage>,
        //     withAuthorization: true,
        //     withAdminAuthorization: false,
        // },
    ]);

    return (
        <BrowserRouter>
            <Routes>
                {RouterInfo.map(route => {
                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                <LoginRoute
                                    withAdminAuthorization={route.withAdminAuthorization}
                                    withAuthorization={route.withAuthorization}
                                    component={route.element}
                                    User_Info={User_Info}
                                ></LoginRoute>
                            }
                        ></Route>
                    );
                })}
            </Routes>
        </BrowserRouter>
    );
};
export default RouterMainPage;
