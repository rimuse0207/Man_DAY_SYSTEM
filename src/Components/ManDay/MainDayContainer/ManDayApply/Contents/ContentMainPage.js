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

moment.locale('ko');

const ContentMainPageMainDivBox = styled.div`
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
`;

const ContentMainPage = () => {
    const Today_Date = moment().clone().startOf('isoWeek').format('YYYY-MM-DD');
    const Login_Info = useSelector(state => state.Login_Info_Reducer_State.Login_Info);
    const [Select_Date, setSelect_Date] = useState(moment().clone().startOf('isoWeek').format('YYYY-MM-DD'));
    const [WeekContainer, setWeekContainer] = useState({
        represent_Date: moment().clone().startOf('isoWeek').format('YYYY-MM-DD'),
        Mode: 'writing',
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

    const Getting_Man_Day_Info_Befroe_Data = async () => {
        const Getting_Man_Day_Info_Before_Data_Axios = await Request_Get_Axios(`/API/PLM/Getting_Man_Day_Info_Before_Data`, {
            Select_Date,
        });
        if (Getting_Man_Day_Info_Before_Data_Axios.status) {
            setWeekContainer(Getting_Man_Day_Info_Before_Data_Axios.data);
        }
    };

    // 월단위로 몇주차 인지 계산
    const getWeekOfMonth = dateStr => {
        const date = moment(dateStr);
        const startOfMonth = date.clone().startOf('month');

        const firstWeekDay = startOfMonth.isoWeekday(); // 1:월 ~ 7:일
        const offset = firstWeekDay - 1; // 첫 주 시작 요일에 따라 보정

        const dayOfMonth = date.date();

        return Math.ceil((dayOfMonth + offset) / 7);
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
        /// 일별로 Man_Day가 1이 되는지 체크
        const Sum_Check = WeekContainer.Date_Lists.filter(item => item.child.length > 0)
            .map(list => {
                return list.child.reduce((pre, acc) => pre + Number(acc.man_day), 0);
            })
            .filter(item => item !== 1);
        if (Sum_Check.length > 0) {
            toast.show({
                title: `Man-day는 일별 합산이 1이 되어야 합니다.`,
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
                title: `${moment(WeekContainer.represent_Date).format('M월')}${
                    getWeekOfMonth(moment(WeekContainer.represent_Date).format('YYYY-MM-DD')) - 1
                }주차 Man_Day ${WeekContainer.Mode === 'updating' ? `수정` : `입력`} 완료되었습니다.`,
                successCheck: true,
                duration: 6000,
            });
            await Getting_Man_Day_Info_Befroe_Data();
        }
        setLoadin_Check(false);
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
                <h2>
                    {moment(WeekContainer.represent_Date).format('M월')}{' '}
                    {getWeekOfMonth(moment(WeekContainer.represent_Date).format('YYYY-MM-DD')) - 1}주차
                </h2>
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
                            ></InputPage>
                        );
                    })}
                </div>
                {WeekContainer.Mode === 'reading' ? (
                    Today_Date === Select_Date ? (
                        <div className="Update_Button_Container">
                            <button onClick={() => Change_the_Mode()}>수정</button>
                        </div>
                    ) : (
                        <></>
                    )
                ) : WeekContainer.Mode === 'updating' ? (
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <div className="Cancel_Button_Container">
                            <button onClick={() => Cancel_Man_Day_Data()}>취소</button>
                        </div>
                        <div className="Save_Button_Container">
                            <button onClick={() => Save_Man_Day_Data()}>수정 완료</button>
                        </div>
                    </div>
                ) : (
                    <div className="Save_Button_Container">
                        <button onClick={() => Save_Man_Day_Data()}>저장</button>
                    </div>
                )}
            </div>
            <Loader loading={Loading_Check}></Loader>
        </ContentMainPageMainDivBox>
    );
};

export default ContentMainPage;
