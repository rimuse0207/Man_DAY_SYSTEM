import React, { useEffect, useState } from 'react';
import { customStyles, SelectAllFilterMainDivBox } from '../../SelectAll/Top/SelectAllFilter';
import { TableFilterMainDivBox } from '../../../../ManDaySelect/Contents/TableFilter';
import { useDispatch, useSelector } from 'react-redux';
import {
    Initial_Man_Day_Select_Reducer_State_Func,
    Insert_Man_Day_Select_Reducer_State_Func,
} from '../../../../../../../Models/ManDayReducers/ManDaySelectFilterReducer';
import Select from 'react-select';
import { ko } from 'date-fns/esm/locale';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { Request_Get_Axios } from '../../../../../../../API';

const CommonFilters = ({ menuCode, Getting_Person_Bar_State }) => {
    const dispatch = useDispatch();
    const [PersonFilterOptions, setPersonFilterOptions] = useState([]);
    const [DepartmentFilterOptions, setDepartmentFilterOptions] = useState([]);
    const Input_Title_Lists = useSelector(state => state.Man_Day_Select_Items_State.Equipment_Lists_data);
    const Filter_State = useSelector(state => state.Man_Day_Select_Filter_Reducer_State.Filters_State);

    useEffect(() => {
        Getting_Team_Member_Lists();
    }, []);
    const Getting_Team_Member_Lists = async () => {
        const Getting_Team_Member_Lists_Axios = await Request_Get_Axios('/API/PLM/Getting_Team_Member_All_Lists_For_Using_Filter_Options');
        if (Getting_Team_Member_Lists_Axios.status) {
            setPersonFilterOptions(
                Getting_Team_Member_Lists_Axios.data.Person_Options ? Getting_Team_Member_Lists_Axios.data.Person_Options : []
            );
            setDepartmentFilterOptions(
                Getting_Team_Member_Lists_Axios.data.Team_Options ? Getting_Team_Member_Lists_Axios.data.Team_Options : []
            );
        }
    };

    return (
        <SelectAllFilterMainDivBox style={{ height: '200px' }}>
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

                    {menuCode === 'Team' ? (
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
                    ) : (
                        <></>
                    )}

                    {menuCode === 'Person' ? (
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
                    ) : (
                        <></>
                    )}

                    {/* <div className="Filter_GR">
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
                    </div> */}
                </div>
                <div className="Filter_Button_Group">
                    <div className="Filter_Button_Container">
                        <div className="Update_Button_Container">
                            <button
                                onClick={async () => {
                                    dispatch(Initial_Man_Day_Select_Reducer_State_Func());
                                }}
                            >
                                초기화
                            </button>
                        </div>
                        <div className="Save_Button_Container">
                            <button
                                style={{ background: 'green' }}
                                onClick={() => {
                                    Getting_Person_Bar_State();
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

export default CommonFilters;
