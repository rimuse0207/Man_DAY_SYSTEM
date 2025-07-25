import React from 'react';
import SelectBoxs from './SelectBoxs';
import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';
import { MdDeleteForever } from 'react-icons/md';
import ReadingBoxs from './ReadingBoxs';

moment.locale('ko');

export const InputPageMainDivBox = styled.div`
    width: 18%;
    .Plus_Container {
        border: 1px solid #efefef;
        text-align: center;
        font-size: 2em;
        margin-top: 20px;
        background-color: #efefef;
        border-radius: 5px;
        &:hover {
            cursor: pointer;
            opacity: 0.5;
        }
    }
    .Delete_Container {
        display: flex;
        justify-content: space-between;
        .Delete_Button {
            color: red;
            &:hover {
                cursor: pointer;
                opacity: 0.5;
            }
        }
    }
`;

const InputPage = ({ List_Items, WeekContainer, setWeekContainer, Select_Date, Today_Date }) => {
    const HandleClicksAddChild = () => {
        const Insert_Data = {
            index: `${moment().format('YYYYMMDDHHmmss')}`,
            date: List_Items.date,
            depart: null,
            sub_depart: null,
            divide: null,
            man_day: 0,
        };
        const Concat_Data = List_Items.child.concat(Insert_Data);

        setWeekContainer(pre => {
            const updateData = pre.Date_Lists.map(dayItem => {
                if (dayItem.date === List_Items.date) {
                    return {
                        ...dayItem,
                        child: Concat_Data,
                    };
                } else {
                    return dayItem;
                }
            });
            return {
                ...pre,
                Date_Lists: updateData,
            };
        });
    };
    const HandleDeleteTable = Select_Data => {
        setWeekContainer(prev => {
            const updatedDateLists = prev.Date_Lists.map(dayItem => {
                if (dayItem.date === Select_Data.date) {
                    const updatedChildren = dayItem.child.filter(childItem => (childItem.index === Select_Data.index ? '' : childItem));
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
        <InputPageMainDivBox>
            <div style={{ textAlign: 'center', fontWeight: 'bolder', marginTop: '10px', marginBottom: '10px' }}>
                {moment(List_Items.date).format('MM.DD dddd')}
            </div>
            <div>
                {List_Items.child.map((list, j) => {
                    return (
                        <div key={list.index}>
                            <div className="Delete_Container">
                                <div>{j + 1}.</div>
                                <div className="Delete_Button" onClick={() => HandleDeleteTable(list)}>
                                    <MdDeleteForever />
                                </div>
                            </div>
                            <SelectBoxs
                                WeekContainer={WeekContainer}
                                setWeekContainer={data => setWeekContainer(data)}
                                Now_Data={list}
                            ></SelectBoxs>
                        </div>
                    );
                })}
            </div>
            <div style={{ borderTop: '1px solid lightgray' }}>
                <div style={{ textAlign: 'end' }}>
                    <h5>Man-day 합</h5>
                    <div>{List_Items.child.reduce((pre, acc) => pre + Number(acc.man_day), 0).toFixed(1)}</div>
                </div>
            </div>
            {Today_Date === Select_Date ? (
                <div style={{ marginBottom: '40px' }}>
                    <div className="Plus_Container" onClick={() => HandleClicksAddChild()}>
                        <FaPlus />
                    </div>
                </div>
            ) : (
                <></>
            )}
        </InputPageMainDivBox>
    );
};

export default InputPage;
