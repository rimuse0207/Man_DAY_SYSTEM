import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import InputPage from './InputPage';
import styled from 'styled-components';
import { Request_Get_Axios, Request_Post_Axios } from '../../../../../API';
import { toast } from '../../../../ToastMessage/ToastManager';
import { useSelector } from 'react-redux';
import Loader from '../../../../Loader/Loader';
import ReadingBoxs from './ReadingBoxs';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { MdArrowForwardIos } from 'react-icons/md';
import { getWeekOfMonth } from '../../CommonFunc/CommonFunc';
moment.locale('ko');

export const ContentMainPageMainDivBox = styled.div`
    position: relative;
    .Input_Cotainer {
        display: flex;
        padding-right: 30px;
        justify-content: space-between;
    }
    .Save_Button_Container {
        margin-bottom: 50px;
        text-align: end;
        margin-right: 50px;
        button {
            width: 150px;
            margin: 0 auto;
            border-radius: 5px;
            height: 50px;
            line-height: 50px;
            font-size: 1.1em;
            text-align: center;
            background: #2985db;
            font-weight: bolder;
            border: 1px solid lightgray;
            color: #fff;
            &:hover {
                cursor: pointer;
                background: #056ac9;
            }
        }
    }
    .Update_Button_Container {
        margin-bottom: 50px;
        text-align: end;
        margin-right: 50px;
        button {
            width: 150px;
            margin: 0 auto;
            border-radius: 5px;
            height: 50px;
            line-height: 50px;
            font-size: 1.1em;
            text-align: center;
            background: green;
            font-weight: bolder;
            border: 1px solid lightgray;
            color: #fff;
            &:hover {
                cursor: pointer;
                background: #04cd00;
            }
        }
    }
    .Cancel_Button_Container {
        margin-bottom: 50px;
        text-align: end;
        margin-right: 50px;
        button {
            width: 150px;
            margin: 0 auto;
            border-radius: 5px;
            height: 50px;
            line-height: 50px;
            font-size: 1.1em;
            text-align: center;
            background: red;
            font-weight: bolder;
            border: 1px solid lightgray;
            color: #fff;
            &:hover {
                cursor: pointer;
                background: #ff4100;
            }
        }
    }
    .Change_Date_Container {
        font-size: 1.8em;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
            height: 100%;
        }
        &:hover {
            cursor: pointer;
            opacity: 0.7;
        }
    }

    .Button_Group {
        position: absolute;
        top: 30px;
        right: 50px;
        ul {
            display: flex;
            li {
                margin-left: 30px;
                button {
                    padding: 10px;
                    border: none;
                    border-radius: 5px;
                    color: #fff;
                    font-weight: bolder;
                    &:hover {
                        cursor: pointer;
                    }
                }
            }
        }
    }
`;

