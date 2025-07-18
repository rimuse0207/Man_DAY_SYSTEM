import React from 'react';
import styled from 'styled-components';

const SelectTableMainDivBox = styled.div`
    height: 40vh;
    overflow: auto;
    table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.8em;
    }

    th,
    td {
        border: none;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        padding: 5px;
        text-align: center;
        border-left: none;
        border-right: none;
    }

    th {
        color: black;
        background-color: lightgray;
    }

    thead {
        tr {
            position: sticky;
            top: 0px;
        }
    }
`;

const SelectTable = ({ Man_Day_Infos }) => {
    return (
        <SelectTableMainDivBox>
            <table>
                <thead>
                    <tr>
                        <th>날짜</th>
                        <th>회사명</th>
                        <th>팀</th>
                        <th>이름</th>
                        <th>대분류</th>
                        <th>장비명</th>
                        <th>구분</th>
                        <th>Man-day</th>
                        <th>입력여부</th>
                    </tr>
                </thead>
                <tbody>
                    {Man_Day_Infos.map(list => {
                        return list.user_lists.map((item, j) => {
                            return item.man_day.length > 0 ? (
                                item.man_day.map((user, idx) => {
                                    return (
                                        <tr key={`${list.date}-${item.email}-${idx}`}>
                                            <td>{list.date}</td>
                                            <td>{item.company}</td>
                                            <td>{item.departmentName}</td>
                                            <td>{item.name}</td>
                                            <td>{user.depart}</td>
                                            <td>{user.sub_depart}</td>
                                            <td>{user.divideCode}</td>
                                            <td>{user.manDay.toFixed(1)}</td>
                                            <td>입력완료</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr key={`${list.date}-${list.date}-${item.email}-empty-${j}`}>
                                    <td>{list.date}</td>
                                    <td>{item.company}</td>
                                    <td>{item.departmentName}</td>
                                    <td>{item.name}</td>
                                    <td colSpan={4}></td>
                                    <td style={{ color: 'red' }}>미입력</td>
                                </tr>
                            );
                        });
                    })}
                </tbody>

                {/* <tbody>
                    {Man_Day_Infos.flatMap(list =>
                        list.user_lists.flatMap((item, idx) => {
                            if (item.man_day.length > 0) {
                                return item.man_day.map((user, mdIdx) => (
                                    <tr>
                                        <td>{list.date}</td>
                                        <td>{item.departmentName}</td>
                                        <td>{item.name}</td>
                                        <td>{user.depart}</td>
                                        <td>{user.sub_depart}</td>
                                        <td>{user.divideCode}</td>
                                        <td>{user.manDay}</td>
                                        <td>입력완료</td>
                                    </tr>
                                ));
                            } else {
                                return (
                                    <tr>
                                        <td>{list.date}</td>
                                        <td>{item.departmentName}</td>
                                        <td>{item.name}</td>
                                        <td colSpan={4}></td>
                                        <td style={{ color: 'red' }}>미입력</td>
                                    </tr>
                                );
                            }
                        })
                    )}
                </tbody> */}
            </table>
            <div style={{ marginTop: '20px', marginBottom: '20px' }}></div>
        </SelectTableMainDivBox>
    );
};

export default SelectTable;
