import React, { useEffect, useState } from 'react';
import { TableFilterMainDivBox } from '../../../../ManDaySelect/Contents/TableFilter';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import {
    Initial_Man_Day_Select_Reducer_State_Func,
    initState,
    Insert_Man_Day_Select_Reducer_State_Func,
} from '../../../../../../../Models/ManDayReducers/ManDaySelectFilterReducer';
import { ko } from 'date-fns/esm/locale';
import styled from 'styled-components';

export const SelectAllFilterMainDivBox = styled.div`
    .Filter_Container {
        margin-bottom: 20px;
        justify-content: start;
        .Filter_GR {
            margin-bottom: 30px;
            margin-right: 10px;
            margin-left: 10px;
            width: 18%;
            min-width: 200px !important;
        }
    }
`;
export const customStyles = {
    control: provided => ({
        ...provided,
        minHeight: '40px',
        height: '40px',
        fontSize: '12px',
        padding: '0 4px',
        display: 'flex',
        alignItems: 'center', // 수직 정렬
        lineHeight: '1.2', // 줄 높이 조정
    }),
    valueContainer: provided => ({
        ...provided,
        height: '40px',
        padding: '0 4px',
        display: 'flex',
        alignItems: 'center', // 수직 정렬
    }),
    indicatorsContainer: provided => ({
        ...provided,
        height: '40px',
        display: 'flex',
        alignItems: 'center', // 아이콘도 정렬
    }),
    singleValue: provided => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
        lineHeight: '1.2', // 선택된 값 줄 높이
    }),
    option: provided => ({
        ...provided,
        fontSize: '12px',
        padding: '6px 8px',
        lineHeight: '1.5',
    }),
};
const SelectAllFilter = ({ UserLists, PersonFilterOptions, DepartmentFilterOptions, Getting_Man_Day_Info_Data, Excel_Download }) => {
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
        <SelectAllFilterMainDivBox>
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
                                    // maxDate={new Date()} // maxDate 이후 날짜 선택 불가
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
                        <div className="Filter_Title">회사명</div>
                        <div className="Filter_Content">
                            <Select
                                styles={customStyles}
                                value={Filter_State.company}
                                isClearable
                                options={[
                                    {
                                        value: 'all',
                                        label: '전체',
                                    },
                                    {
                                        value: 'cp01',
                                        label: '와이씨(YC)',
                                    },
                                    {
                                        value: 'cp02',
                                        label: '엑시콘(EXICON)',
                                    },
                                ]}
                                onChange={e => dispatch(Insert_Man_Day_Select_Reducer_State_Func({ ...Filter_State, company: e }))}
                                placeholder="선택 해 주세요."
                            ></Select>
                        </div>
                    </div>
                    <div className="Filter_GR">
                        <div className="Filter_Title">팀명</div>
                        <div className="Filter_Content">
                            <Select
                                styles={customStyles}
                                value={Filter_State.team}
                                isClearable
                                options={DepartmentFilterOptions}
                                onChange={e => dispatch(Insert_Man_Day_Select_Reducer_State_Func({ ...Filter_State, team: e }))}
                            ></Select>
                        </div>
                    </div>
                    <div className="Filter_GR">
                        <div className="Filter_Title">이름</div>
                        <div className="Filter_Content">
                            <Select
                                styles={customStyles}
                                value={Filter_State.name}
                                isClearable
                                options={PersonFilterOptions}
                                onChange={e => dispatch(Insert_Man_Day_Select_Reducer_State_Func({ ...Filter_State, name: e }))}
                                placeholder="선택 해 주세요."
                            ></Select>
                        </div>
                    </div>

                    <div className="Filter_GR">
                        <div className="Filter_Title">대분류</div>
                        <div className="Filter_Content">
                            <Select
                                styles={customStyles}
                                value={Filter_State.depart}
                                onChange={e => {
                                    Sub_Depart(e);
                                    dispatch(Insert_Man_Day_Select_Reducer_State_Func({ ...Filter_State, depart: e }));
                                }}
                                isClearable
                                options={Input_Title_Lists.map(list => {
                                    return { value: list.Major_Category_Code, label: list.Major_Category_Name };
                                })}
                                placeholder="선택 해 주세요."
                            ></Select>
                        </div>
                    </div>
                    <div className="Filter_GR">
                        <div className="Filter_Title">설비명</div>
                        <div className="Filter_Content">
                            <Select
                                styles={customStyles}
                                value={Filter_State.sub_depart}
                                options={sub_Depart_options}
                                isClearable
                                onChange={e => dispatch(Insert_Man_Day_Select_Reducer_State_Func({ ...Filter_State, sub_depart: e }))}
                                placeholder="선택 해 주세요."
                            ></Select>
                        </div>
                    </div>
                    <div className="Filter_GR">
                        <div className="Filter_Title">구분</div>
                        <div className="Filter_Content">
                            <Select
                                styles={customStyles}
                                value={Filter_State.divide}
                                isClearable
                                onChange={e => dispatch(Insert_Man_Day_Select_Reducer_State_Func({ ...Filter_State, divide: e }))}
                                options={Divide_Lists.map(list => {
                                    return { value: list.itemCode, label: list.itemName };
                                })}
                                placeholder="선택 해 주세요."
                            ></Select>
                        </div>
                    </div>
                    <div className="Filter_GR">
                        <div className="Filter_Title">입력여부</div>
                        <div className="Filter_Content">
                            <Select
                                styles={customStyles}
                                value={Filter_State.inputCheck}
                                isClearable
                                onChange={e => {
                                    e?.value === 'OFF'
                                        ? dispatch(
                                              Insert_Man_Day_Select_Reducer_State_Func({
                                                  ...Filter_State,
                                                  inputCheck: e,
                                                  divide: null,
                                                  sub_depart: null,
                                                  depart: null,
                                              })
                                          )
                                        : dispatch(
                                              Insert_Man_Day_Select_Reducer_State_Func({
                                                  ...Filter_State,
                                                  inputCheck: e,
                                              })
                                          );
                                }}
                                options={[
                                    { value: 'ON', label: '입력완료' },
                                    { value: 'OFF', label: '미입력' },
                                ]}
                                placeholder="선택 해 주세요."
                            ></Select>
                        </div>
                    </div>
                </div>

                <div className="Filter_Button_Group">
                    <div className="Filter_Button_Container">
                        <div className="Update_Button_Container">
                            <button
                                onClick={() => {
                                    Excel_Download();
                                }}
                                style={{ width: '150px', backgroundColor: '#368' }}
                            >
                                엑셀 내보내기
                            </button>
                        </div>
                        <div className="Update_Button_Container">
                            <button
                                onClick={async () => {
                                    dispatch(Initial_Man_Day_Select_Reducer_State_Func());
                                    await Getting_Man_Day_Info_Data(initState.Filters_State);
                                }}
                            >
                                초기화
                            </button>
                        </div>
                        <div className="Save_Button_Container">
                            <button
                                style={{ background: 'green' }}
                                onClick={() => {
                                    Getting_Man_Day_Info_Data();
                                }}
                            >
                                조회
                            </button>
                        </div>
                    </div>
                </div>
            </TableFilterMainDivBox>
        </SelectAllFilterMainDivBox>
    );
};

export default SelectAllFilter;
