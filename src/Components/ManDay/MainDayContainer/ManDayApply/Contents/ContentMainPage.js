import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import InputPage from './InputPage';
import styled from 'styled-components';
import { Request_Get_Axios, Request_Post_Axios } from '../../../../../API';
import { toast } from '../../../../ToastMessage/ToastManager';
import { useSelector } from 'react-redux';

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
`;

const ContentMainPage = () => {
    const Login_Info = useSelector(state => state.Login_Info_Reducer_State.Login_Info);
    const [WeekContainer, setWeekContainer] = useState({
        represent_Date: moment().clone().startOf('isoWeek').format('YYYY-MM-DD'),
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
    const [Input_Title_Lists, setInput_Title_Lists] = useState([]);
    const [Divide_Lists, setDivide_Lists] = useState([]);
    useEffect(() => {
        Getting_data_for_item_Func();
    }, []);
    const Getting_data_for_item_Func = async () => {
        const Getting_Data_For_Item_Axios = await Request_Get_Axios('/API/PLM/Getting_data_for_item');

        if (Getting_Data_For_Item_Axios.status) {
            setInput_Title_Lists(Getting_Data_For_Item_Axios.data.Getting_Equipment_Lists);
            setDivide_Lists(Getting_Data_For_Item_Axios.data.Getting_divide_Lists_SQL);
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

        const Sending_Man_Day_Real_Data = await Request_Post_Axios('/API/PLM/Sending_Man_Day_Real_Data', {
            WeekContainer,
            Login_Info,
        });
        console.log(Sending_Man_Day_Real_Data);
    };

    return (
        <ContentMainPageMainDivBox>
            <h2 style={{ borderBottom: '1px solid lightgray', paddingBottom: '20px', paddingTop: '20px' }}>
                {moment(WeekContainer.represent_Date).format('M월')}{' '}
                {getWeekOfMonth(moment(WeekContainer.represent_Date).format('YYYY-MM-DD')) - 1}주차
            </h2>
            <div>
                <div className="Input_Cotainer">
                    {WeekContainer.Date_Lists.map(list => {
                        return (
                            <InputPage
                                List_Items={list}
                                key={list.date}
                                Input_Title_Lists={Input_Title_Lists}
                                WeekContainer={WeekContainer}
                                setWeekContainer={data => setWeekContainer(data)}
                                Divide_Lists={Divide_Lists}
                            ></InputPage>
                        );
                    })}
                </div>
                <div className="Save_Button_Container">
                    <button onClick={() => Save_Man_Day_Data()}>저장</button>
                </div>
            </div>
        </ContentMainPageMainDivBox>
    );
};

export default ContentMainPage;
