import React, { useEffect } from 'react';
import { SelectBoxsMainDivBox } from '../../../../../ManDayApply/Contents/SelectBoxs';
import { useSelector } from 'react-redux';

const ManDayInputSelect = ({ Now_Data, setWeekContainer, WeekContainer }) => {
    const Input_Title_Lists = useSelector(state => state.Man_Day_Select_Items_State.Equipment_Lists_data);
    const Divide_Lists = useSelector(state => state.Man_Day_Select_Items_State.divide_Lists_data);

    const handleFieldChange = (e, fieldName) => {
        const newValue = e?.target?.value;
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
    };
    return (
        <SelectBoxsMainDivBox>
            <div className="Input_GR">
                <div className="Title">대분류</div>
                <div className="Answer">
                    <select
                        name="departCode"
                        value={Now_Data.departCode}
                        onChange={e => {
                            handleFieldChange(e, 'departCode');
                            handleFieldChange(null, 'subDepartCode');
                        }}
                    >
                        <option value={null}></option>
                        {Input_Title_Lists.map(list => {
                            return (
                                <option
                                    value={list.Major_Category_Code}
                                    data-name={list.Major_Category_Name}
                                    key={list.Major_Category_Code}
                                >
                                    {list.Major_Category_Name}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
            <div className="Input_GR">
                <div className="Title">설비명</div>
                <div className="Answer">
                    <select name="subDepartCode" value={Now_Data.subDepartCode} onChange={e => handleFieldChange(e, 'subDepartCode')}>
                        <option value={null}></option>
                        {Input_Title_Lists.map(item => {
                            if (item.Major_Category_Code === Now_Data.departCode) {
                                return item.Eqipment_lists.map(list => {
                                    return (
                                        <option value={list.itemCode} data-name={list.itemName} key={list.itemCode}>
                                            {list.itemName}
                                        </option>
                                    );
                                });
                            }
                        })}
                    </select>
                </div>
            </div>
            <div className="Input_GR">
                <div className="Title">구분</div>
                <div className="Answer">
                    <select value={Now_Data.divide} onChange={e => handleFieldChange(e, 'divide')}>
                        <option value={null}></option>
                        {Divide_Lists.map(list => {
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
                <div className="Title">Man-day</div>
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
