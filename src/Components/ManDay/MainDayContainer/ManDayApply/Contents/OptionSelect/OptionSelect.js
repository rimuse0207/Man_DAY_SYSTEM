import React from 'react';
import { useSelector } from 'react-redux';

const OptionSelect = ({ Now_Data, handleFieldChange }) => {
    const Divide_Depart_Option_Lists = useSelector(state => state.Man_Day_Select_Option_Lists_State.Divide_Depart_Option_Lists);

    return (
        <select
            value={Now_Data.divide}
            onChange={e => handleFieldChange(Now_Data.depart, 'depart', Now_Data.sub_depart, 'sub_depart', e.target.value, 'divide')}
        >
            <option value={'nothing'}></option>

            {Divide_Depart_Option_Lists.filter(item => item.itemParentCode === Now_Data.sub_depart)
                .sort((a, b) => a.itemRank - b.itemRank)
                .map(list => {
                    return (
                        <option value={list.itemCode} data-name={list.itemName} key={list.itemCode}>
                            {list.itemName}
                        </option>
                    );
                })}
        </select>
    );
};

export default OptionSelect;
