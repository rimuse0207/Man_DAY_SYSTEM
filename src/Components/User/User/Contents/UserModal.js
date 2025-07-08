import React, { useEffect, useState } from 'react';
import { ButtonContainer, CancelButton, Message, Modal, Overlay } from '../../Department/Contents/Modal/DepartmentMoveModal';
import styled from 'styled-components';
import { UserContentMainPageButtonContainer } from '../UserContentMainPage';
import { Request_Get_Axios, Request_Post_Axios } from '../../../../API';
import Select from 'react-select';
import { toast } from '../../../ToastMessage/ToastManager';

const UserModalMainDivBox = styled.div`
    .Float_Top_Container {
        display: flex;
        justify-content: space-between;
        position: sticky;
        top: 0px;
        text-align: start;
        font-size: 1em;
        border-bottom: 1px solid lightgray;
        padding-bottom: 20px;
        z-index: 1000;
        padding-top: 20px;
        background-color: #fff;
    }
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
        padding: 15px;
        border-left: none;
        border-right: none;
    }
    td {
        padding-left: 10px;
        text-align: start;
    }

    th {
        color: black;
        text-align: center;
        background-color: #efefef;
        width: 200px;
    }
    input {
        border: 1px solid lightgray;
        border-radius: 5px;
        min-height: 38px;
        padding-left: 10px;
        width: 99%;
    }
`;
const styles = {
    control: provided => ({
        ...provided,
        height: '40px',
    }),
    valueContainer: provided => ({
        ...provided,
        height: '40px',
    }),
    indicatorsContainer: provided => ({
        ...provided,
        height: '40px',
    }),
};

