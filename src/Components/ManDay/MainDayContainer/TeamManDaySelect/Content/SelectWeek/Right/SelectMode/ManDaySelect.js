import React, { useEffect, useState } from 'react';
import { SelectBoxsMainDivBox } from '../../../../../ManDayApply/Contents/SelectBoxs';
import { InputPageMainDivBox } from '../../../../../ManDayApply/Contents/InputPage';
import moment from 'moment';
import styled from 'styled-components';

const ManDaySelect = ({ Now_Select_User, NowDate, setSelect_Modes }) => {
    const [WeekContainer, setWeekContainer] = useState([
        {
            date: moment(NowDate).clone().startOf('isoWeek').format('YYYY-MM-DD'),
        },
        {
            date: moment(NowDate).clone().isoWeekday(2).format('YYYY-MM-DD'),
        },
        {
            date: moment(NowDate).clone().isoWeekday(3).format('YYYY-MM-DD'),
        },
        {
            date: moment(NowDate).clone().isoWeekday(4).format('YYYY-MM-DD'),
        },
        {
            date: moment(NowDate).clone().isoWeekday(5).format('YYYY-MM-DD'),
        },
    ]);
    useEffect(() => {
        setWeekContainer([
            {
                date: moment(NowDate).clone().startOf('isoWeek').format('YYYY-MM-DD'),
            },
            {
                date: moment(NowDate).clone().isoWeekday(2).format('YYYY-MM-DD'),
            },
            {
                date: moment(NowDate).clone().isoWeekday(3).format('YYYY-MM-DD'),
            },
            {
                date: moment(NowDate).clone().isoWeekday(4).format('YYYY-MM-DD'),
            },
            {
                date: moment(NowDate).clone().isoWeekday(5).format('YYYY-MM-DD'),
            },
        ]);
    }, [NowDate]);
    return (
        <div>
            <h3>{Now_Select_User ? `${Now_Select_User.departmentName} ${Now_Select_User.name} ${Now_Select_User.position}` : ''}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9em' }}>
                {Now_Select_User ? (
                    WeekContainer.map(list => {
                        return (
                            <InputPageMainDivBox>
                                <div style={{ textAlign: 'center', fontWeight: 'bolder', marginTop: '10px', marginBottom: '10px' }}>
                                    {moment(list.date).format('MM.DD dddd')}
                                </div>
                                {Now_Select_User?.man_day_infos
                                    .filter(item => item.date === list.date)
                                    .map(item => {
                                        return (
                                            <div key={item.index}>
                                                <div>
                                                    <SelectBoxsMainDivBox>
                                                        <div className="Input_GR">
                                                            <div className="Title">대분류</div>
                                                            <div className="Answer" style={{ textAlign: 'center' }}>
                                                                {item.depart}
                                                            </div>
                                                        </div>
                                                        <div className="Input_GR">
                                                            <div className="Title">설비명</div>
                                                            <div className="Answer" style={{ textAlign: 'center' }}>
                                                                {item.sub_depart}
                                                            </div>
                                                        </div>
                                                        <div className="Input_GR">
                                                            <div className="Title">구분</div>
                                                            <div className="Answer" style={{ textAlign: 'center' }}>
                                                                {item.divideCode}
                                                            </div>
                                                        </div>
                                                        <div className="Input_GR">
                                                            <div className="Title">Man-day</div>
                                                            <div className="Answer" style={{ textAlign: 'center' }}>
                                                                {item.manDay.toFixed(1)}
                                                            </div>
                                                        </div>
                                                    </SelectBoxsMainDivBox>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </InputPageMainDivBox>
                        );
                    })
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default ManDaySelect;
