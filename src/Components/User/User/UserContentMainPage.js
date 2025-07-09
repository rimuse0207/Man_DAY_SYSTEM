import React, { useEffect, useState } from 'react';
import { DepartmentMainPageMainDivBox } from '../Department/DepartmentMainPage';
import { UserInfoMainDivBox } from '../Department/Contents/UsersInfo';
import { Request_Get_Axios } from '../../../API';
import styled from 'styled-components';
import UserModal from './Contents/UserModal';
import AddUserModal from './Contents/AddUserModal';

export const UserContentMainPageButtonContainer = styled.div`
    text-align: end;
    margin-bottom: 10px;
    button {
        margin-right: 20px;
        border: 1px solid lightgray;
        padding: 7px;
        padding-left: 15px;
        padding-right: 15px;
        border-radius: 5px;
        background-color: #fff;
        &:hover {
            cursor: pointer;
            opacity: 0.7;
        }
    }
`;

const UserContentMainPage = () => {
    const [User_Lists_State, setUser_Lists_State] = useState([]);
    const [SearchInput, setSearchInput] = useState('');
    const [Select_User, setSelect_User] = useState(null);
    const [User_Modal_IsOpen, setUser_Modal_IsOpen] = useState(false);
    const [Update_Mode, setUpdate_Mode] = useState(false);
    const [AddUserModalOpen, setAddUserModalOpen] = useState(false);
    useEffect(() => {
        Getting_All_User_Info();
    }, []);
    const Getting_All_User_Info = async () => {
        const Getting_All_User_Info_Axios = await Request_Get_Axios('/API/PLM/user/Getting_All_User_Info');
        if (Getting_All_User_Info_Axios.status) {
            setUser_Lists_State(Getting_All_User_Info_Axios.data);
        }
    };
    return (
        <DepartmentMainPageMainDivBox>
            <div style={{ borderBottom: '1px solid lightgray', paddingBottom: '10px' }}>
                <h2>사용자</h2>
                <div style={{ fontSize: '0.8em', marginTop: '10px', color: 'gray' }}>사용자 정보를 조회/관리할 수 있습니다.</div>
            </div>
            <UserInfoMainDivBox>
                <div>
                    <div style={{ fontSize: '0.9em' }}>
                        <span>사용자 수 ({User_Lists_State.length})</span>
                        <span style={{ marginLeft: '20px' }}>
                            <input
                                value={SearchInput}
                                onChange={e => setSearchInput(e.target.value)}
                                style={{
                                    border: '1px solid lightgray',
                                    height: '30px',
                                    paddingLeft: '10px',
                                    borderRadius: '5px',
                                    width: '300px',
                                }}
                                placeholder="검색..."
                            ></input>
                        </span>
                    </div>

                    <UserContentMainPageButtonContainer>
                        <button onClick={() => setAddUserModalOpen(true)}>추 가</button>
                    </UserContentMainPageButtonContainer>
                </div>

                <table style={{ fontSize: '0.9em' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'RGB(239, 244, 252)' }}>
                            <th>이름</th>
                            <th>부서</th>
                            <th>호봉</th>
                            <th>연차</th>
                            <th>ID</th>
                            <th>직군</th>
                        </tr>
                    </thead>
                    <tbody>
                        {User_Lists_State.filter(
                            item =>
                                item.name.toLowerCase().includes(SearchInput.toLowerCase()) ||
                                item.email.toLowerCase().includes(SearchInput.toLowerCase()) ||
                                item.user_department.toLowerCase().includes(SearchInput.toLowerCase())
                        ).map(list => {
                            return (
                                <tr
                                    key={list.email}
                                    onClick={() => {
                                        setSelect_User(list);
                                        setUser_Modal_IsOpen(true);
                                    }}
                                    style={list.email === Select_User?.email ? { backgroundColor: 'RGB(239, 244, 252)' } : {}}
                                >
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

                <div style={{ marginBottom: '50px' }}></div>
            </UserInfoMainDivBox>
            {User_Modal_IsOpen ? (
                <UserModal
                    Getting_All_User_Info={() => Getting_All_User_Info()}
                    Select_User={Select_User}
                    setSelect_User={data => setSelect_User(data)}
                    isOpen={User_Modal_IsOpen}
                    onClose={data => {
                        setUser_Modal_IsOpen(false);
                        setSelect_User(null);
                    }}
                    Update_Mode={Update_Mode}
                    setUpdate_Mode={data => setUpdate_Mode(data)}
                ></UserModal>
            ) : (
                <></>
            )}
            {AddUserModalOpen ? (
                <AddUserModal
                    Getting_All_User_Info={() => Getting_All_User_Info()}
                    onClose={data => {
                        setAddUserModalOpen(false);
                    }}
                ></AddUserModal>
            ) : (
                <></>
            )}
        </DepartmentMainPageMainDivBox>
    );
};

export default UserContentMainPage;