const UserModal = ({ isOpen, onClose, Select_User, Update_Mode, setUpdate_Mode, Getting_All_User_Info, setSelect_User }) => {
    console.log(Select_User);
    const [Input_User_Info, setInput_User_Info] = useState({
        ...Select_User,
        department: { value: Select_User.departmentCode, label: Select_User.user_department },
        salarygrade: { value: Select_User.salarygradeCode, label: Select_User.user_salarygrade },
        occupational: { value: Select_User.occupationalCode, label: Select_User.user_occupational },
        gradebounce: { value: Select_User.gradebounceCode, label: Select_User.user_gradebounce },
        position: { value: Select_User.positionCode, label: Select_User.user_position },
    });
    const [Option_Lists, setOption_Lists] = useState([]);

    // 수정을 위한 데이터 변경
    useEffect(() => {
        setInput_User_Info({
            ...Select_User,
            department: { value: Select_User.departmentCode, label: Select_User.user_department },
            salarygrade: { value: Select_User.salarygradeCode, label: Select_User.user_salarygrade },
            occupational: { value: Select_User.occupationalCode, label: Select_User.user_occupational },
            gradebounce: { value: Select_User.gradebounceCode, label: Select_User.user_gradebounce },
            position: { value: Select_User.positionCode, label: Select_User.user_position },
        });
    }, [Update_Mode]);

    // 공통항목 가져오기
    useEffect(() => {
        Getting_Common_Info_Data();
    }, [Select_User]);
    const Getting_Common_Info_Data = async () => {
        const Getting_Common_Info_Data_Axios = await Request_Get_Axios('/API/PLM/user/Getting_Common_Info_Data');
        if (Getting_Common_Info_Data_Axios.status) {
            setOption_Lists(Getting_Common_Info_Data_Axios.data);
        }
    };

    // 비밀번호 초기화 및 퇴직자 처리
    const Handle_Reset_Password = async Select_Type => {
        if (Select_Type === 'retire') {
            if (!window.confirm('정말로 퇴직처리 하시겠습니까?')) {
                return;
            }
        }

        const Handle_Reset_Password_Axios = await Request_Post_Axios('/API/PLM/user/Handle_Reset_Password', {
            Select_User,
            Select_Menu: Select_Type,
        });
        if (Handle_Reset_Password_Axios.status) {
            if (Select_Type === 'password_reset') {
                toast.show({
                    title: `${Select_User.name}님의 비밀번호를 '1234'로 변경처리 하였습니다.`,
                    successCheck: true,
                    duration: 10000,
                });
                setUpdate_Mode(false);
            } else {
                toast.show({
                    title: `${Select_User.name}님을 퇴직처리 하였습니다.`,
                    successCheck: true,
                    duration: 10000,
                });
                await Getting_All_User_Info();
                setUpdate_Mode(false);
                onClose();
            }
        }
    };

    const Handle_Update_User_Info_Data = async () => {
        if (
            !Input_User_Info.department ||
            !Input_User_Info.salarygrade ||
            !Input_User_Info.occupational ||
            !Input_User_Info.gradebounce ||
            !Input_User_Info.gradebounce
        ) {
            toast.show({
                title: `빈 항목을 전부 채워 주세요.`,
                successCheck: false,
                duration: 6000,
            });
            return;
        }
        const Handle_Update_User_Info_Data_Axios = await Request_Post_Axios('/API/PLM/user/Handle_Update_User_Info_Data', {
            Input_User_Info,
        });

        if (Handle_Update_User_Info_Data_Axios.status) {
            toast.show({
                title: `사용자를 정상적으로 변경 처리하였습니다.`,
                successCheck: true,
                duration: 6000,
            });
            setSelect_User(Handle_Update_User_Info_Data_Axios.data);
            await Getting_All_User_Info();
            setUpdate_Mode(false);
        } else {
            toast.show({
                title: `오류가 발생되었습니다. IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    return (
        <Overlay>
            <Modal>
                <UserModalMainDivBox>
                    <div className="Float_Top_Container">
                        <div>
                            <h4>사용자 상세</h4>
                            <div style={{ fontSize: '0.8em' }}>사용자 상세를 조회하고 수정/관리 할 수 있습니다.</div>
                        </div>
                        <UserContentMainPageButtonContainer>
                            {Update_Mode ? (
                                <>
                                    <button
                                        onClick={() => {
                                            setUpdate_Mode(false);
                                        }}
                                    >
                                        취소
                                    </button>
                                    <button onClick={() => Handle_Reset_Password('password_reset')}>비밀번호 초기화</button>
                                    <button onClick={() => Handle_Reset_Password('retire')}>퇴직</button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => {
                                            onClose();
                                        }}
                                    >
                                        취소
                                    </button>
                                    <button onClick={() => setUpdate_Mode(true)}>수정</button>
                                </>
                            )}
                        </UserContentMainPageButtonContainer>
                    </div>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <td>{Select_User.email}</td>
                                </tr>
                                <tr>
                                    <th>이름</th>
                                    {Update_Mode ? (
                                        <td style={{ padding: '10px' }}>
                                            <input
                                                value={Input_User_Info.name}
                                                onChange={e => setInput_User_Info({ ...Input_User_Info, name: e.target.value })}
                                            ></input>
                                        </td>
                                    ) : (
                                        <td>{Select_User.name}</td>
                                    )}
                                </tr>
                                <tr>
                                    <th>직위</th>
                                    {Update_Mode ? (
                                        <td>
                                            <Select
                                                value={Input_User_Info.position}
                                                onChange={e => {
                                                    setInput_User_Info({ ...Input_User_Info, position: e });
                                                }}
                                                isClearable
                                                options={Option_Lists.filter(item => item.divideType === 'position').map(list => {
                                                    return { value: list.itemCode, label: list.itemName };
                                                })}
                                                styles={styles}
                                            ></Select>
                                        </td>
                                    ) : (
                                        <td>{Select_User.user_position}</td>
                                    )}
                                </tr>
                                <tr>
                                    <th>부서</th>
                                    {Update_Mode ? (
                                        <td>
                                            <Select
                                                value={Input_User_Info.department}
                                                onChange={e => {
                                                    setInput_User_Info({ ...Input_User_Info, department: e });
                                                }}
                                                isClearable
                                                options={Option_Lists.filter(item => item.divideType === 'department').map(list => {
                                                    return { value: list.itemCode, label: list.itemName };
                                                })}
                                                styles={styles}
                                            ></Select>
                                        </td>
                                    ) : (
                                        <td>{Select_User.user_department}</td>
                                    )}
                                </tr>
                                <tr>
                                    <th>연차</th>
                                    {Update_Mode ? (
                                        <td>
                                            <Select
                                                value={Input_User_Info.gradebounce}
                                                onChange={e => {
                                                    setInput_User_Info({ ...Input_User_Info, gradebounce: e });
                                                }}
                                                isClearable
                                                options={Option_Lists.filter(item => item.divideType === 'gradebounce').map(list => {
                                                    return { value: list.itemCode, label: list.itemName };
                                                })}
                                                styles={styles}
                                            ></Select>
                                        </td>
                                    ) : (
                                        <td>{Select_User.user_gradebounce}</td>
                                    )}
                                </tr>
                                <tr>
                                    <th>호봉</th>
                                    {Update_Mode ? (
                                        <td>
                                            <Select
                                                value={Input_User_Info.salarygrade}
                                                onChange={e => {
                                                    setInput_User_Info({ ...Input_User_Info, salarygrade: e });
                                                }}
                                                isClearable
                                                options={Option_Lists.filter(item => item.divideType === 'salarygrade').map(list => {
                                                    return { value: list.itemCode, label: list.itemName };
                                                })}
                                                styles={styles}
                                            ></Select>
                                        </td>
                                    ) : (
                                        <td>{Select_User.user_salarygrade}</td>
                                    )}
                                </tr>
                                <tr>
                                    <th>직군</th>
                                    {Update_Mode ? (
                                        <td>
                                            <Select
                                                value={Input_User_Info.occupational}
                                                onChange={e => {
                                                    setInput_User_Info({ ...Input_User_Info, occupational: e });
                                                }}
                                                isClearable
                                                options={Option_Lists.filter(item => item.divideType === 'occupational').map(list => {
                                                    return { value: list.itemCode, label: list.itemName };
                                                })}
                                                styles={styles}
                                            ></Select>
                                        </td>
                                    ) : (
                                        <td>{Select_User.user_occupational}</td>
                                    )}
                                </tr>
                                <tr>
                                    <th>일급(만원)</th>
                                    {Update_Mode ? (
                                        <td style={{ padding: '10px' }}>
                                            <input
                                                type="number"
                                                step={10}
                                                value={Input_User_Info.dailyExpense}
                                                onChange={e => setInput_User_Info({ ...Input_User_Info, dailyExpense: e.target.value })}
                                            ></input>
                                        </td>
                                    ) : (
                                        <td>{Select_User.dailyExpense}</td>
                                    )}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {Update_Mode ? (
                        <UserContentMainPageButtonContainer style={{ marginTop: '20px' }}>
                            <button onClick={() => Handle_Update_User_Info_Data()}>수정</button>
                        </UserContentMainPageButtonContainer>
                    ) : (
                        <div></div>
                    )}
                </UserModalMainDivBox>
            </Modal>
        </Overlay>
    );
};

export default UserModal;
