import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { toast } from '../../../../ToastMessage/ToastManager';
import OptionSelect from './OptionSelect/OptionSelect';
export const SelectBoxsMainDivBox = styled.div`
    margin-bottom: 30px;
    font-size: 0.9em;
    .Input_GR {
        border: 1px solid lightgray;
        display: flex;
        height: 40px;
        line-height: 40px;
        .Title {
            width: 40%;
            text-align: center;
            border-right: 1px solid lightgray;
        }
        .Answer {
            width: 60%;
            select {
                width: 100%;
                height: 30px;
                border: none;
                outline: none;
            }
            input {
                width: 100%;
                height: 30px;
                border: none;
                outline: none;
                padding-left: 10px;
            }
        }
    }
`;

const SelectBoxs = ({ WeekContainer, setWeekContainer, Now_Data }) => {
    const Depart_Option_Lists = useSelector(state => state.Man_Day_Select_Option_Lists_State.Depart_Option_Lists);
    const Sub_Depart_Option_Lists = useSelector(state => state.Man_Day_Select_Option_Lists_State.Sub_Depart_Option_Lists);
    const Divide_Depart_Option_Lists = useSelector(state => state.Man_Day_Select_Option_Lists_State.Divide_Depart_Option_Lists);
    const [ReadOnlySetting, setReadOnlySetting] = useState(false);

    const handleFieldChange = async (depart, fieldName, subDepart, fieldName2, divide, fieldName3) => {
        setWeekContainer(prev => {
            const updatedDateLists = prev.Date_Lists.map(dayItem => {
                if (dayItem.date === Now_Data.date) {
                    const updatedChildren = dayItem.child.map(childItem => {
                        if (childItem.index === Now_Data.index) {
                            return {
                                ...childItem,
                                depart: depart, // 동적으로 키 설정
                                sub_depart: subDepart, // 동적으로 키 설정
                                divide: divide, // 동적으로 키 설정
                            };
                        }
                        return childItem;
                    });

                    return {
                        ...dayItem,
                        child: updatedChildren,
                    };
                }
                return dayItem;
            });

            return {
                ...prev,
                Date_Lists: updatedDateLists,
            };
        });
        if (divide && divide !== 'nothing') {
            if (divide === 'BB07' || divide === 'BB12') {
                setReadOnlySetting(true);
                Man_Fixed(8);
                toast.show({
                    title: `Man-day(시간)는 8로 고정됩니다.`,
                    successCheck: true,
                    duration: 3000,
                });
            } else if (divide === 'BB08') {
                setReadOnlySetting(true);
                Man_Fixed(4);

                toast.show({
                    title: `Man-day(시간)는 4로 고정됩니다.`,
                    successCheck: true,
                    duration: 3000,
                });
            } else {
                setReadOnlySetting(false);
            }
        } else {
            setReadOnlySetting(false);
        }
    };

    const Man_Fixed = (e, Man_Days) => {
        if (Man_Days === '') {
            setWeekContainer(prev => {
                const updatedDateLists = prev.Date_Lists.map(dayItem => {
                    if (dayItem.date === Now_Data.date) {
                        const updatedChildren = dayItem.child.map(childItem => {
                            if (childItem.index === Now_Data.index) {
                                return {
                                    ...childItem,
                                    man_day: '', // 동적으로 키 설정
                                };
                            }
                            return childItem;
                        });

                        return {
                            ...dayItem,
                            child: updatedChildren,
                        };
                    }
                    return dayItem;
                });

                return {
                    ...prev,
                    Date_Lists: updatedDateLists,
                };
            });
            return;
        }

        const num = Number(Man_Days);

        // 숫자인지 확인하고, 0~8 사이일 때만 반영
        if (!isNaN(num) && Number.isInteger(num) && num >= 0 && num <= 8) {
            setWeekContainer(prev => {
                const updatedDateLists = prev.Date_Lists.map(dayItem => {
                    if (dayItem.date === Now_Data.date) {
                        const updatedChildren = dayItem.child.map(childItem => {
                            if (childItem.index === Now_Data.index) {
                                return {
                                    ...childItem,
                                    man_day: num, // 동적으로 키 설정
                                };
                            }
                            return childItem;
                        });

                        return {
                            ...dayItem,
                            child: updatedChildren,
                        };
                    }
                    return dayItem;
                });

                return {
                    ...prev,
                    Date_Lists: updatedDateLists,
                };
            });
        }
    };

    return (
        <SelectBoxsMainDivBox>
            <div className="Input_GR">
                <div className="Title">설비군</div>
                <div className="Answer">
                    <select
                        name="depart"
                        value={Now_Data.depart}
                        onChange={e => {
                            if (e?.target?.value === 'AA99') {
                                handleFieldChange(e.target.value, 'depart', 'AA9901', 'sub_depart', 'nothing', 'divide');
                            } else if (e?.target?.value === 'AA08') {
                                handleFieldChange(e.target.value, 'depart', 'AA0801', 'sub_depart', 'nothing', 'divide');
                            } else if (e?.target?.value === 'AA09') {
                                handleFieldChange(e.target.value, 'depart', 'AA0901', 'sub_depart', 'nothing', 'divide');
                            } else {
                                handleFieldChange(e.target.value, 'depart', null, 'sub_depart', 'nothing', 'divide');
                            }
                        }}
                    >
                        <option value={null}></option>

                        {Depart_Option_Lists.map(list => {
                            return (
                                <option value={list.itemCode} data-name={list.itemName} key={list.itemCode}>
                                    {list.itemName}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
            <div className="Input_GR">
                <div className="Title">설비명</div>
                <div className="Answer">
                    <select
                        name="sub_depart"
                        value={Now_Data.sub_depart}
                        onChange={e => {
                            handleFieldChange(Now_Data.depart, 'depart', e.target.value, 'sub_depart', 'nothing', 'divide');
                        }}
                    >
                        <option value={null}></option>
                        {Sub_Depart_Option_Lists.filter(item => item.itemParentCode === Now_Data.depart)
                            .sort((a, b) => a.itemRank - b.itemRank)
                            .map(list => {
                                return (
                                    <option value={list.itemCode} data-name={list.itemName} key={list.itemCode}>
                                        {list.itemName}
                                    </option>
                                );
                            })}
                    </select>
                </div>
            </div>
            <div className="Input_GR">
                <div className="Title">업무 유형</div>
                <div className="Answer">
                    <OptionSelect
                        Now_Data={Now_Data}
                        handleFieldChange={(data, data1, data2, data3, data4, data5) =>
                            handleFieldChange(data, data1, data2, data3, data4, data5)
                        }
                    ></OptionSelect>
                </div>
            </div>

            <div className="Input_GR">
                <div className="Title">Man-day(시간)</div>
                <div className="Answer">
                    <input
                        value={Now_Data.man_day}
                        type="number"
                        min={0}
                        max={8}
                        step={1}
                        onChange={e => Man_Fixed(e, e.target.value)}
                        readOnly={ReadOnlySetting}
                    ></input>
                </div>
            </div>
        </SelectBoxsMainDivBox>
    );
};

export default SelectBoxs;
