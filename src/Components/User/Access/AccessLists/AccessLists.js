import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Request_Get_Axios, Request_Post_Axios } from '../../../../API';
import { UserInfoMainDivBox } from '../../Department/Contents/UsersInfo';
import { FaRegSquare } from 'react-icons/fa';
import { FaRegCheckSquare } from 'react-icons/fa';
import UserModal from '../../User/Contents/UserModal';
import AccessUserModal from './AccessUserModal';
import { toast } from '../../../ToastMessage/ToastManager';
import { FaInfoCircle } from 'react-icons/fa';

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
    const [Select_Menus, setSelect_Menus] = useState([{ menu_name: '부서', menu_code: 'department' }]);
    const [Permission_Select_Menus, setPermission_Select_Menus] = useState([
        // { menu_name: '사용자별', menu_code: 'user' },
        { menu_name: '부서', menu_code: 'department' },
    ]);
    const [Now_Select, setNow_Select] = useState('user');
    const [UserLists, setUserLists] = useState([]);
    const [Selected_User_Lists, setSelected_User_Lists] = useState([]);
    const [AllChecking, setAllChecking] = useState(false);
    const [SearchData, setSearchData] = useState('');
    const [User_Select_Modal_Open, setUser_Select_Modal_Open] = useState(false);
    const [PermissionModal, setPermissionModal] = useState(false);
    const [Permission_Select_User_Info, setPermission_Select_User_Info] = useState(null);

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

    // 유저 권한 삭제
    const Delete_Access_User_Lists = async () => {
        const Delete_Access_User_Lists_Axios = await Request_Post_Axios('/API/PLM/user/Delete_Access_User_Lists', {
            Now_Select_Menu,
            Selected_User_Lists,
        });
        if (Delete_Access_User_Lists_Axios.status) {
            toast.show({
                title: `${Selected_User_Lists.length}명의 권한을 삭제 처리 하였습니다. `,
                successCheck: true,
                duration: 6000,
            });
            setSelected_User_Lists([]);
            await Getting_Menu_Access_User_List();
        } else {
            toast.show({
                title: `오류가 발생하였습니다. IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    //조회 권한
    const Handle_Modal_Open_To_Select_Permission = select_user => {
        setPermissionModal(true);
        setPermission_Select_User_Info(select_user);
    };

    return PermissionModal ? (
        <AccessListsaMainDivBox>
            <ul>
                {Permission_Select_Menus.map(list => {
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
                <button onClick={() => setPermissionModal(false)}>취소</button>
                {/* <div className="Button_Container">
                    <button onClick={() => Delete_Access_User_Lists()}>삭 제</button>
                    <button onClick={() => setUser_Select_Modal_Open(true)}>추 가</button>
                </div> */}
            </ul>

            <div style={{ marginTop: '10px', paddingLeft: '30px' }}>
                <h3>
                    {Permission_Select_User_Info?.name} {Permission_Select_User_Info?.user_position}님의 조회 범위
                </h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '45%', height: '100%' }}>
                    <UserInfoMainDivBox>
                        <h4>등록되지 않은 리스트</h4>
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
                                {UserLists.filter(
                                    item =>
                                        item.name.toLowerCase().includes(SearchData.toLowerCase()) ||
                                        item.email.toLowerCase().includes(SearchData.toLowerCase()) ||
                                        item.user_department.toLowerCase().includes(SearchData.toLowerCase())
                                ).map(list => {
                                    return (
                                        <tr key={list.email} style={list?.checked ? { backgroundColor: 'RGB(239, 244, 252)' } : {}}>
                                            <td
                                                style={list?.checked ? { color: 'blue' } : {}}
                                                onClick={() => {
                                                    Handle_Clicks_User(list);
                                                }}
                                            >
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
                </div>
                <div style={{ width: '45%' }}>
                    <UserInfoMainDivBox>
                        <h4>등록된 리스트</h4>
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
                                {UserLists.filter(
                                    item =>
                                        item.name.toLowerCase().includes(SearchData.toLowerCase()) ||
                                        item.email.toLowerCase().includes(SearchData.toLowerCase()) ||
                                        item.user_department.toLowerCase().includes(SearchData.toLowerCase())
                                ).map(list => {
                                    return (
                                        <tr key={list.email} style={list?.checked ? { backgroundColor: 'RGB(239, 244, 252)' } : {}}>
                                            <td
                                                style={list?.checked ? { color: 'blue' } : {}}
                                                onClick={() => {
                                                    Handle_Clicks_User(list);
                                                }}
                                            >
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
                </div>
            </div>
        </AccessListsaMainDivBox>
    ) : (
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
                    <button onClick={() => Delete_Access_User_Lists()}>삭 제</button>
                    <button onClick={() => setUser_Select_Modal_Open(true)}>추 가</button>
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
                            {Now_Select_Menu?.permission ? <th>조회범위</th> : <></>}
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
                                <tr key={list.email} style={list?.checked ? { backgroundColor: 'RGB(239, 244, 252)' } : {}}>
                                    <td
                                        style={list?.checked ? { color: 'blue' } : {}}
                                        onClick={() => {
                                            Handle_Clicks_User(list);
                                        }}
                                    >
                                        {list?.checked ? <FaRegCheckSquare /> : <FaRegSquare></FaRegSquare>}
                                    </td>
                                    <td>{list.name}</td>
                                    <td>{list.user_position}</td>
                                    <td>{list.user_department}</td>
                                    <td>{list.user_salarygrade}</td>
                                    <td>{list.user_gradebounce}</td>
                                    <td>{list.email}</td>
                                    <td>{list.user_occupational}</td>
                                    {Now_Select_Menu?.permission ? (
                                        <td
                                            className="Detail_Info_Button_Container"
                                            onClick={() => Handle_Modal_Open_To_Select_Permission(list)}
                                        >
                                            <FaInfoCircle />
                                        </td>
                                    ) : (
                                        <></>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </UserInfoMainDivBox>
            {User_Select_Modal_Open ? (
                <AccessUserModal
                    Now_Select_Menu={Now_Select_Menu}
                    onClose={() => setUser_Select_Modal_Open(false)}
                    Getting_Menu_Access_User_List={() => Getting_Menu_Access_User_List()}
                ></AccessUserModal>
            ) : (
                <></>
            )}
        </AccessListsaMainDivBox>
    );
};

export default AccessLists;
