import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export const SelectBoxsMainDivBox = styled.div`
    margin-bottom: 30px;
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
    const Input_Title_Lists = useSelector(state => state.Man_Day_Select_Items_State.Equipment_Lists_data);
    const Divide_Lists = useSelector(state => state.Man_Day_Select_Items_State.divide_Lists_data);
    const handleFieldChange = (e, fieldName) => {
        const newValue = e?.target?.value;

        setWeekContainer(prev => {
            const updatedDateLists = prev.Date_Lists.map(dayItem => {
                if (dayItem.date === Now_Data.date) {
                    const updatedChildren = dayItem.child.map(childItem => {
                        if (childItem.index === Now_Data.index) {
                            return {
                                ...childItem,
                                [fieldName]: newValue, // 동적으로 키 설정
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
    };

    return (
        <SelectBoxsMainDivBox>
            <div className="Input_GR">
                <div className="Title">대분류</div>
                <div className="Answer">
                    <select
                        name="depart"
                        value={Now_Data.depart}
                        onChange={e => {
                            handleFieldChange(e, 'depart');
                            handleFieldChange(null, 'sub_depart');
                        }}
                    >
                        <option value={null}></option>
                        {Input_Title_Lists.map(list => {
                            return (
                                <option value={list.Major_Category_Code} key={list.Major_Category_Code}>
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
                    <select name="sub_depart" value={Now_Data.sub_depart} onChange={e => handleFieldChange(e, 'sub_depart')}>
                        <option value={null}></option>
                        {Input_Title_Lists.map(item => {
                            if (item.Major_Category_Code === Now_Data.depart) {
                                return item.Eqipment_lists.map(list => {
                                    return (
                                        <option value={list.itemCode} key={list.itemCode}>
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
                                <option value={list.itemCode} key={list.itemCode}>
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
                        value={Now_Data.man_day}
                        type="number"
                        min="0"
                        max="1"
                        step="0.1"
                        onChange={e => handleFieldChange(e, 'man_day')}
                    ></input>
                </div>
            </div>
        </SelectBoxsMainDivBox>
    );
};

export default SelectBoxs;