const ContentMainPage = () => {
    const Today_Date = moment().clone().startOf('isoWeek').format('YYYY-MM-DD');
    const Login_Info = useSelector(state => state.Login_Info_Reducer_State.Login_Info);
    const [Select_Date, setSelect_Date] = useState(moment().clone().startOf('isoWeek').format('YYYY-MM-DD'));
    const [WeekContainer, setWeekContainer] = useState({
        represent_Date: moment().clone().startOf('isoWeek').format('YYYY-MM-DD'),
        Mode: 'writing',
        Before_key: null,
        Date_Lists: [
            {
                date: moment().clone().startOf('isoWeek').format('YYYY-MM-DD'),
                child: [
                    {
                        index: 1,
                        depart: null,
                        sub_depart: null,
                        divide: null,
                        man_day: 0,
                        date: moment().clone().startOf('isoWeek').format('YYYY-MM-DD'),
                    },
                ],
            },
            {
                date: moment().clone().isoWeekday(2).format('YYYY-MM-DD'),
                child: [
                    {
                        index: 1,
                        depart: null,
                        sub_depart: null,
                        divide: null,
                        man_day: 0,
                        date: moment().clone().isoWeekday(2).format('YYYY-MM-DD'),
                    },
                ],
            },
            {
                date: moment().clone().isoWeekday(3).format('YYYY-MM-DD'),
                child: [
                    {
                        index: 1,
                        depart: null,
                        sub_depart: null,
                        divide: null,
                        man_day: 0,
                        date: moment().clone().isoWeekday(3).format('YYYY-MM-DD'),
                    },
                ],
            },
            {
                date: moment().clone().isoWeekday(4).format('YYYY-MM-DD'),
                child: [
                    {
                        index: 1,
                        depart: null,
                        sub_depart: null,
                        divide: null,
                        man_day: 0,
                        date: moment().clone().isoWeekday(4).format('YYYY-MM-DD'),
                    },
                ],
            },
            {
                date: moment().clone().isoWeekday(5).format('YYYY-MM-DD'),
                child: [
                    {
                        index: 1,
                        depart: null,
                        sub_depart: null,
                        divide: null,
                        man_day: 0,
                        date: moment().clone().isoWeekday(5).format('YYYY-MM-DD'),
                    },
                ],
            },
        ],
    });
    const [Loading_Check, setLoadin_Check] = useState(false);

    useEffect(() => {
        Getting_Man_Day_Info_Befroe_Data();
    }, [Select_Date]);

    // 이전 데이터 불러오기
    const Getting_Man_Day_Info_Befroe_Data = async () => {
        const Getting_Man_Day_Info_Before_Data_Axios = await Request_Get_Axios(`/API/PLM/Getting_Man_Day_Info_Before_Data`, {
            Select_Date,
        });
        if (Getting_Man_Day_Info_Before_Data_Axios.status) {
            if (Getting_Man_Day_Info_Before_Data_Axios.data.Date_Lists.length > 0) {
                setWeekContainer(Getting_Man_Day_Info_Before_Data_Axios.data);
            }
        }
    };

    // 수정모드로 변경
    const Change_the_Mode = () => {
        toast.show({
            title: `수정모드로 변경처리 되었습니다.`,
            successCheck: true,
            duration: 2000,
        });
        setWeekContainer({ ...WeekContainer, Mode: 'updating' });
    };

    // 수정모드 취소
    const Cancel_Man_Day_Data = async () => {
        await Getting_Man_Day_Info_Befroe_Data();
        toast.show({
            title: `수정모드가 취소 되었습니다.`,
            successCheck: true,
            duration: 2000,
        });
    };

    // man_day 저장
    const Save_Man_Day_Data = async () => {
        /// 일별로 항목이 공란이 있는지 확인
        const ChcekNull = WeekContainer.Date_Lists.map(list => {
            return list.child.filter(item => !item.depart || !item.sub_depart || !item.divide);
        }).filter(item => item.length > 0);
        if (ChcekNull.length > 0) {
            toast.show({
                title: `대분류/설비명/구분을 전부 입력 해야 저장이 가능합니다.`,
                successCheck: false,
                duration: 6000,
            });
            return;
        }
        const factor = 100000;
        const tolerance = 1;
        /// 일별로 Man_Day가 1이 되는지 체크
        const Sum_Check = WeekContainer.Date_Lists.filter(item => item.child.length > 0)
            .map(list => {
                const total = list.child
                    .map(child => Math.round(Number(child.man_day) * factor)) // 먼저 정수화
                    .reduce((a, b) => a + b, 0); // 정수끼리 합산
                return total;
            })
            .filter(total => Math.abs(total - factor) > tolerance);
        if (Sum_Check.length > 0) {
            toast.show({
                title: `Man-day는 일별 합산이 1이 되어야 합니다.`,
                successCheck: false,
                duration: 6000,
            });
            return;
        }

        /// 일별로 Man_Day가 0이 있는지 체크
        const Man_Day_Check = WeekContainer.Date_Lists.some(list => {
            return list.child.some(pre => pre.man_day === 0);
        });
        if (Man_Day_Check) {
            toast.show({
                title: `Man-day는 0이상만 저장 됩니다.`,
                successCheck: false,
                duration: 6000,
            });
            return;
        }

        setLoadin_Check(true);
        const Sending_Man_Day_Real_Data = await Request_Post_Axios('/API/PLM/Sending_Man_Day_Real_Data', {
            WeekContainer,
            Login_Info,
        });
        if (Sending_Man_Day_Real_Data.status) {
            toast.show({
                title: `${getWeekOfMonth(WeekContainer.represent_Date)} Man_Day ${
                    WeekContainer.Mode === 'updating' ? `수정` : `입력`
                } 완료되었습니다.`,
                successCheck: true,
                duration: 6000,
            });
            await Getting_Man_Day_Info_Befroe_Data();
        }
        setLoadin_Check(false);
    };

    // 한달 이내의 이전 데이터 가져오기
    const Handle_Getting_Before_Data = async () => {
        const Handle_Getting_Before_Man_Day_Data = await Request_Get_Axios(`/API/PLM/Handle_Getting_Before_Man_Day_Data`, { Select_Date });
        if (Handle_Getting_Before_Man_Day_Data.status) {
            if (Handle_Getting_Before_Man_Day_Data.data.Have_Previous_data) {
                setWeekContainer(Handle_Getting_Before_Man_Day_Data.data.data);
                toast.show({
                    title: `이전 주의 데이터를 불러왔습니다.`,
                    successCheck: true,
                    duration: 3000,
                });
            } else {
                toast.show({
                    title: `이전 주의 저장한 데이터가 없습니다.`,
                    successCheck: false,
                    duration: 5000,
                });
            }
        } else {
            toast.show({
                title: `오류 발생. IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: 5000,
            });
        }
    };

    // 임시 저장
    const Save_Temporarily_Man_Data_Info_Data = async () => {
        const Save_Temporarily_Man_Dat_Info_Data_Axios = await Request_Post_Axios('/API/PLM/Save_Temporarily_Man_Dat_Info_Data', {
            WeekContainer,
        });
        if (Save_Temporarily_Man_Dat_Info_Data_Axios.status) {
            toast.show({
                title: `${moment(Select_Date).format('MM월 DD일')}의 데이터를 임시 저장 완료하였습니다.`,
                successCheck: true,
                duration: 5000,
            });
        } else {
            toast.show({
                title: `${moment(Select_Date).format('MM월 DD일')}의 데이터를 임시 저장에 실패하였습니다.`,
                successCheck: false,
                duration: 5000,
            });
        }
    };

    // 임시 저장 된 데이터 불러오기
    const Handle_Getting_Save_Temporarily_Man_Dat_Data = async () => {
        const Handle_Getting_Save_Temporarily_Man_Dat_Data = await Request_Get_Axios(
            `/API/PLM/Handle_Getting_Save_Temporarily_Man_Dat_Data`,
            {
                Select_Date,
            }
        );
        if (Handle_Getting_Save_Temporarily_Man_Dat_Data.status) {
            if (Handle_Getting_Save_Temporarily_Man_Dat_Data.data.Have_Temporarily_Data) {
                setWeekContainer({
                    ...WeekContainer,
                    Date_Lists: Handle_Getting_Save_Temporarily_Man_Dat_Data.data.data.Date_Lists,
                });
                toast.show({
                    title: `임시 저장된 데이터를 불러왔습니다.`,
                    successCheck: true,
                    duration: 3000,
                });
            } else {
                toast.show({
                    title: `임시 저장된 데이터가 없습니다.`,
                    successCheck: false,
                    duration: 3000,
                });
            }
        } else {
            toast.show({
                title: `오류 발생. IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: 5000,
            });
        }
    };

    return (
        <ContentMainPageMainDivBox>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    borderBottom: '1px solid lightgray',
                    paddingBottom: '20px',
                    paddingTop: '20px',
                    position: 'sticky',
                    top: '0px',
                    background: '#fff',
                }}
            >
                <div
                    className="Change_Date_Container"
                    style={{ marginRight: '20px', lineHeight: '' }}
                    onClick={() => {
                        setSelect_Date(moment(Select_Date).subtract(7, 'days').format('YYYY-MM-DD'));
                    }}
                >
                    <MdOutlineArrowBackIosNew />
                </div>
                <h2>{getWeekOfMonth(WeekContainer.represent_Date)}</h2>
                {Today_Date === Select_Date ? (
                    ''
                ) : (
                    <div
                        className="Change_Date_Container"
                        style={{ marginLeft: '20px', lineHeight: '' }}
                        onClick={() => {
                            setSelect_Date(moment(Select_Date).add(7, 'days').format('YYYY-MM-DD'));
                        }}
                    >
                        <MdArrowForwardIos />
                    </div>
                )}
            </div>
            {(WeekContainer?.Mode === 'writing' || WeekContainer?.Mode === 'updating') && Today_Date === Select_Date ? (
                <div className="Button_Group">
                    <ul>
                        <li>
                            <button style={{ backgroundColor: 'green' }} onClick={() => Handle_Getting_Save_Temporarily_Man_Dat_Data()}>
                                임시저장 불러오기
                            </button>
                        </li>
                        <li>
                            <button style={{ backgroundColor: 'orange' }} onClick={() => Handle_Getting_Before_Data()}>
                                이전 주 데이터 불러오기
                            </button>
                        </li>
                    </ul>
                </div>
            ) : (
                <></>
            )}

            <div>
                <div className="Input_Cotainer">
                    {WeekContainer.Date_Lists.map(list => {
                        return WeekContainer.Mode === 'reading' ? (
                            <ReadingBoxs
                                List_Items={list}
                                key={list.date}
                                WeekContainer={WeekContainer}
                                setWeekContainer={data => setWeekContainer(data)}
                            ></ReadingBoxs>
                        ) : (
                            <InputPage
                                List_Items={list}
                                key={list.date}
                                WeekContainer={WeekContainer}
                                setWeekContainer={data => setWeekContainer(data)}
                                Select_Date={Select_Date}
                                Today_Date={Today_Date}
                            ></InputPage>
                        );
                    })}
                </div>
                {WeekContainer.Mode === 'reading' && Today_Date === Select_Date ? (
                    Today_Date === Select_Date ? (
                        <div className="Update_Button_Container">
                            <button onClick={() => Change_the_Mode()}>수정</button>
                        </div>
                    ) : (
                        <></>
                    )
                ) : WeekContainer.Mode === 'updating' && Today_Date === Select_Date ? (
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <div className="Cancel_Button_Container">
                            <button onClick={() => Cancel_Man_Day_Data()}>취소</button>
                        </div>
                        <div className="Update_Button_Container">
                            <button onClick={() => Save_Temporarily_Man_Data_Info_Data()}>임시 저장</button>
                        </div>
                        <div className="Save_Button_Container">
                            <button onClick={() => Save_Man_Day_Data()}>수정 완료</button>
                        </div>
                    </div>
                ) : Today_Date === Select_Date ? (
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <div className="Update_Button_Container">
                            <button onClick={() => Save_Temporarily_Man_Data_Info_Data()}>임시 저장</button>
                        </div>
                        <div className="Save_Button_Container">
                            <button onClick={() => Save_Man_Day_Data()}>저장</button>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <Loader loading={Loading_Check}></Loader>
        </ContentMainPageMainDivBox>
    );
};

export default ContentMainPage;
