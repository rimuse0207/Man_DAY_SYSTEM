import React, { useEffect, useState } from 'react';
import { UserInfoMainDivBox } from '../../Department/Contents/UsersInfo';
import { FaRegSquare } from 'react-icons/fa';
import { FaRegCheckSquare } from 'react-icons/fa';
import { Request_Get_Axios } from '../../../../API';
import styled from 'styled-components';

const UserTableMainDivBox = styled.div`
    td,
    th {
        text-align: center !important;
    }
    td {
        padding-left: 0px !important;
    }
`;

const UserTable = ({ NowSelect, Now_Select_Menu }) => {
    const [UserLists, setUserLists] = useState([]);
    const [AllChecking, setAllChecking] = useState(false);
    const [Selected_User_Lists, setSelected_User_Lists] = useState([]);
    useEffect(() => {
        if (NowSelect) Getting_Access_User_Info_Data_Iclduing_Department();
    }, [NowSelect]);

    // 부서별 사용자 조회
    const Getting_Access_User_Info_Data_Iclduing_Department = async () => {
        const Getting_Access_User_Info_Data_Iclduing_Department_Axios = await Request_Get_Axios(
            '/API/PLM/user/Getting_Access_User_Info_Data_Iclduing_Department',
            {
                NowSelect,
                Now_Select_Menu,
            }
        );
        if (Getting_Access_User_Info_Data_Iclduing_Department_Axios.status) {
            console.log(Getting_Access_User_Info_Data_Iclduing_Department_Axios);
            setUserLists(Getting_Access_User_Info_Data_Iclduing_Department_Axios.data);
        }
    };

    // 유저 선택 할 떄,
    const Handle_Clicks_User = list => {
        const Checked_Change_Data = UserLists.map(item => {
            return item.email === list.email ? { ...item, checked: !list.checked } : { ...item };
        });
        setUserLists(Checked_Change_Data);
        if (
            Checked_Change_Data.filter(item => item.checked).length > 0 &&
            Checked_Change_Data.filter(item => item.checked).length !== UserLists.length
        ) {
            setAllChecking(false);
        } else if (Checked_Change_Data.filter(item => item.checked).length === UserLists.length) {
            setAllChecking(true);
        } else if (Checked_Change_Data.filter(item => item.checked).length === 0) {
            setAllChecking(false);
        }
        Select_User_Change_List(list);
    };

    // 선택된 사용자 배열에 추가
    const Select_User_Change_List = list => {
        if (list.checked) {
            // 이미 체크가 되어 있을 때, 삭제 처리
            setSelected_User_Lists(Selected_User_Lists.filter(item => item.email !== list.email));
        } else {
            // 체크가 되어 있지 않을 때, 추가 처리
            setSelected_User_Lists(Selected_User_Lists.concat(list));
        }
    };

    // 수신자 모두 체크
    const HandleClicks_All_Users = () => {
        if (AllChecking) {
            // 이미 체크되어 있을 때, 모든 사용자 제거
            setSelected_User_Lists([]);
        } else {
            // 체크 되어 있지 않을 때, 모든 사용자 추가
            setSelected_User_Lists(UserLists);
        }
        setUserLists(
            UserLists.map(item => {
                return { ...item, checked: !AllChecking };
            })
        );
        setAllChecking(!AllChecking);
    };
    return (
        <UserTableMainDivBox>
            <UserInfoMainDivBox>
                <table>
                    <thead>
                        <tr>
                            <th
                                onClick={() => {
                                    HandleClicks_All_Users();
                                }}
                            >
                                {AllChecking ? <FaRegCheckSquare /> : <FaRegSquare></FaRegSquare>}
                            </th>
                            <th>이름</th>
                            <th>직위</th>
                            <th>부서</th>
                            <th>ID</th>
                            <th>직군</th>
                        </tr>
                    </thead>
                    <tbody>
                        {UserLists.map(list => {
                            return list.disable ? (
                                <tr key={list.email} style={list?.checked ? { backgroundColor: 'lightgray', opacity: '0.5' } : {}}>
                                    <td></td>
                                    <td>{list.name}</td>
                                    <td>{list.user_position}</td>
                                    <td>{list.user_department}</td>
                                    <td>{list.email}</td>
                                    <td>{list.user_occupational}</td>
                                </tr>
                            ) : (
                                <tr
                                    key={list.email}
                                    onClick={() => {
                                        Handle_Clicks_User(list);
                                    }}
                                    style={list?.checked ? { backgroundColor: 'RGB(239, 244, 252)' } : {}}
                                >
                                    <td style={list?.checked ? { color: 'blue' } : {}}>
                                        {list?.checked ? <FaRegCheckSquare /> : <FaRegSquare></FaRegSquare>}
                                    </td>
                                    <td>{list.name}</td>
                                    <td>{list.user_position}</td>
                                    <td>{list.user_department}</td>
                                    <td>{list.email}</td>
                                    <td>{list.user_occupational}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </UserInfoMainDivBox>
        </UserTableMainDivBox>
    );
};

export default UserTable;
