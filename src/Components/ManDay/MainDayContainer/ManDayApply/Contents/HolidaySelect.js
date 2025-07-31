import React from 'react';
import { useSelector } from 'react-redux';
import { SelectBoxsMainDivBox } from './SelectBoxs';

const HolidaySelect = ({ Now_Data }) => {
    const Depart_Option_Lists = useSelector(state => state.Man_Day_Select_Option_Lists_State.Depart_Option_Lists);
    const Sub_Depart_Option_Lists = useSelector(state => state.Man_Day_Select_Option_Lists_State.Sub_Depart_Option_Lists);
    const Divide_Depart_Option_Lists = useSelector(state => state.Man_Day_Select_Option_Lists_State.Divide_Depart_Option_Lists);
    return (
        <SelectBoxsMainDivBox>
            <div className="Input_GR">
                <div className="Title">설비군</div>
                <div className="Answer" style={{ textAlign: 'center' }}>
                    {Depart_Option_Lists.map(list => {
                        return list.itemCode === Now_Data.depart ? list.itemName : '';
                    })}
                </div>
            </div>
            <div className="Input_GR">
                <div className="Title">설비명</div>
                <div className="Answer" style={{ textAlign: 'center' }}>
                    {Sub_Depart_Option_Lists.map(list => {
                        return list.itemCode === Now_Data.sub_depart && list.itemParentCode === Now_Data.depart ? list.itemName : '';
                    })}
                </div>
            </div>
            <div className="Input_GR">
                <div className="Title">업무 유형</div>
                <div className="Answer" style={{ textAlign: 'center' }}>
                    {Divide_Depart_Option_Lists.map(list => {
                        return list.itemCode === Now_Data.divide && list.itemParentCode === Now_Data.sub_depart ? list.itemName : '';
                    })}
                </div>
            </div>

            <div className="Input_GR">
                <div className="Title">Man-day(시간)</div>
                <div className="Answer" style={{ textAlign: 'center' }}>
                    {Now_Data.man_day}
                </div>
            </div>
        </SelectBoxsMainDivBox>
    );
};

export default HolidaySelect;
