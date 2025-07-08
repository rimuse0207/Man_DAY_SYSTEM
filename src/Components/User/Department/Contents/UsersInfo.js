import React, { useEffect, useState } from 'react';
import { Request_Get_Axios, Request_Post_Axios } from '../../../../API';
import styled from 'styled-components';
import { FaRegSquare } from 'react-icons/fa';
import { FaRegCheckSquare } from 'react-icons/fa';
import DepartmentMoveModal from './Modal/DepartmentMoveModal';
import { toast } from '../../../ToastMessage/ToastManager';
export const UserInfoMainDivBox = styled.div`
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
    .Open_Click_Modal_Container {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .Button_Container {
            margin-left: 20px;

            button {
                border: none;
                padding: 5px;
                background-color: #fff;
                border: 1px solid lightgray;
                border-radius: 5px;
                &:hover {
                    cursor: pointer;
                    opacity: 0.7;
                }
            }
        }
    }
`;

const UsersInfo = ({ NowSelect, Department_State, setDepartment_State }) => {
    useEffect(() => {
        if (NowSelect) {
            Getting_User_Info_Data_Iclduing_Department();
            setSelect_User_Lists([]);
            setAllChecking(false);
        }
    }, [NowSelect]);
    const [Modal_Choose_Department_State, setModal_Choose_Department_State] = useState(Department_State);
    const [ModalNowSelect, setModalNowSelect] = useState(null);
    const [Select_User_Lists, setSelect_User_Lists] = useState([]);
    const [Getting_Users, setGetting_Users] = useState([]);
    const [AllChecking, setAllChecking] = useState(false);
    const [isOpen, setisOpen] = useState(false);

    /// 부서변경 서버로 전송
    const Update_User_Info_Data = async () => {
        const Update_User_Info_Data_Axios = await Request_Post_Axios('/API/PLM/user/Update_User_Info_Data', {
            ModalNowSelect,
            Select_User_Lists,
        });

        if (Update_User_Info_Data_Axios.status) {
            toast.show({
                title: `${Select_User_Lists.length}명의 인원이 ${ModalNowSelect.itemName}로 부서이동 되었습니다.`,
                successCheck: true,
                duration: 6000,
            });
            setSelect_User_Lists([]);
            setModalNowSelect(null);
            setAllChecking(false);
            setisOpen(false);
            Getting_User_Info_Data_Iclduing_Department();
        } else {
            toast.show({
                title: `오류가 발생되었습니다. IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    // 부서별 사용자 조회
    const Getting_User_Info_Data_Iclduing_Department = async () => {
        const Getting_User_Info_Data_Iclduing_Department_Axios = await Request_Get_Axios(
            '/API/PLM/user/Getting_User_Info_Data_Iclduing_Department',
            {
                NowSelect,
            }
        );
        setGetting_Users(Getting_User_Info_Data_Iclduing_Department_Axios.data);
    };

    // List의 체크박스 등록
    const Handle_Clicks_User = list => {
        const Checked_Change_Data = Getting_Users.map(item => {
            return item.email === list.email ? { ...item, checked: !list.checked } : { ...item };
        });
        setGetting_Users(Checked_Change_Data);
        if (
            Checked_Change_Data.filter(item => item.checked).length > 0 &&
            Checked_Change_Data.filter(item => item.checked).length !== Getting_Users.length
        ) {
            setAllChecking(false);
        } else if (Checked_Change_Data.filter(item => item.checked).length === Getting_Users.length) {
            setAllChecking(true);
        }
        Select_User_Change_List(list);
    };

    // 선택된 사용자 배열에 추가
    const Select_User_Change_List = list => {
        if (list.checked) {
            // 이미 체크가 되어 있을 때, 삭제 처리
            setSelect_User_Lists(Select_User_Lists.filter(item => item.email !== list.email));
        } else {
            // 체크가 되어 있지 않을 때, 추가 처리
            setSelect_User_Lists(Select_User_Lists.concat(list));
        }
    };

    // 수신자 모두 체크
    const HandleClicks_All_Users = () => {
        if (AllChecking) {
            // 이미 체크되어 있을 때, 모든 사용자 제거
            setSelect_User_Lists([]);
        } else {
            // 체크 되어 있지 않을 때, 모든 사용자 추가
            setSelect_User_Lists(Getting_Users);
        }
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
                <div>
                    {Select_User_Lists.length > 0 ? (
                        <div className="Open_Click_Modal_Container" style={{ color: 'blue', fontSize: '0.8em' }}>
                            <div>선택된 인원 : {Select_User_Lists.length}</div>
                            <div className="Button_Container">
                                <button onClick={() => setisOpen(true)}>부서이동</button>
                            </div>
                        </div>
                    ) : (
                        <div style={{ paddingBottom: '40px' }}></div>
                    )}
                </div>
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
            <DepartmentMoveModal
                isOpen={isOpen}
                onClose={() => setisOpen(false)}
                Department_State={Modal_Choose_Department_State}
                setDepartment_State={data => setModal_Choose_Department_State(data)}
                NowSelect={ModalNowSelect}
                setNowSelect={data => setModalNowSelect(data)}
                Update_User_Info_Data={() => Update_User_Info_Data()}
            ></DepartmentMoveModal>
        </UserInfoMainDivBox>
    );
};
export default UsersInfo;
