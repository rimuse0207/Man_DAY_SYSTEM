import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export const SelectBoxsMainDivBox = styled.div`
    margin-bottom: 30px;
    font-size: 0.9em;
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
    const annualLeaveLists = ['연차', '오전반차', '오후반차'];
    const Input_Title_Lists = useSelector(state => state.Man_Day_Select_Items_State.Equipment_Lists_data);
    const Divide_Lists = useSelector(state => state.Man_Day_Select_Items_State.divide_Lists_data);
    const [Annuals, setAnnuals] = useState(false);
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

    // const handleFieldChange = (e, fieldName) => {
    //     const newValue = e?.target?.value;

    //     setWeekContainer(prev => {
    //         const updatedDateLists = prev.Date_Lists.map(dayItem => {
    //             if (dayItem.date === Now_Data.date) {
    //                 const matchedInputTitle = Input_Title_Lists.find(
    //                     i => i.Major_Category_Code === (fieldName === 'depart' ? newValue : Now_Data.depart)
    //                 );
    //                 const matchedEq = matchedInputTitle?.Eqipment_lists?.find(
    //                     eq => eq.itemCode === (fieldName === 'sub_depart' ? newValue : Now_Data.sub_depart)
    //                 );
    //                 const currentSubDepartName = matchedEq?.itemName;

    //                 const updatedChildren = dayItem.child.map(childItem => {
    //                     if (childItem.index === Now_Data.index) {
    //                         const updatedChild = {
    //                             ...childItem,
    //                             [fieldName]: newValue,
    //                         };

    //                         // console.log(annualLeaveLists.includes(currentSubDepartName));
    //                         // depart 또는 sub_depart가 변경되었고 연차 관련이면 divide 초기화
    //                         if ((fieldName === 'depart' || fieldName === 'sub_depart') && Now_Data?.sub_depart === '연차') {
    //                             console.log('실행');

    //                             updatedChild.divide = null;
    //                         }

    //                         return updatedChild;
    //                     }
    //                     return childItem;
    //                 });

    //                 return {
    //                     ...dayItem,
    //                     child: updatedChildren,
    //                 };
    //             }
    //             return dayItem;
    //         });

    //         return {
    //             ...prev,
    //             Date_Lists: updatedDateLists,
    //         };
    //     });
    // };

    // // 1. helper: sub_depart 이름 가져오기
    // const getSubDepartName = () => {
    //     const matched = Input_Title_Lists.find(item => item.Major_Category_Code === Now_Data.depart);
    //     if (!matched) return null;
    //     const equipment = matched.Eqipment_lists.find(eq => eq.itemCode === Now_Data.sub_depart);
    //     return equipment ? equipment.itemName : null;
    // };

    // // 2. 업무 유형 필터링 함수
    // const getFilteredDivideList = () => {
    //     const subDepartName = getSubDepartName();
    //     const isAnnual = annualLeaveLists.includes(subDepartName);
    //     if (isAnnual) {
    //         return Divide_Lists.filter(item => annualLeaveLists.includes(item.itemName));
    //     } else {
    //         return Divide_Lists.filter(item => !annualLeaveLists.includes(item.itemName));
    //     }
    // };

    return (
        <SelectBoxsMainDivBox>
            <div className="Input_GR">
                <div className="Title">상위 설비명</div>
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
                    <select name="sub_depart" value={Now_Data.sub_depart} onChange={e => handleFieldChange(e, 'sub_depart')}>
                        <option value={null}></option>
                        {Input_Title_Lists.map(item => {
                            if (item.Major_Category_Code === Now_Data.depart) {
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
                <div className="Title">업무 유형</div>
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
                        {/* {getFilteredDivideList().map(list => (
                            <option value={list.itemCode} key={list.itemCode}>
                                {list.itemName}
                            </option>
                        ))} */}
                    </select>
                </div>
            </div>
            <div className="Input_GR">
                <div className="Title">Man-day</div>
                <div className="Answer">
                    <input
                        value={Now_Data.man_day}
                        type="number"
                        min={0}
                        max={1}
                        step={0.1}
                        onChange={e => handleFieldChange(e, 'man_day')}
                    ></input>
                </div>
            </div>
        </SelectBoxsMainDivBox>
    );
};

export default SelectBoxs;
