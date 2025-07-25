import React, { useState } from 'react';
import styled from 'styled-components';
import { IoNewspaperOutline } from 'react-icons/io5';
import { BsCalendarCheck } from 'react-icons/bs';
import { RiBookletLine, RiMailCheckLine } from 'react-icons/ri';
import { FiCheckCircle } from 'react-icons/fi';
import { TbHomeStats } from 'react-icons/tb';
import { BsPersonWorkspace } from 'react-icons/bs';
import { MdOutlineGroups, MdOutlineSettingsInputComposite } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { GiMeal } from 'react-icons/gi';
import { FaTools } from 'react-icons/fa';
import { GrLicense } from 'react-icons/gr';
import { TbCalendarClock } from 'react-icons/tb';
import { FaUserCog } from 'react-icons/fa';
import { useSelector } from 'react-redux';
const HomeNavigationMainPageMainDivBox = styled.div`
    .BodyMenbar {
        font-size: 0.8em;
        height: 100px;
        background: #e0e8ee;
        width: 100%;
        .BodyContentBox {
            width: 95%;
            margin: 0 auto;
            height: 100%;
            .BodyContnetListsShow {
                display: flex;
                flex-flow: wrap;
                justify-items: center;
                padding-top: 10px;
                li {
                    width: 65px;
                    height: 65px;
                    border-radius: 50%;
                    background: #fff;
                    margin-right: 40px;
                    text-align: center;
                    :hover {
                        cursor: pointer;

                        .BodyContentIcons {
                            border-radius: 50%;
                            background: #cae4f7;
                            svg {
                                color: #2985db;
                                opacity: 0.5;
                                border-radius: 25%;
                            }
                        }
                    }

                    .BodyContentIcons {
                        width: 65px;
                        height: 65px;
                        border-radius: 50%;
                        position: relative;
                        svg {
                            position: absolute;
                            left: 3px;
                            top: 3px;
                            padding: 10px;
                            width: 60px;
                            height: 60px;
                            color: darkgray;
                        }
                    }
                    .BodyContentText {
                        margin-top: 5px;
                        color: #535559;
                    }
                }
            }
        }
        .BodyContentRight {
            float: right;
            width: 64%;
            height: 100vh;
            border: 1px solid blue;
        }
    }
`;

const IconNavigationMainPage = () => {
    const Login_Info_State = useSelector(state => state.Login_Info_Reducer_State.Login_Info);
    const [Icon_Nav_Info, setIcon_Nav_Info] = useState([
        {
            path: '/Man_day',
            icon: <TbCalendarClock></TbCalendarClock>,
            name: 'Man_day',
            role: 'all',
        },
        {
            path: '/User_Manage/user',
            icon: <FaUserCog />,
            name: 'Admin',
            role: 'user',
        },
    ]);
    const filteredNav = Icon_Nav_Info.filter(navItem => {
        return navItem.role === 'all' || Login_Info_State?.user_access?.some(access => access.accessMenuCode === navItem.role);
    });
    return (
        <HomeNavigationMainPageMainDivBox>
            <div className="BodyMenbar">
                <div className="BodyContentBox">
                    <ul className="BodyContnetListsShow">
                        {filteredNav.map(nav => {
                            return (
                                <li key={nav.path}>
                                    <Link to={nav.path}>
                                        <div className="BodyContentIcons">{nav.icon}</div>
                                        <div className="BodyContentText">{nav.name}</div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </HomeNavigationMainPageMainDivBox>
    );
};

export default IconNavigationMainPage;
