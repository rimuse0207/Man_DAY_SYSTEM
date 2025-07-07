import React, { useEffect, useState } from 'react';
import { Request_Get_Axios } from '../../../../API';
import styled from 'styled-components';
import { FaRegSquare } from 'react-icons/fa';
import { FaRegCheckSquare } from 'react-icons/fa';
const UserInfoMainDivBox = styled.div`
    width: 100%;
    padding: 10px;
    table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.8em;
    }

    th,
    td {
        border: none;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        padding: 5px;
        text-align: center;
        border-left: none;
        border-right: none;
    }

    th {
        color: black;
    }
`;

const UsersInfo = ({ NowSelect }) => {
    useEffect(() => {
        if (NowSelect) Getting_User_Info_Data_Iclduing_Department();
    }, [NowSelect]);
    const [Getting_Users, setGetting_Users] = useState([]);
    const [AllChecking, setAllChecking] = useState(false);
    const Getting_User_Info_Data_Iclduing_Department = async () => {
        const Getting_User_Info_Data_Iclduing_Department_Axios = await Request_Get_Axios(
            '/API/PLM/user/Getting_User_Info_Data_Iclduing_Department',
            {
                NowSelect,
            }
        );
        setGetting_Users(Getting_User_Info_Data_Iclduing_Department_Axios.data);
    };

    const Handle_Clicks_User = list => {
        const Checked_Change_Data = Getting_Users.map(item => {
            return item.email === list.email ? { ...item, checked: !list.checked } : { ...item };
        });
        setGetting_Users(Checked_Change_Data);
        console.log(
            Checked_Change_Data.filter(item => item.checked).length,
            Getting_Users.length,
            Checked_Change_Data.filter(item => item.checked).length === Getting_Users.length
        );
        if (Checked_Change_Data.filter(item => item.checked).length > 0) {
            setAllChecking(false);
        } else if (Checked_Change_Data.filter(item => item.checked).length === Getting_Users.length) {
            setAllChecking(true);
        }
    };

    // 수신자 모두 체크
    const HandleClicks_All_Users = () => {
        setGetting_Users(
            Getting_Users.map(item => {
                return { ...item, checked: !AllChecking };
            })
        );
        setAllChecking(!AllChecking);
    };

    return (
        <UserInfoMainDivBox>
            <h4 style={{ marginBottom: '10px' }}>부서원 목록</h4>
            <div>
                <div></div>
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => HandleClicks_All_Users()}>
                                {AllChecking ? <FaRegCheckSquare /> : <FaRegSquare></FaRegSquare>}
                            </th>
                            <th>이름</th>
                            <th>부서</th>
                            <th>호봉</th>
                            <th>연차</th>
                            <th>ID</th>
                            <th>직군</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Getting_Users.map(list => {
                            return (
                                <tr
                                    key={list.email}
                                    onClick={() => Handle_Clicks_User(list)}
                                    style={list.checked ? { backgroundColor: 'RGB(239, 244, 252)' } : {}}
                                >
                                    <td style={list.checked ? { color: 'blue' } : {}}>
                                        {list.checked ? <FaRegCheckSquare /> : <FaRegSquare></FaRegSquare>}
                                    </td>
                                    <td>{list.name}</td>
                                    <td>{list.user_department}</td>
                                    <td>{list.user_salarygrade}</td>
                                    <td>{list.user_gradebounce}</td>
                                    <td>{list.email}</td>
                                    <td>{list.user_occupational}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </UserInfoMainDivBox>
    );
};
export default UsersInfo;
