import React, { useEffect, useState } from 'react';
import { Modal, Overlay } from '../../Department/Contents/Modal/DepartmentMoveModal';
import { UserContentMainPageButtonContainer } from '../UserContentMainPage';
import Select from 'react-select';
import { UserModalMainDivBox } from './UserModal';
import { Request_Get_Axios, Request_Post_Axios } from '../../../../API';
import { toast } from '../../../ToastMessage/ToastManager';

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

const AddUserModal = ({ Getting_All_User_Info, onClose }) => {
    const initial_state = {
        company: null,
        email: '',
        name: '',
        department: null,
        salarygrade: null,
        occupational: null,
        gradebounce: null,
        position: null,
        dailyExpense: 0,
    };
    const [Input_User_Info, setInput_User_Info] = useState(initial_state);
    const [Option_Lists, setOption_Lists] = useState([]);
    // 공통항목 가져오기
    useEffect(() => {
        Getting_Common_Info_Data();
    }, []);
    const Getting_Common_Info_Data = async () => {
        const Getting_Common_Info_Data_Axios = await Request_Get_Axios('/API/PLM/user/Getting_Common_Info_Data');
        if (Getting_Common_Info_Data_Axios.status) {
            setOption_Lists(Getting_Common_Info_Data_Axios.data);
        }
    };

    const Handle_Add_User_Info = async () => {
        if (
            !Input_User_Info.company ||
            !Input_User_Info.email ||
            !Input_User_Info.name ||
            !Input_User_Info.department ||
            !Input_User_Info.salarygrade ||
            !Input_User_Info.occupational ||
            !Input_User_Info.gradebounce ||
            !Input_User_Info.position ||
            !Input_User_Info.dailyExpense < 0
        ) {
            toast.show({
                title: `공란을 전부 작성 후 등록 가능합니다.`,
                successCheck: false,
                duration: 6000,
            });
            return;
        }

        const Handle_Add_User_Info_Axios = await Request_Post_Axios('/API/PLM/user/Handle_Add_User_Info', {
            Input_User_Info,
        });
        if (Handle_Add_User_Info_Axios.status) {
            if (Handle_Add_User_Info_Axios.data.dupleChecking) {
                /// Email 중복이 발생.
                toast.show({
                    title: `이미 등록된 사용자가 있습니다. Email을 다시 확인 해 주세요.`,
                    successCheck: false,
                    duration: 6000,
                });
                return;
            } else {
                /// 성공적으로 유저 생성 함.

                toast.show({
                    title: `${Input_User_Info.name}님을 추가하였습니다. 최초 비밀번호는 '1234'입니다.`,
                    successCheck: true,
                    duration: 6000,
                });
                await Getting_All_User_Info();
                onClose();
                setInput_User_Info(initial_state);
            }
        } else {
            /// 오류 발생
            toast.show({
                title: `오류가 발생하였습니다. IT팀에 문의바랍니다.`,
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
                            <button
                                onClick={() => {
                                    onClose();
                                    setInput_User_Info(initial_state);
                                }}
                            >
                                취소
                            </button>
                        </UserContentMainPageButtonContainer>
                    </div>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <th>회사명</th>
                                    <td>
                                        <Select
                                            value={Input_User_Info.company}
                                            onChange={e => {
                                                setInput_User_Info({ ...Input_User_Info, company: e });
                                            }}
                                            isClearable
                                            options={Option_Lists.filter(item => item.divideType === 'company').map(list => {
                                                return { value: list.itemCode, label: list.itemName };
                                            })}
                                            styles={styles}
                                        ></Select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>EMAIL</th>
                                    <td>
                                        {' '}
                                        <input
                                            value={Input_User_Info.email}
                                            placeholder="XXXXXX@exicon.co.kr"
                                            onChange={e => setInput_User_Info({ ...Input_User_Info, email: e.target.value })}
                                        ></input>
                                    </td>
                                </tr>
                                <tr>
                                    <th>이름</th>

                                    <td style={{ padding: '10px' }}>
                                        <input
                                            value={Input_User_Info.name}
                                            placeholder="홍길동"
                                            onChange={e => setInput_User_Info({ ...Input_User_Info, name: e.target.value })}
                                        ></input>
                                    </td>
                                </tr>

                                <tr>
                                    <th>직위</th>
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
                                </tr>
                                <tr>
                                    <th>부서</th>

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
                                </tr>
                                <tr>
                                    <th>연차</th>

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
                                </tr>
                                <tr>
                                    <th>호봉</th>
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
                                </tr>
                                <tr>
                                    <th>직군</th>

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
                                </tr>
                                <tr>
                                    <th>일급(만원)</th>
                                    <td style={{ padding: '10px' }}>
                                        <input
                                            type="number"
                                            step={10}
                                            value={Input_User_Info.dailyExpense}
                                            onChange={e => setInput_User_Info({ ...Input_User_Info, dailyExpense: e.target.value })}
                                        ></input>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <UserContentMainPageButtonContainer style={{ marginTop: '20px' }}>
                        <button
                            onClick={() => {
                                Handle_Add_User_Info();
                            }}
                        >
                            추가
                        </button>
                    </UserContentMainPageButtonContainer>
                </UserModalMainDivBox>
            </Modal>
        </Overlay>
    );
};
export default AddUserModal;
