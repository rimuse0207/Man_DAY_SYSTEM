import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { AiFillCalendar } from 'react-icons/ai';
import { FaCalendarAlt } from 'react-icons/fa';
import { BsBarChartFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { RiListOrdered2 } from 'react-icons/ri';

export const AnnualLeaveNavigationMainPageMainDivBox = styled.div`
    border-right: 1px solid lightgray;
    min-height: calc(100vh - 80px);
    background-color: #eff4fc;
    .PersonalNavigation_Box {
        border-bottom: 2px solid lightgray;
        height: 100px;
        padding: 20px 5px 18px;
        a {
            color: #fff;
        }
    }
    .PersonalNavigation_ApplyPage {
        width: 90%;
        margin: 0 auto;
        border-radius: 5px;
        height: 50px;
        line-height: 50px;
        font-size: 1.1em;
        text-align: center;
        background: #2985db;
        font-weight: bolder;
        border-bottom: 1px solid lightgray;
        color: #fff;
        :hover {
            cursor: pointer;
            background: #056ac9;
        }
    }

    .PersonalNavigation_WorkStatus {
        padding: 20px 5px 18px;
        .PersonalNavigation_WorkStatus_HiddenShowDiv {
            height: 40px;
            line-height: 40px;
            font-size: 1em;
            font-weight: bold;
            padding-left: 5px;
            color: #8e8d8d;
            :hover {
                background: #eeef;
                cursor: pointer;
            }
            .PersonalNavigation_WorkStatus_HiddenShowDiv_iconsUp {
                svg {
                    -ms-transform: rotate(-180deg); /* IE 9 */
                    -webkit-transform: rotate(-180deg); /* Chrome, Safari, Opera */
                    transform: rotate(-180deg);
                    transition: all 0.5s;
                    font-size: 1.6em;
                }
            }
            .PersonalNavigation_WorkStatus_HiddenShowDiv_iconsDown {
                svg {
                    transition: all 0.5s;
                    font-size: 1.6em;
                }
            }
        }
        .PersonalNavigation_WorkStatus_ListsShow {
            margin: 10px;
        }
        li {
            padding-top: 13px;
            padding-bottom: 13px;
            padding-left: 30px;
            .PersonalNavigation_WorkStatus_ListsShow_Icons {
                color: gray;
                margin-right: 10px;
            }
            :hover {
                /* background: #eeef; */
                cursor: pointer;
            }
        }
        #PersonalNavigation_WorkStatus_CurrentPage {
            background: rgba(41, 133, 219, 0.1);
            color: #056ac9;
            font-weight: bold;
            .PersonalNavigation_WorkStatus_ListsShow_Icons {
                color: #056ac9;
            }
            :hover {
                cursor: pointer;
            }
        }
    }
`;

const SideNavigationMainPage = ({ NavState, setHistoryPageOpen }) => {
    const { pathname } = useLocation();
    const Navigate = useNavigate();
    const Login_Info = useSelector(state => state.Login_Info_Reducer_State.Login_Info);
    const [User_Side_Menu_List, setUser_Side_Menu_List] = useState([
        {
            Menu_Select: 'Man_Day',
            Menu_List: [
                {
                    menu_name: 'Man_day 조회',
                    menu_path: '/Man_day',
                    menu_title: '/Man_day',
                    menu_show_access: 'user',
                    menu_icon: <AiFillCalendar></AiFillCalendar>,
                },
            ],
        },
    ]);
    const [Admin_Side_Menu_List, setAdmin_Side_Menu_List] = useState([
        {
            Menu_Select: 'man_day',
            Menu_List: [
                {
                    menu_name: '팀원 Man_day 조회',
                    menu_path: '/Man_day/Team/Select',
                    menu_title: '/Man_day팀원 조회',
                    menu_show_access: 'admin',
                    menu_icon: <AiFillCalendar></AiFillCalendar>,
                },
            ],
        },
        {
            Menu_Select: 'board',
            Menu_List: [
                {
                    menu_name: '관리자 Tool 리스트',
                    menu_path: '/Tool/Administrator/Select',
                    menu_title: '/Tool',
                },
            ],
        },
    ]);

    useEffect(() => {}, [NavState]);

    const Nav_List_Change = Select_Menu => {
        const Get_Data = Select_Menu.filter(item => (item.Menu_Select === NavState ? item : ''));

        return Get_Data[0];
    };

    return (
        <AnnualLeaveNavigationMainPageMainDivBox>
            <div className="PersonalNavigation_Box">
                <div
                    className="PersonalNavigation_ApplyPage"
                    onClick={() => {
                        Navigate('/Man_day/Apply');
                    }}
                >
                    <div>Man_day 입력</div>
                </div>
            </div>
            <div>
                <div className="PersonalNavigation_WorkStatus">
                    <div>
                        <ul className="PersonalNavigation_WorkStatus_ListsShow">
                            {User_Side_Menu_List.filter(item => item.Menu_Select === NavState).map(item =>
                                item.Menu_List.map(list => {
                                    return (
                                        <li
                                            key={list.menu_path}
                                            id={pathname === list.menu_path ? 'PersonalNavigation_WorkStatus_CurrentPage' : ''}
                                            onClick={() => {
                                                Navigate(list.menu_path);
                                            }}
                                        >
                                            <span className="PersonalNavigation_WorkStatus_ListsShow_Icons">{list.menu_icon}</span>
                                            <span>{list.menu_name}</span>
                                        </li>
                                    );
                                })
                            )}
                        </ul>
                    </div>
                    {Login_Info.admin_access.some(list => list.accessMenuCode === NavState?.toLowerCase()) ? (
                        <div style={{ marginTop: '30px' }}>
                            <div>관리자</div>
                            <ul className="PersonalNavigation_WorkStatus_ListsShow">
                                {Admin_Side_Menu_List.filter(item => item.Menu_Select === NavState?.toLowerCase()).map(item =>
                                    item.Menu_List.map(list => {
                                        return (
                                            <li
                                                key={list.menu_path}
                                                id={pathname === list.menu_path ? 'PersonalNavigation_WorkStatus_CurrentPage' : ''}
                                                onClick={() => {
                                                    Navigate(list.menu_path);
                                                }}
                                            >
                                                <span className="PersonalNavigation_WorkStatus_ListsShow_Icons">{list.menu_icon}</span>
                                                <span>{list.menu_name}</span>
                                            </li>
                                        );
                                    })
                                )}
                            </ul>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </AnnualLeaveNavigationMainPageMainDivBox>
    );
};
export default SideNavigationMainPage;
