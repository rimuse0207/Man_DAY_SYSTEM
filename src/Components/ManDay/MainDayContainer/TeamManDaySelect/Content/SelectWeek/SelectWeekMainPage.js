import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { getWeekOfMonth } from '../../../CommonFunc/CommonFunc';
import styled from 'styled-components';
import { Request_Get_Axios } from '../../../../../../API';
import UserListsComponent from './Left/UserLists';
import { FaUserFriends } from 'react-icons/fa';
import ManDaySelect from './Right/ManDaySelect';
import { IoIosArrowBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { IoIosArrowForward } from 'react-icons/io';

export const MyListMainDivBox = styled.div`
    width: 300px;
    height: 80px;
    margin-right: 20px;
    .Sub_Box {
        background-color: #056ac9;
        border-radius: 10px;
        color: white;
        font-size: 1.2em;
        text-align: center;
        font-weight: bolder;
        height: 80px;
        .Float_Container {
            height: 80px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            ::after {
                display: block;
                content: '';
                clear: both;
            }
        }
        .Float_Left {
            float: left;
            width: 80px;
            font-size: 2.5em;
        }
        .Float_Right {
            float: right;
            width: calc(100%-80px);
            :first-child {
                font-size: 0.9em;
            }
            :nth-child(2) {
                font-size: 1.5em;
            }
        }
        .Sub_Descript_Container {
            border-top: 1px solid lightgray;
            font-size: 0.8em;
            padding-top: 10px;
            font-weight: light;
        }
    }
`;
const SelectWeekMainPageMainDivBox = styled.div`
    height: calc(100vh - 150px);
    overflow: auto;
    .GetWeekOfMonth_Container {
        margin-top: 20px;
        margin-bottom: 20px;
        .AminOnlyArrow {
            display: flex;
            align-items: center;
            .Icon_Containers {
                margin-right: 10px;
                font-size: 2em;
                &:hover {
                    cursor: pointer;
                    color: gray;
                }
            }
        }
        .Title {
            font-size: 1.7em;
            font-weight: bolder;
        }
    }
    .Left_Right_Containers {
        display: flex;
        flex-wrap: wrap;
        .Left_Container {
            width: 300px;
            padding-right: 10px;
            border-right: 1px solid lightgray;
            height: calc(100vh - 31vh);
            overflow: auto;
        }
        .Right_Container {
            width: calc(100% - 300px);
            padding-left: 10px;
            height: calc(100vh - 31vh);
            overflow: auto;
        }
    }

    .Status_Board_Container {
        li {
            border: 1px solid lightgray;
        }
    }
`;

const SelectWeekMainPage = () => {
    const Today_Date = moment().clone().startOf('isoWeek').format('YYYY-MM-DD');
    const [NowDate, setNowDate] = useState(moment().clone().startOf('isoWeek').format('YYYY-MM-DD'));
    const [UserLists, setUserLists] = useState([]);
    const [Now_Select_User, setNow_Select_User] = useState(null);
    const Login_Info = useSelector(state => state.Login_Info_Reducer_State.Login_Info);
    useEffect(() => {
        Getting_Team_Member_Lists();
    }, [NowDate]);

    const Getting_Team_Member_Lists = async () => {
        const Getting_Team_Member_Lists_Axios = await Request_Get_Axios('/API/PLM/Getting_Team_Member_Lists', {
            NowDate,
        });

        if (Getting_Team_Member_Lists_Axios.status) {
            setUserLists(Getting_Team_Member_Lists_Axios.data);
        }
    };

    const HandleChangeDate = Select_Menu => {
        if (Select_Menu === 'minus') setNowDate(moment(NowDate).clone().subtract(7, 'days').startOf('isoWeek').format('YYYY-MM-DD'));
        else setNowDate(moment(NowDate).clone().add(7, 'days').startOf('isoWeek').format('YYYY-MM-DD'));
    };

    return (
        <SelectWeekMainPageMainDivBox>
            <div className="GetWeekOfMonth_Container">
                <div className="AminOnlyArrow">
                    {Login_Info.team === '개발운영팀' || Login_Info.id === 'sjyoo@dhk.co.kr' ? (
                        <div className="Icon_Containers" onClick={() => HandleChangeDate('minus')}>
                            <IoIosArrowBack />
                        </div>
                    ) : (
                        <></>
                    )}

                    <div className="Title">{getWeekOfMonth(NowDate)}</div>
                    <div className="Sub">
                        ( {moment(NowDate).clone().startOf('isoWeek').format('MM.DD')} ~{' '}
                        {moment(NowDate).clone().startOf('isoWeek').add(4, 'days').format('MM.DD')} )
                    </div>

                    {(Login_Info.team === '개발운영팀' || Login_Info.id === 'sjyoo@dhk.co.kr') &&
                    Today_Date !== moment(NowDate).clone().startOf('isoWeek').format('YYYY-MM-DD') ? (
                        <div style={{ marginLeft: '20px' }} className="Icon_Containers" onClick={() => HandleChangeDate('plus')}>
                            <IoIosArrowForward />
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <div>
                <div style={{ display: 'flex', width: '300px', justifyContent: 'space-between' }}>
                    <div style={{ width: '100px', textAlign: 'center' }}>전체인원</div>
                    <div style={{ width: '100px', textAlign: 'center' }}>입력인원</div>
                    <div style={{ width: '100px', textAlign: 'center' }}>미입력인원</div>
                </div>
                <div style={{ display: 'flex', width: '300px', justifyContent: 'space-between' }}>
                    <div style={{ width: '100px', textAlign: 'center' }}>{UserLists.length} 명</div>
                    <div style={{ width: '100px', textAlign: 'center' }}>
                        {UserLists.filter(item => item.man_day_infos.length > 0).length} 명
                    </div>
                    <div style={{ width: '100px', textAlign: 'center' }}>
                        {UserLists.filter(item => item.man_day_infos.length === 0).length} 명
                    </div>
                </div>
            </div>
            <div className="Left_Right_Containers">
                <div className="Left_Container">
                    <UserListsComponent
                        UserLists={UserLists}
                        setNow_Select_User={data => setNow_Select_User(data)}
                        NowDate={NowDate}
                        Today_Date={Today_Date}
                    ></UserListsComponent>
                </div>
                <div className="Right_Container">
                    <h3>
                        {Now_Select_User ? `${Now_Select_User.departmentName} ${Now_Select_User.name} ${Now_Select_User.position}` : ''}
                    </h3>
                    <ManDaySelect Now_Select_User={Now_Select_User} NowDate={NowDate}></ManDaySelect>
                </div>
            </div>
        </SelectWeekMainPageMainDivBox>
    );
};

export default SelectWeekMainPage;
