import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { getWeekOfMonth } from '../../../CommonFunc/CommonFunc';
import styled from 'styled-components';
import { Request_Get_Axios } from '../../../../../../API';
import UserListsComponent from './Left/UserLists';
import { FaUserFriends } from 'react-icons/fa';
import ManDaySelect from './Right/ManDaySelect';

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
    const [NowDate, setNowDate] = useState(moment().format('YYYY-MM-DD'));
    const [UserLists, setUserLists] = useState([]);
    const [Now_Select_User, setNow_Select_User] = useState(null);
    useEffect(() => {
        Getting_Team_Member_Lists();
    }, []);

    const Getting_Team_Member_Lists = async () => {
        const Getting_Team_Member_Lists_Axios = await Request_Get_Axios('/API/PLM/Getting_Team_Member_Lists', {
            NowDate,
        });

        if (Getting_Team_Member_Lists_Axios.status) {
            setUserLists(Getting_Team_Member_Lists_Axios.data);
        }
    };

    return (
        <SelectWeekMainPageMainDivBox>
            <div className="GetWeekOfMonth_Container">
                <div>
                    <span className="Title">{getWeekOfMonth(NowDate)}</span>
                    <span className="Sub">
                        {' '}
                        ( {moment().clone().startOf('isoWeek').format('MM.DD')} ~{' '}
                        {moment().clone().startOf('isoWeek').add(4, 'days').format('MM.DD')} )
                    </span>
                </div>
            </div>
            <div>
                <div style={{ display: 'flex', width: '300px', justifyContent: 'space-between' }}>
                    <div style={{ width: '100px', textAlign: 'center' }}>전체인원</div>
                    <div style={{ width: '100px', textAlign: 'center' }}>입력인원</div>
                    <div style={{ width: '100px', textAlign: 'center' }}>미인원</div>
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
                    <UserListsComponent UserLists={UserLists} setNow_Select_User={data => setNow_Select_User(data)}></UserListsComponent>
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
