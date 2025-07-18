import React, { useEffect } from 'react';
import styled from 'styled-components';
import { toast } from '../../../../../../ToastMessage/ToastManager';
import { useSelector } from 'react-redux';
import { Request_Post_Axios } from '../../../../../../../API';

const UserListsMainDivBox = styled.div`
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
        padding-bottom: 6px;
        padding-top: 6px;
        text-align: center;
        border-left: none;
        border-right: none;
    }

    th {
        color: black;
        background-color: lightgray;
    }

    thead {
        tr {
            position: sticky;
            top: 0px;
        }
    }
    .Click_Buttons {
        font-weight: bolder;
        &:hover {
            cursor: pointer;
            color: blue;
        }
    }
    .Nothing_Data_User_Button_Container {
        text-align: end;
        button {
            padding: 5px 10px;
            font-weight: bolder;
            background-color: #fff;
            border-radius: 5px;
            border: 1px solid lightgray;
            margin: 10px 0px;
            &:hover {
                cursor: pointer;
                background-color: lightgray;
            }
        }
    }
`;

const UserLists = ({ UserLists, setNow_Select_User, Today_Date, NowDate }) => {
    const Login_Info = useSelector(state => state.Login_Info_Reducer_State.Login_Info);

    // 미입력자에게 메일 발송
    const Handle_Send_Mail_User = async () => {
        const Nothing_User_Lists = UserLists.filter(list => list.man_day_infos.length === 0);
        if (!window.confirm(`${Nothing_User_Lists.length}의 인원에게 메일을 발송 하시겠습니까?`)) {
            return;
        }
        if (Nothing_User_Lists.length === 0) {
            toast.show({
                title: `메일을 보낼 사용자가 없습니다.`,
                successCheck: false,
                duration: 4000,
            });
            return;
        } else {
            const Handle_Send_Mail_For_This_Week = await Request_Post_Axios('/API/PLM/Handle_Send_Mail_For_This_Week', {
                Nothing_User_Lists,
            });
            if (Handle_Send_Mail_For_This_Week.status) {
                toast.show({
                    title: `메일을 정상적으로 보냈습니다.`,
                    successCheck: true,
                    duration: 4000,
                });
            }
        }
    };

    return (
        <UserListsMainDivBox>
            {NowDate === Today_Date && (Login_Info.team === '개발운영팀' || Login_Info.id === 'sjyoo@dhk.co.kr') ? (
                <div className="Nothing_Data_User_Button_Container">
                    <button onClick={() => Handle_Send_Mail_User()}>미 입력 자 메일 발송</button>
                </div>
            ) : (
                <></>
            )}

            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>이름</th>
                        <th>직위</th>
                        <th>팀명</th>
                        <th>입력여부</th>
                    </tr>
                </thead>
                <tbody>
                    {UserLists.map(list => {
                        return (
                            <tr>
                                <td></td>
                                <td>{list.name}</td>
                                <td>{list.position}</td>
                                <td>{list.departmentName}</td>
                                {list.man_day_infos.length > 0 ? (
                                    <td className="Click_Buttons" onClick={() => setNow_Select_User(list)}>
                                        입력 완료
                                    </td>
                                ) : (
                                    <td style={{ color: 'red', fontWeight: 'bolder' }}>미입력</td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </UserListsMainDivBox>
    );
};
export default UserLists;
