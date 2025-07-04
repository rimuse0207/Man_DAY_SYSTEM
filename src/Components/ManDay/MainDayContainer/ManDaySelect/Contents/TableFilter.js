import React, { use, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import styled from 'styled-components';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { Insert_Man_Day_Select_Reducer_State_Func } from '../../../../../Models/ManDayReducers/ManDaySelectFilterReducer';

const TableFilterMainDivBox = styled.div`
    h2 {
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .Filter_Container {
        display: flex;
        flex-flow: wrap;
        justify-content: space-between;
        margin-bottom: 20px;
        .Filter_GR {
            border: 1px solid lightgray;
            width: 300px;
            .Filter_Title {
                text-align: center;
                font-weight: bolder;
                font-size: 1.1em;
                padding-bottom: 10px;
                padding-top: 10px;
                border-bottom: 1px solid lightgray;
            }
            .Filter_Content {
                margin-top: 10px;
                margin-bottom: 10px;
                input {
                    border: 1px solid lightgray;
                    height: 30px;
                    width: 100%;
                    padding-left: 10px;
                }
            }
        }
    }
`;

const TableFilter = () => {
    const dispatch = useDispatch();
    const Input_Title_Lists = useSelector(state => state.Man_Day_Select_Items_State.Equipment_Lists_data);
    const Divide_Lists = useSelector(state => state.Man_Day_Select_Items_State.divide_Lists_data);
    const Filter_State = useSelector(state => state.Man_Day_Select_Filter_Reducer_State.Filters_State);
    useEffect(() => {
        console.log(Sub_Depart());
    }, [Filter_State.depart]);
    const Sub_Depart = () => {
        if (Filter_State.depart) {
            console.log('durl');
            return Input_Title_Lists.map(list => {
                if (list.Major_Category_Code === Filter_State.depart.value) {
                    return list.Eqipment_lists.map(item => {
                        return {
                            vlaue: item.itemCode,
                            label: item.itemName,
                        };
                    });
                }
            });
        } else {
            const a = Input_Title_Lists.forEach(list => {
                return list.Eqipment_lists.forEach(item => {
                    return {
                        vlaue: item.itemCode,
                        label: item.itemName,
                    };
                });
            });
            console.log(a);
        }
    };

    return (
        <TableFilterMainDivBox>
            <h2>필터 조회</h2>
            <div className="Filter_Container">
                <div className="Filter_GR">
                    <div className="Filter_Title">기간</div>
                    <div className="Filter_Content" style={{ display: 'flex', alignItems: 'center' }}>
                        <div>
                            <DatePicker
                                locale={ko}
                                dateFormat="yyyy-MM-dd" // 날짜 형태
                                shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
                                maxDate={new Date()} // maxDate 이후 날짜 선택 불가
                                selected={Filter_State.period.start}
                                // onChange={date => setSelectedDate(date)}
                            />
                        </div>{' '}
                        <div style={{ marginLeft: '10px', marginRight: '10px' }}>~</div>
                        <div>
                            {' '}
                            <DatePicker
                                locale={ko}
                                dateFormat="yyyy-MM-dd" // 날짜 형태
                                shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
                                maxDate={new Date()} // maxDate 이후 날짜 선택 불가
                                selected={Filter_State.period.end}
                                // selected={selectedDate}
                                // onChange={date => setSelectedDate(date)}
                            />
                        </div>
                    </div>
                </div>
                <div className="Filter_GR">
                    <div className="Filter_Title">대분류</div>
                    <div className="Filter_Content">
                        <Select
                            value={Filter_State.depart}
                            onChange={e => dispatch(Insert_Man_Day_Select_Reducer_State_Func({ ...Filter_State, depart: e }))}
                            options={Input_Title_Lists.map(list => {
                                return { value: list.Major_Category_Code, label: list.Major_Category_Name };
                            })}
                        ></Select>
                    </div>
                </div>
                <div className="Filter_GR">
                    <div className="Filter_Title">설비명</div>
                    <div className="Filter_Content">
                        <Select></Select>
                    </div>
                </div>
                <div className="Filter_GR">
                    <div className="Filter_Title">구분</div>
                    <div className="Filter_Content">
                        <Select
                            value={Filter_State.divide}
                            onChange={e => dispatch(Insert_Man_Day_Select_Reducer_State_Func({ ...Filter_State, divide: e }))}
                            options={Divide_Lists.map(list => {
                                return { value: list.itemCode, label: list.itemName };
                            })}
                        ></Select>
                    </div>
                </div>
            </div>
            <div></div>
        </TableFilterMainDivBox>
    );
};

export default TableFilter;
