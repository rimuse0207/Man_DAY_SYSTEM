import React, { useEffect, useState } from 'react';
import { UserInfoMainDivBox } from './UsersInfo';
import { Request_Get_Axios, Request_Post_Axios } from '../../../../API';
import { FaRegCheckSquare, FaRegSquare } from 'react-icons/fa';
import UserAddModal from './Modal/UserAddModal';
import { toast } from '../../../ToastMessage/ToastManager';

const AccessUsers = ({ Department_State, NowSelect, setDepartment_State }) => {
    const [User_Lists, setUser_Lists] = useState([]);
    const [Select_User_Lists, setSelect_User_Lists] = useState([]);
    const [UserModalIsOpen, setUserModalIsOpen] = useState(false);
    useEffect(() => {
        if (NowSelect) Department_Including_User_Data();
    }, [NowSelect]);
    const Department_Including_User_Data = async () => {
        const Department_Including_User_Data_Axios = await Request_Get_Axios('/API/PLM/user/Department_Including_User_Data', {
            itemCode: NowSelect?.itemCode,
        });
        if (Department_Including_User_Data_Axios.data) {
            setUser_Lists(Department_Including_User_Data_Axios.data);
        }
    };

    const HandleAddUser = Select_User => {
        setSelect_User_Lists(Select_User_Lists.concat(Select_User));
    };

    const HandleDeleteUser = Select_User => {
        setSelect_User_Lists(Select_User_Lists.filter(item => item.email !== Select_User.email));
    };

    const Delete_User_By_DepartMents = async () => {
        const Delete_User_By_DepartMents_Axios = await Request_Post_Axios('/API/PLM/user/Delete_User_By_DepartMents', {
            NowSelect,
            Select_User_Lists,
        });
        if (Delete_User_By_DepartMents_Axios.status) {
            setSelect_User_Lists([]);
            await Department_Including_User_Data();
            toast.show({
                title: `${Select_User_Lists.length}명의 부서 조회 권한을 삭제처리 하였습니다.`,
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
        <UserInfoMainDivBox>
            <h4 style={{ marginBottom: '10px' }}>등록된 사용자 목록</h4>
            <div>
                <div>
                    {Select_User_Lists.length > 0 ? (
                        <div className="Open_Click_Modal_Container" style={{ color: 'blue', fontSize: '0.8em' }}>
                            <div>선택된 인원 : {Select_User_Lists.length}</div>
                            <div className="Button_Container">
                                <button
                                    onClick={() => {
                                        Delete_User_By_DepartMents();
                                    }}
                                >
                                    권한 삭제
                                </button>
                            </div>
                        </div>
                    ) : NowSelect ? (
                        <div style={{ paddingBottom: '40px', textAlign: 'end' }}>
                            <button
                                style={{
                                    padding: '8px 10px',
                                    fontWeight: 'bolder',
                                    background: '#fff',
                                    border: '1px solid lightgray',
                                    borderRadius: '5px',
                                }}
                                onClick={() => setUserModalIsOpen(true)}
                            >
                                {' '}
                                추 가{' '}
                            </button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>이름</th>
                            <th>직급</th>
                            <th>부서</th>
                            <th>호봉</th>
                            <th>연차</th>
                            <th>ID</th>
                            <th>직군</th>
                            <th>소유 권한</th>
                        </tr>
                    </thead>
                    <tbody>
                        {User_Lists.map(list => {
                            return (
                                <tr key={list.email} style={list.code_type !== 'original' ? { color: 'lightgray' } : {}}>
                                    {list.code_type !== 'original' ? (
                                        <td></td>
                                    ) : Select_User_Lists.some(item => item.email === list.email) ? (
                                        <td style={{ color: 'blue' }} onClick={() => HandleDeleteUser(list)}>
                                            <FaRegCheckSquare />
                                        </td>
                                    ) : (
                                        <td onClick={() => HandleAddUser(list)}>
                                            <FaRegSquare></FaRegSquare>
                                        </td>
                                    )}
                                    <td>{list.name}</td>
                                    <td>{list.user_position}</td>
                                    <td>{list.user_department}</td>
                                    <td>{list.user_salarygrade}</td>
                                    <td>{list.user_gradebounce}</td>
                                    <td>{list.email}</td>
                                    <td>{list.user_occupational}</td>
                                    <td>{list.itemName}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {UserModalIsOpen ? (
                <UserAddModal
                    onClose={() => setUserModalIsOpen(false)}
                    User_Lists={User_Lists}
                    Choose_Lists={NowSelect}
                    Department_Including_User_Data={() => Department_Including_User_Data()}
                ></UserAddModal>
            ) : (
                <></>
            )}
        </UserInfoMainDivBox>
    );
};

export default AccessUsers;
