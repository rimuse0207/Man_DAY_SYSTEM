import React, { useEffect } from 'react';
import { SelectBoxsMainDivBox } from '../../../../../ManDayApply/Contents/SelectBoxs';
import { useSelector } from 'react-redux';

const ManDayInputSelect = ({ Now_Data, setWeekContainer, WeekContainer }) => {
    // const Input_Title_Lists = useSelector(state => state.Man_Day_Select_Items_State.Equipment_Lists_data);
    // const Divide_Lists = useSelector(state => state.Man_Day_Select_Items_State.divide_Lists_data);

    const Depart_Option_Lists = useSelector(state => state.Man_Day_Select_Option_Lists_State.Depart_Option_Lists);
    const Sub_Depart_Option_Lists = useSelector(state => state.Man_Day_Select_Option_Lists_State.Sub_Depart_Option_Lists);
    const Divide_Depart_Option_Lists = useSelector(state => state.Man_Day_Select_Option_Lists_State.Divide_Depart_Option_Lists);

    const handleFieldChange = (e, fieldName) => {
        const newValue = e?.target?.value;

        if (fieldName === 'manDay') {
            const val = e.target.value;
            if (val === '') {
                setWeekContainer(prev => {
                    const updatedDateLists = prev.man_day_infos.map(dayItem => {
                        if (dayItem.date === Now_Data.date && dayItem.indexs === Now_Data.indexs) {
                            return {
                                ...dayItem,
                                [fieldName]: '', // 동적으로 키 설정
                            };
                        }
                        return dayItem;
                    });
                    return {
                        ...prev,
                        man_day_infos: updatedDateLists,
                    };
                });
                return;
            }

            const num = Number(val);

            // 숫자인지 확인하고, 0~8 사이일 때만 반영
            if (!isNaN(num) && Number.isInteger(num) && num >= 0 && num <= 8) {
                setWeekContainer(prev => {
                    const updatedDateLists = prev.man_day_infos.map(dayItem => {
                        if (dayItem.date === Now_Data.date && dayItem.indexs === Now_Data.indexs) {
                            return {
                                ...dayItem,
                                [fieldName]: num, // 동적으로 키 설정
                            };
                        }
                        return dayItem;
                    });
                    return {
                        ...prev,
                        man_day_infos: updatedDateLists,
                    };
                });
            }
        } else {
            setWeekContainer(prev => {
                const updatedDateLists = prev.man_day_infos.map(dayItem => {
                    if (dayItem.date === Now_Data.date && dayItem.indexs === Now_Data.indexs) {
                        return {
                            ...dayItem,
                            [fieldName]: newValue, // 동적으로 키 설정
                        };
                    }
                    return dayItem;
                });
                return {
                    ...prev,
                    man_day_infos: updatedDateLists,
                };
            });
        }
    };

    return (
        <SelectBoxsMainDivBox style={{ fontSize: '0.8em' }}>
            <div className="Input_GR">
                <div className="Title">설비군</div>
                <div className="Answer">
                    <select
                        name="departCode"
                        value={Now_Data.departCode}
                        onChange={e => {
                            handleFieldChange(e, 'departCode');
                            handleFieldChange(null, 'subDepartCode');
                            handleFieldChange(null, 'divide');
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
                        name="subDepartCode"
                        value={Now_Data.subDepartCode}
                        onChange={e => {
                            handleFieldChange(e, 'subDepartCode');
                            handleFieldChange(null, 'divide');
                        }}
                    >
                        <option value={null}></option>

                        {Sub_Depart_Option_Lists.filter(item => item.itemParentCode === Now_Data.departCode)
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
                    <select value={Now_Data.divide} onChange={e => handleFieldChange(e, 'divide')}>
                        <option value={null}></option>

                        {Divide_Depart_Option_Lists.filter(item => item.itemParentCode === Now_Data.subDepartCode)
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
                <div className="Title">Man-day(시간)</div>
                <div className="Answer">
                    <input
                        value={Now_Data.manDay}
                        type="number"
                        min={0}
                        max={1}
                        step={0.1}
                        onChange={e => handleFieldChange(e, 'manDay')}
                    ></input>
                </div>
            </div>
        </SelectBoxsMainDivBox>
    );
};

export default ManDayInputSelect;
