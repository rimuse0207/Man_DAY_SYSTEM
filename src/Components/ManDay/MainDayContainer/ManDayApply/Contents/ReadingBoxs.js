import moment from 'moment';
import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { InputPageMainDivBox } from './InputPage';
import { SelectBoxsMainDivBox } from './SelectBoxs';
import { useSelector } from 'react-redux';

const ReadingBoxs = ({ List_Items, WeekContainer, setWeekContainer }) => {
    const Input_Title_Lists = useSelector(state => state.Man_Day_Select_Items_State.Equipment_Lists_data);
    const Divide_Lists = useSelector(state => state.Man_Day_Select_Items_State.divide_Lists_data);
    return (
        <InputPageMainDivBox>
            <div style={{ textAlign: 'center', fontWeight: 'bolder', marginTop: '10px', marginBottom: '10px' }}>
                {moment(List_Items.date).format('MM.DD dddd')}
            </div>
            <div>
                {List_Items.child.map((list, j) => {
                    return (
                        <div key={list.index}>
                            <SelectBoxsMainDivBox>
                                <div className="Input_GR">
                                    <div className="Title">대분류</div>
                                    <div className="Answer" style={{ textAlign: 'center' }}>
                                        {Input_Title_Lists.map(item => {
                                            return item.Major_Category_Code === list.depart ? item.Major_Category_Name : '';
                                        })}
                                    </div>
                                </div>
                                <div className="Input_GR">
                                    <div className="Title">설비명</div>
                                    <div className="Answer" style={{ textAlign: 'center' }}>
                                        {Input_Title_Lists.map(item => {
                                            return item.Eqipment_lists.map(equip =>
                                                equip.itemCode === list.sub_depart ? equip.itemName : ''
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="Input_GR">
                                    <div className="Title">구분</div>
                                    <div className="Answer" style={{ textAlign: 'center' }}>
                                        {Divide_Lists.map(item => {
                                            return item.itemCode === list.divide ? item.itemName : '';
                                        })}
                                    </div>
                                </div>
                                <div className="Input_GR">
                                    <div className="Title">Man-day</div>
                                    <div className="Answer" style={{ textAlign: 'center' }}>
                                        {list.man_day}
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
