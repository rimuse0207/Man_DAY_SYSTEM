import React, { useState } from 'react';
import { UserTableMainDivBox } from '../../../Access/AccessLists/UserTable';
import { UserInfoMainDivBox } from '../UsersInfo';
import { FaRegCheckSquare, FaRegSquare } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { Request_Post_Axios } from '../../../../../API';
import { toast } from '../../../../ToastMessage/ToastManager';

const UserSelectTable = ({
    onClose,
    NowSelect,
    Now_Select_Menu,
    User_Lists,
    NowSelectedUser,
    setNowSelectedUser,
    setChecked_user_lists,
    Checked_user_lists,
    Choose_Lists,
    Department_Including_User_Data,
}) => {
    const Handle_Clicks_User = Selected_User => {
        const a = NowSelectedUser.map(list => {
            return {
                ...list,
                checked: list.email === Selected_User.email ? !list.checked : list.checked,
            };
        });
        setNowSelectedUser(a);
        if (Selected_User.checked) {
            setChecked_user_lists(Checked_user_lists.filter(item => item.email !== Selected_User.email));
        } else {
            setChecked_user_lists(Checked_user_lists.concat(Selected_User));
        }
    };

    const Handle_Add_Access_User_Lists = async () => {
        const Handle_Add_Access_User_Axios = await Request_Post_Axios('/API/PLM/user/Handle_Add_Access_User_Lists', {
            Checked_user_lists,
            Choose_Lists,
        });
        if (Handle_Add_Access_User_Axios.status) {
            await Department_Including_User_Data();
            onClose();
            toast.show({
                title: `${Checked_user_lists.length}명의 인원 ${Choose_Lists.itemName} 부서 조회 권한이 등록 되었습니다.`,
                successCheck: true,
                duration: 6000,
            });
        } else {
            toast.show({
                title: `IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    return (
        <div>
            <UserTableMainDivBox>
                <div> 선택된 유저 수:{Checked_user_lists.length}</div>
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
                            Handle_Add_Access_User_Lists();
                        }}
                    >
                        추가
                    </button>
                </div>
                {/* {Selected_User_Lists.length > 0 ? (
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
                )} */}

                <UserInfoMainDivBox>
                    <table>
                        <thead>
                            <tr>
                                <th
                                    style={{ width: '100px' }}
                                    onClick={() => {
                                        // HandleClicks_All_Users();
                                    }}
                                >
                                    {/* {AllChecking ? <FaRegCheckSquare /> : <FaRegSquare></FaRegSquare>} */}
                                </th>
                                <th>이름</th>
                                <th>직위</th>
                                <th>부서</th>
                                <th>ID</th>
                                <th>직군</th>
                            </tr>
                        </thead>
                        <tbody>
                            {NowSelectedUser.map(list => {
                                return list.disabled ? (
                                    <tr key={list.email} style={{ backgroundColor: '#efefff', opacity: '0.5' }}>
                                        <td style={{ width: '100px' }}></td>
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
        </div>
    );
};

export default UserSelectTable;
