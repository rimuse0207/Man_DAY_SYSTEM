import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

const TableMainDivBox = styled.div`
    table {
        width: 100%;
        border-collapse: collapse;
    }

    th,
    td {
        border: 1px solid #ddd;
        padding: 8px;

        text-align: center;
    }

    th {
        background-color: #f2f2f2;
        color: black;
    }

    thead {
        tr {
            position: sticky;
            top: 0px;
        }
    }
`;

const Table = ({ Table_State }) => {
    return (
        <TableMainDivBox>
            <table>
                <thead>
                    <tr>
                        <th width="50px">년도</th>
                        <th width="40px">월</th>
                        <th width="40px">일</th>
                        <th>팀</th>
                        <th>파트</th>
                        <th>이름</th>
                        <th>대분류</th>
                        <th>설비명</th>
                        <th>구분</th>
                        <th>Man-Day</th>
                    </tr>
                </thead>
                <tbody>
                    {Table_State.map(list => {
                        return (
                            <tr key={list.indexs}>
                                <td>{moment(list.date).format('YYYY')}</td>
                                <td>{moment(list.date).format('MM')}</td>
                                <td>{moment(list.date).format('DD')}</td>
                                <td>{list.team}</td>
                                <td>{list.part}</td>
                                <td>{list.name}</td>
                                <td>{list.depart}</td>
                                <td>{list.sub_depart}</td>
                                <td>{list.divideCode}</td>
                                <td>{list.manDay}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </TableMainDivBox>
    );
};

export default Table;
