import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Request_Get_Axios } from '../../../../API';
import { UserInfoMainDivBox } from '../../Department/Contents/UsersInfo';
import { FaRegSquare } from 'react-icons/fa';
import { FaRegCheckSquare } from 'react-icons/fa';
import UserModal from '../../User/Contents/UserModal';
import AccessUserModal from './AccessUserModal';

const AccessListsaMainDivBox = styled.div`
    ul {
        display: flex;
        border-bottom: 1px solid lightgray;
        position: relative;
        li {
            margin-left: 20px;
            padding: 10px;

            &:hover {
                cursor: pointer;
            }
        }
    }
    input {
        border: 1px solid lightgray;
        height: 30px;
        border-radius: 5px;
        padding-left: 10px;
        width: 300px;
    }

    .Button_Container {
        position: absolute;
        bottom: 7px;
        right: 10px;
        button {
            padding: 5px;
            border: 1px solid lightgray;
            border-radius: 5px;
            background-color: #fff;
            margin-left: 10px;
            &:hover {
                cursor: pointer;
                opacity: 0.7;
            }
        }
    }
`;

const AccessLists = ({ Now_Select_Menu }) => {
    const [Select_Menus, setSelect_Menus] = useState([{ menu_name: '사용자별', menu_code: 'user' }]);
    const [Now_Select, setNow_Select] = useState('user');
    const [UserLists, setUserLists] = useState([]);
    const [Selected_User_Lists, setSelected_User_Lists] = useState([]);
    const [AllChecking, setAllChecking] = useState(false);
    const [SearchData, setSearchData] = useState('');
    useEffect(() => {
        Getting_Menu_Access_User_List();
        setAllChecking(false);
        setSelected_User_Lists([]);
    }, [Now_Select_Menu]);

    const Getting_Menu_Access_User_List = async () => {
        const Getting_Menu_Access_User_List_Axios = await Request_Get_Axios('/API/PLM/user/Getting_Menu_Access_User_List', {
            Now_Select_Menu,
        });
        if (Getting_Menu_Access_User_List_Axios.status) {
            console.log(Getting_Menu_Access_User_List_Axios);
            setUserLists(Getting_Menu_Access_User_List_Axios.data);
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
        <AccessListsaMainDivBox>
            <ul>
                {Select_Menus.map(list => {
                    return (
                        <li
                            key={list.menu_code}
                            style={list.menu_code === Now_Select ? { borderBottom: '2px solid black' } : {}}
                            onClick={() => setNow_Select(list.menu_code)}
                        >
                            {list.menu_name}
                        </li>
                    );
                })}
                <div className="Button_Container">
                    <button>삭 제</button>
                    <button>추 가</button>
                </div>
            </ul>
            <div style={{ marginTop: '10px', paddingLeft: '30px' }}>
                <input type="text" value={SearchData} onChange={e => setSearchData(e.target.value)} placeholder="검색.."></input>
            </div>
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
                            <th>호봉</th>
                            <th>연차</th>
                            <th>ID</th>
                            <th>직군</th>
                        </tr>
                    </thead>
                    <tbody>
                        {UserLists.filter(
                            item =>
                                item.name.toLowerCase().includes(SearchData.toLowerCase()) ||
                                item.email.toLowerCase().includes(SearchData.toLowerCase()) ||
                                item.user_department.toLowerCase().includes(SearchData.toLowerCase())
                        ).map(list => {
                            return (
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
                                    <td>{list.user_salarygrade}</td>
                                    <td>{list.user_gradebounce}</td>
                                    <td>{list.email}</td>
                                    <td>{list.user_occupational}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </UserInfoMainDivBox>
            <AccessUserModal Now_Select_Menu={Now_Select_Menu}></AccessUserModal>
        </AccessListsaMainDivBox>
    );
};

export default AccessLists;
