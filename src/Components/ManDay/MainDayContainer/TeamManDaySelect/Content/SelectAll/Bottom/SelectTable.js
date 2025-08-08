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
        position: sticky;
        top: -1px;
        height: 32px;
        tr {
            /* position: sticky;
            top: 0px; */
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
                        <th>설비군</th>
                        <th>설비명</th>
                        <th>업무 유형</th>
                        <th>Man-day(시간)</th>
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
                                            <td>{user.manDay.toFixed(0)} 시간</td>
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
            </table>
            <div style={{ marginTop: '20px', marginBottom: '20px' }}></div>
        </SelectTableMainDivBox>
    );
};

export default SelectTable;
