import React, { useEffect, useState } from 'react';
import { AnnualLeaveContainerMainPageMainDivBox } from '../ManDay/ManDayMainPage';
import TopNavigationMainPage from '../Navigation/TopNavigation/TopNavigationMainPage';
import SideNavigationMainPage, { AnnualLeaveNavigationMainPageMainDivBox } from '../Navigation/SideNavigation/SideNavigationMainPage';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AiFillCalendar } from 'react-icons/ai';
import { RiListOrdered2 } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import DepartmentMainPage from './Department/DepartmentMainPage';
import UserContentMainPage from './User/UserContentMainPage';
import AccessMainPage from './Access/AccessMainPage';
import HolidayMainPage from './Holiday/HolidayMainPage';
const UserMainPage = () => {
    const { Select_Menus } = useParams();
    const { pathname } = useLocation();
    const Navigate = useNavigate();
    const Login_Info = useSelector(state => state.Login_Info_Reducer_State.Login_Info);
    const [NavState, setNavState] = useState('');

    useEffect(() => {
        if (!Select_Menus) Navigate('user');
    }, [Select_Menus]);

    const [User_Side_Menu_List, setUser_Side_Menu_List] = useState([
        {
            Menu_Select: 'user',
            Menu_List: [
                {
                    menu_name: '사용자',
                    menu_path: '/User_Manage/user',
                    menu_title: '/User_Manage/user',
                    menu_show_access: 'user',
                },
            ],
        },
        {
            Menu_Select: 'department',
            Menu_List: [
                {
                    menu_name: '부서 조회',
                    menu_path: '/User_Manage/department',
                    menu_title: '/User_Manage/department',
                    menu_show_access: 'user',
                },
            ],
        },
        {
            Menu_Select: 'access',
            Menu_List: [
                {
                    menu_name: '권한 관리',
                    menu_path: '/User_Manage/access',
                    menu_title: '/User_Manage/access',
                    menu_show_access: 'user',
                },
            ],
        },
        {
            Menu_Select: 'holiday',
            Menu_List: [
                {
                    menu_name: '공휴일 관리',
                    menu_path: '/User_Manage/holiday',
                    menu_title: '/User_Manage/holiday',
                    menu_show_access: 'holiday',
                },
            ],
        },
    ]);

    return (
        <AnnualLeaveContainerMainPageMainDivBox>
            <TopNavigationMainPage></TopNavigationMainPage>
            <div className="Personal_Main_Float">
                <div className="Personal_Main_Float_Left">
                    <AnnualLeaveNavigationMainPageMainDivBox>
                        <div>
                            <div className="PersonalNavigation_WorkStatus">
                                <div>
                                    <ul className="PersonalNavigation_WorkStatus_ListsShow">
                                        {User_Side_Menu_List.map(item =>
                                            item.Menu_List.map(list => {
                                                return (
                                                    <li
                                                        key={list.menu_path}
                                                        id={pathname === list.menu_path ? 'PersonalNavigation_WorkStatus_CurrentPage' : ''}
                                                        onClick={() => {
                                                            Navigate(list.menu_path);
                                                        }}
                                                    >
                                                        <span>{list.menu_name}</span>
                                                    </li>
                                                );
                                            })
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </AnnualLeaveNavigationMainPageMainDivBox>
                </div>

                <div className="Personal_Main_Float_Right">
                    {Select_Menus === 'department' ? <DepartmentMainPage></DepartmentMainPage> : ''}
                    {Select_Menus === 'user' ? <UserContentMainPage></UserContentMainPage> : ''}
                    {Select_Menus === 'access' ? <AccessMainPage></AccessMainPage> : ''}
                    {Select_Menus === 'holiday' ? <HolidayMainPage></HolidayMainPage> : ''}
                </div>
            </div>
        </AnnualLeaveContainerMainPageMainDivBox>
    );
};

export default UserMainPage;
