import React, { useEffect, useState } from 'react';
import { UserInfoMainDivBox } from '../../Department/Contents/UsersInfo';
import { FaRegSquare } from 'react-icons/fa';
import { FaRegCheckSquare } from 'react-icons/fa';
import { Request_Get_Axios, Request_Post_Axios } from '../../../../API';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { toast } from '../../../ToastMessage/ToastManager';

export const UserTableMainDivBox = styled.div`
    position: relative;
    td,
    th {
        text-align: center !important;
    }
    td {
        padding-left: 0px !important;
    }
    .Showing_Select_Person_List_Container {
        display: flex;
        align-items: center;
        margin-left: 20px;
        padding: 5px;
        .Icon_Container {
            color: red;
            font-size: 1.3em;
            margin-left: 20px;
            padding-top: 5px;
            &:hover {
                cursor: pointer;
                opacity: 0.7;
            }
        }
    }
    .Button_Containers {
        position: absolute;
        top: -50px;
        right: 10px;
        z-index: 1000;
        button {
            border: 1px solid lightgray;
            padding: 10px;
            margin-left: 20px;
            border-radius: 5px;
            padding-left: 20px;
            padding-right: 20px;
            background-color: #fff;
            &:hover {
                cursor: pointer;
                opacity: 0.7;
            }
        }
    }
`;

const UserTable = ({ onClose, NowSelect, Now_Select_Menu, Getting_Menu_Access_User_List }) => {
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
                itemCode: NowSelect.itemCode,
                Now_Select_Menu,
            }
        );
        if (Getting_Access_User_Info_Data_Iclduing_Department_Axios.status) {
            const Change_Checked = Getting_Access_User_Info_Data_Iclduing_Department_Axios.data.map(list => {
                return {
                    ...list,
                    checked: Selected_User_Lists.some(item => item.email === list.email),
                };
            });
            setUserLists(Change_Checked);
        }
    };

    // 유저 선택 할 떄,
    const Handle_Clicks_User = list => {
        const Checked_Change_Data = UserLists.map(item => {
            return item.email === list.email ? { ...item, checked: !list.checked } : { ...item };
        });
        setUserLists(Checked_Change_Data);
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

    // 선택된 항목 모두 취소
    const All_Clear_Select_User = () => {
        setSelected_User_Lists([]);
        setUserLists(
            UserLists.map(list => {
                return {
                    ...list,
                    checked: false,
                };
            })
        );
        setAllChecking(false);
    };

    const Handle_Add_Access_User = async () => {
        const Handle_Add_Access_User_Axios = await Request_Post_Axios('/API/PLM/user/Handle_Add_Access_User', {
            Selected_User_Lists,
            NowSelect,
            Now_Select_Menu,
        });
        if (Handle_Add_Access_User_Axios.status) {
            await Getting_Menu_Access_User_List();
            onClose();
            toast.show({
                title: `${Selected_User_Lists.length}명의 사용자에게 ${
                    Now_Select_Menu.accessType === 'user' ? '사용자' : '관리자'
                }권한을 추가하였습니다.`,
                successCheck: true,
                duration: 6000,
            });
        } else {
            toast.show({
                title: `오류가 발생하였습니다. IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    return (
        <UserTableMainDivBox>
            <div className="Button_Containers">
                <button
                    onClick={() => {
                        onClose();
                    }}
                >
                    취소
                </button>
                <button
                    onClick={() => {
                        Handle_Add_Access_User();
                    }}
                >
                    추가
                </button>
            </div>
            {Selected_User_Lists.length > 0 ? (
                <div className="Showing_Select_Person_List_Container">
                    <div style={{ color: 'blue' }}>선택된 인원 ({Selected_User_Lists.length})</div>
                    <div
                        className="Icon_Container"
                        onClick={() => {
                            All_Clear_Select_User();
                        }}
                    >
                        <IoClose />
                    </div>
                </div>
            ) : (
                <div className="Showing_Select_Person_List_Container">
                    <div style={{ paddingTop: '5px' }}>선택된 인원</div>
                    <div className="Icon_Container"></div>
                </div>
            )}

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
                                <tr key={list.email} style={{ backgroundColor: '#efefff', opacity: '0.5' }}>
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
