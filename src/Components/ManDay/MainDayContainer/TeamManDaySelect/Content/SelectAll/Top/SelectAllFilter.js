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
import { toast } from '../../../../../../ToastMessage/ToastManager';
import { TbHierarchy3 } from 'react-icons/tb';
import DepartSelectModal from '../../Statistic/CommonFilters/DepartSelectModal/DepartSelectModal';

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
const SelectAllFilter = ({
    UserLists,
    PersonFilterOptions,
    DepartmentFilterOptions,
    Getting_Man_Day_Info_Data,
    Excel_Download,
    Develop_Operate_Excel_Download,
}) => {
    const dispatch = useDispatch();
    const Login_Info = useSelector(state => state.Login_Info_Reducer_State.Login_Info);
    const Depart_Option_Lists = useSelector(state => state.Man_Day_Select_Option_Lists_State.Depart_Option_Lists);
    const Sub_Depart_Option_Lists = useSelector(state => state.Man_Day_Select_Option_Lists_State.Sub_Depart_Option_Lists);
    const Divide_Depart_Option_Lists = useSelector(state => state.Man_Day_Select_Option_Lists_State.Divide_Depart_Option_Lists);
    const Filter_State = useSelector(state => state.Man_Day_Select_Filter_Reducer_State.Filters_State);
    const [DepartSelectModalIsOpen, setDepartSelectModalIsOpen] = useState(false);

    return (
        <SelectAllFilterMainDivBox>
            <TableFilterMainDivBox>
                <h2>조회</h2>
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
                                placeholder="선택해 주세요."
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
                                placeholder="선택해 주세요."
                            ></Select>
                        </div>
                        <div
                            className="Search_Icon_Container"
                            onClick={() => {
                                setDepartSelectModalIsOpen(true);
                            }}
                        >
                            <TbHierarchy3 />
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
                                placeholder="선택해 주세요."
                            ></Select>
                        </div>
                    </div>

                    <div className="Filter_GR">
                        <div className="Filter_Title">설비군</div>
                        <div className="Filter_Content">
                            <Select
                                styles={customStyles}
                                value={Filter_State.depart}
                                onChange={e => {
                                    // Sub_Depart(e);
                                    dispatch(
                                        Insert_Man_Day_Select_Reducer_State_Func({
                                            ...Filter_State,
                                            depart: e,
                                            sub_depart: null,
                                            divide: null,
                                        })
                                    );
                                }}
                                isClearable
                                // options={Input_Title_Lists.map(list => {
                                //     return { value: list.Major_Category_Code, label: list.Major_Category_Name };
                                // })}
                                options={Depart_Option_Lists.map(list => {
                                    return { value: list.itemCode, label: list.itemName };
                                })}
                                placeholder="선택해 주세요."
                            ></Select>
                        </div>
                    </div>
                    <div className="Filter_GR">
                        <div className="Filter_Title">설비명</div>
                        <div className="Filter_Content">
                            <Select
                                styles={customStyles}
                                value={Filter_State.sub_depart}
                                // options={sub_Depart_options}
                                options={Sub_Depart_Option_Lists.filter(item => item.itemParentCode === Filter_State?.depart?.value)
                                    .sort((a, b) => a.itemRank - b.itemRank)
                                    .map(list => {
                                        return {
                                            value: list.itemCode,
                                            label: list.itemName,
                                        };
                                    })}
                                isClearable
                                onChange={e => {
                                    if (Filter_State.depart?.value) {
                                        dispatch(
                                            Insert_Man_Day_Select_Reducer_State_Func({ ...Filter_State, sub_depart: e, divide: null })
                                        );
                                    } else {
                                        toast.show({
                                            title: `설비군을 먼저 선택 후 선택 가능합니다.`,
                                            successCheck: false,
                                            duration: 6000,
                                        });
                                    }
                                }}
                                onMenuOpen={() => {
                                    if (!Filter_State?.depart) {
                                        toast.show({
                                            title: `'설비군'을 먼저 선택 후 입력 가능합니다.`,
                                            successCheck: false,
                                            duration: 5000,
                                        });
                                    }
                                }}
                                placeholder="선택해 주세요."
                            ></Select>
                        </div>
                    </div>
                    <div className="Filter_GR">
                        <div className="Filter_Title">업무 유형</div>
                        <div className="Filter_Content">
                            <Select
                                styles={customStyles}
                                value={Filter_State.divide}
                                isClearable
                                onChange={e => dispatch(Insert_Man_Day_Select_Reducer_State_Func({ ...Filter_State, divide: e }))}
                                // options={Divide_Lists.map(list => {
                                //     return { value: list.itemCode, label: list.itemName };
                                // })}
                                options={Divide_Depart_Option_Lists.filter(item => item.itemParentCode === Filter_State?.sub_depart?.value)
                                    .sort((a, b) => a.itemRank - b.itemRank)
                                    .map(list => {
                                        return { value: list.itemCode, label: list.itemName };
                                    })}
                                onMenuOpen={() => {
                                    if (!Filter_State?.depart) {
                                        toast.show({
                                            title: `'설비명'을 먼저 선택 후 입력 가능합니다.`,
                                            successCheck: false,
                                            duration: 5000,
                                        });
                                    }
                                }}
                                placeholder="선택해 주세요."
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
                                placeholder="선택해 주세요."
                            ></Select>
                        </div>
                    </div>
                </div>

                <div className="Filter_Button_Group">
                    <div className="Filter_Button_Container">
                        {Login_Info.team === '개발운영팀' || Login_Info.id === 'sjyoo@dhk.co.kr' ? (
                            <div className="Update_Button_Container">
                                <button
                                    onClick={() => {
                                        Develop_Operate_Excel_Download();
                                    }}
                                    style={{
                                        width: '200px',
                                        backgroundColor: '#fff',
                                        color: 'black',
                                        border: '1px solid lightgray',
                                        fontWeight: 'bolder',
                                    }}
                                >
                                    개발운영팀 엑셀 내보내기
                                </button>
                            </div>
                        ) : (
                            <></>
                        )}
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
            {DepartSelectModalIsOpen ? (
                <DepartSelectModal onClose={() => setDepartSelectModalIsOpen(false)} Select_Types={'team'}></DepartSelectModal>
            ) : (
                <></>
            )}
        </SelectAllFilterMainDivBox>
    );
};

export default SelectAllFilter;
