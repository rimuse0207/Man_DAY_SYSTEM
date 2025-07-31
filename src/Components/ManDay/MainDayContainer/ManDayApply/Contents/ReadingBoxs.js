import moment from 'moment';
import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { InputPageMainDivBox } from './InputPage';
import { SelectBoxsMainDivBox } from './SelectBoxs';
import { useSelector } from 'react-redux';

const ReadingBoxs = ({ List_Items, WeekContainer, setWeekContainer }) => {
    // const Input_Title_Lists = useSelector(state => state.Man_Day_Select_Items_State.Equipment_Lists_data);
    // const Divide_Lists = useSelector(state => state.Man_Day_Select_Items_State.divide_Lists_data);

    const Depart_Option_Lists = useSelector(state => state.Man_Day_Select_Option_Lists_State.Depart_Option_Lists);
    const Sub_Depart_Option_Lists = useSelector(state => state.Man_Day_Select_Option_Lists_State.Sub_Depart_Option_Lists);
    const Divide_Depart_Option_Lists = useSelector(state => state.Man_Day_Select_Option_Lists_State.Divide_Depart_Option_Lists);

    return (
        <InputPageMainDivBox>
            {List_Items.holidayChecking ? (
                <div style={{ textAlign: 'center', fontWeight: 'bolder', marginTop: '10px', marginBottom: '10px', color: 'red' }}>
                    {moment(List_Items.date).format('MM.DD dddd')}
                    (공휴일)
                </div>
            ) : (
                <div style={{ textAlign: 'center', fontWeight: 'bolder', marginTop: '10px', marginBottom: '10px' }}>
                    {moment(List_Items.date).format('MM.DD dddd')}
                </div>
            )}
            <div>
                {List_Items.child.map((list, j) => {
                    return (
                        <div key={list.index}>
                            <SelectBoxsMainDivBox>
                                <div className="Input_GR">
                                    <div className="Title">설비군</div>
                                    <div className="Answer" style={{ textAlign: 'center' }}>
                                        {Depart_Option_Lists.map(item => {
                                            return item.itemCode === list.depart ? item.itemName : '';
                                        })}
                                    </div>
                                </div>
                                <div className="Input_GR">
                                    <div className="Title">설비명</div>
                                    <div className="Answer" style={{ textAlign: 'center' }}>
                                        {Sub_Depart_Option_Lists.map(item => {
                                            return item.itemCode === list.sub_depart && item.itemParentCode === list.depart
                                                ? item.itemName
                                                : '';
                                        })}
                                    </div>
                                </div>
                                <div className="Input_GR">
                                    <div className="Title">업무 유형</div>
                                    <div className="Answer" style={{ textAlign: 'center' }}>
                                        {Divide_Depart_Option_Lists.map(item => {
                                            return item.itemCode === list.divide &&
                                                item.divideType === 'divide' &&
                                                item.itemParentCode === list.sub_depart
                                                ? item.itemName
                                                : '';
                                        })}
                                    </div>
                                </div>
                                <div className="Input_GR">
                                    <div className="Title">Man-day(시간)</div>
                                    <div className="Answer" style={{ textAlign: 'center' }}>
                                        {list.man_day.toFixed(1)}
                                    </div>
                                </div>
                            </SelectBoxsMainDivBox>
                        </div>
                    );
                })}
            </div>
        </InputPageMainDivBox>
    );
};

export default ReadingBoxs;
