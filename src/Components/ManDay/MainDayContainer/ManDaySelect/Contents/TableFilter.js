import React, { use, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import styled from 'styled-components';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import {
    Initial_Man_Day_Select_Reducer_State_Func,
    Insert_Man_Day_Select_Reducer_State_Func,
} from '../../../../../Models/ManDayReducers/ManDaySelectFilterReducer';
import { ContentMainPageMainDivBox } from '../../ManDayApply/Contents/ContentMainPage';

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
            width: 300px;
            .Filter_Title {
                text-align: center;
                font-weight: bolder;
                border: 1px solid lightgray;
                font-size: 1.1em;
                padding-bottom: 10px;
                padding-top: 10px;
                border-bottom: 1px solid lightgray;
            }
            .Filter_Content {
                height: 35px;
                input {
                    border: 1px solid lightgray;
                    height: 35px;
                    width: 100%;
                    padding-left: 10px;
                    border-radius: 5px;
                }
            }
        }
    }
    .Filter_Button_Group {
        .Filter_Button_Container {
            display: flex;
            justify-content: end;
            button {
                margin-top: 20px;
                margin-bottom: 20px;
                padding: 15px;
                font-size: 1em;
                border: none;
                margin-left: 20px;
                width: 100px;
                border-radius: 5px;
                background-color: orange;
                color: #fff;
                &:hover {
                    cursor: pointer;
                    opacity: 0.7;
                }
            }
        }
    }
`;

const TableFilter = ({ Getting_Man_Day_Info_Data_Lists }) => {
    const dispatch = useDispatch();
    const Input_Title_Lists = useSelector(state => state.Man_Day_Select_Items_State.Equipment_Lists_data);
    const Divide_Lists = useSelector(state => state.Man_Day_Select_Items_State.divide_Lists_data);
    const Filter_State = useSelector(state => state.Man_Day_Select_Filter_Reducer_State.Filters_State);
    const [sub_Depart_options, setsub_Depart_options] = useState([]);
    useEffect(() => {
        Sub_Depart();
    }, [Input_Title_Lists, Filter_State.depart]);

    const Sub_Depart = async e => {
        if (e) {
            const [a] = await Input_Title_Lists.filter(item => item.Major_Category_Code === e.value).map(list => {
                return list.Eqipment_lists.map(options => {
                    return {
                        value: options.itemCode,
                        label: options.itemName,
                    };
                });
            });
            setsub_Depart_options(a);
        } else if (Filter_State.depart) {
            const [a] = await Input_Title_Lists.filter(item => item.Major_Category_Code === Filter_State.depart.value).map(list => {
                return list.Eqipment_lists.map(options => {
                    return {
                        value: options.itemCode,
                        label: options.itemName,
                    };
                });
            });
            setsub_Depart_options(a);
        } else {
            const a = await Input_Title_Lists.map(list => {
                return list.Eqipment_lists.map(item => {
                    return {
                        vlaue: item.itemCode,
                        label: item.itemName,
                    };
                });
            });
            const Grouping_One_Array = a.reduce((acc, group) => {
                return acc.concat(group);
            }, []);
            setsub_Depart_options(Grouping_One_Array);
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
                                onChange={e => {
                                    dispatch(
                                        Insert_Man_Day_Select_Reducer_State_Func({
                                            ...Filter_State,
                                            period: { ...Filter_State.period, start: e },
                                        })
                                    );
                                }}
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
                                onChange={e =>
                                    dispatch(
                                        Insert_Man_Day_Select_Reducer_State_Func({
                                            ...Filter_State,
                                            period: { ...Filter_State.period, end: e },
                                        })
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="Filter_GR">
                    <div className="Filter_Title">대분류</div>
                    <div className="Filter_Content">
                        <Select
                            value={Filter_State.depart}
                            onChange={e => {
                                Sub_Depart(e);
                                dispatch(Insert_Man_Day_Select_Reducer_State_Func({ ...Filter_State, depart: e }));
                            }}
                            isClearable
                            options={Input_Title_Lists.map(list => {
                                return { value: list.Major_Category_Code, label: list.Major_Category_Name };
                            })}
                        ></Select>
                    </div>
                </div>
                <div className="Filter_GR">
                    <div className="Filter_Title">설비명</div>
                    <div className="Filter_Content">
                        <Select
                            value={Filter_State.sub_depart}
                            options={sub_Depart_options}
                            isClearable
                            onChange={e => dispatch(Insert_Man_Day_Select_Reducer_State_Func({ ...Filter_State, sub_depart: e }))}
                        ></Select>
                    </div>
                </div>
                <div className="Filter_GR">
                    <div className="Filter_Title">구분</div>
                    <div className="Filter_Content">
                        <Select
                            value={Filter_State.divide}
                            isClearable
                            onChange={e => dispatch(Insert_Man_Day_Select_Reducer_State_Func({ ...Filter_State, divide: e }))}
                            options={Divide_Lists.map(list => {
                                return { value: list.itemCode, label: list.itemName };
                            })}
                        ></Select>
                    </div>
                </div>
            </div>
            <div className="Filter_Button_Group">
                <div className="Filter_Button_Container">
                    <div className="Update_Button_Container">
                        <button
                            onClick={() => {
                                dispatch(Initial_Man_Day_Select_Reducer_State_Func());
                                Getting_Man_Day_Info_Data_Lists('initial');
                            }}
                        >
                            초기화
                        </button>
                    </div>
                    <div className="Save_Button_Container">
                        <button
                            style={{ background: 'green' }}
                            onClick={() => {
                                Getting_Man_Day_Info_Data_Lists();
                            }}
                        >
                            조회
                        </button>
                    </div>
                </div>
            </div>
        </TableFilterMainDivBox>
    );
};

export default TableFilter;
