import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { InputPageMainDivBox } from '../../../../../ManDayApply/Contents/InputPage';
import { MdDeleteForever } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
import ManDayInputSelect from './ManDayInputSelect';
import SelectBoxs from '../../../../../ManDayApply/Contents/SelectBoxs';

const ManDayUpdateMode = ({ WeekContainer, setWeekContainer, List_Items, Select_Date, Today_Date }) => {
    // 데이터 삭제
    const HandleDeleteTable = Select_Data => {
        setWeekContainer({
            ...WeekContainer,
            man_day_infos: WeekContainer.man_day_infos.filter(item => item.indexs !== Select_Data.indexs),
        });
    };

    // 데이터 추가
    const HandleClicksAddChild = () => {
        const Add_Items = {
            applyCode: null,
            calculateDailyExpense: 0,
            date: List_Items.date,
            depart: null,
            departCode: null,
            departmentCode: null,
            divide: null,
            divideCode: null,
            email: WeekContainer.email,
            indexs: `${List_Items.date}_${moment().format('YYYYMMDDHHmmss')}`,
            manDay: 0,
            originalDailyExpense: 0,
            subDepartCode: null,
            sub_depart: null,
        };
        setWeekContainer({
            ...WeekContainer,
            man_day_infos: WeekContainer.man_day_infos.concat(Add_Items),
        });
    };

    return (
        <InputPageMainDivBox>
            <div style={{ textAlign: 'center', fontWeight: 'bolder', marginTop: '10px', marginBottom: '10px' }}>
                {moment(List_Items.date).format('MM.DD dddd')}
            </div>
            <div>
                {WeekContainer.man_day_infos
                    .filter(item => item.date === List_Items.date)
                    .map((list, j) => {
                        return (
                            <div key={list.indexs}>
                                <div className="Delete_Container">
                                    <div>{j + 1}.</div>
                                    <div
                                        className="Delete_Button"
                                        onClick={() => {
                                            HandleDeleteTable(list);
                                        }}
                                    >
                                        <MdDeleteForever />
                                    </div>
                                </div>
                                <ManDayInputSelect
                                    Now_Data={list}
                                    WeekContainer={WeekContainer}
                                    setWeekContainer={data => setWeekContainer(data)}
                                ></ManDayInputSelect>
                            </div>
                        );
                    })}
            </div>

            <div style={{ marginBottom: '40px' }}>
                <div
                    className="Plus_Container"
                    onClick={() => {
                        HandleClicksAddChild();
                    }}
                >
                    <FaPlus />
                </div>
            </div>
        </InputPageMainDivBox>
    );
};

export default ManDayUpdateMode;
