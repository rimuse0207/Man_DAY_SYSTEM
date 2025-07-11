import React from 'react';
import styled from 'styled-components';

const UserListsMainDivBox = styled.div`
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
    .Click_Buttons {
        font-weight: bolder;
        &:hover {
            cursor: pointer;
            color: blue;
        }
    }
`;

const UserLists = ({ UserLists, setNow_Select_User }) => {
    return (
        <UserListsMainDivBox>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>이름</th>
                        <th>직위</th>
                        <th>팀명</th>
                        <th>입력여부</th>
                    </tr>
                </thead>
                <tbody>
                    {UserLists.map(list => {
                        return (
                            <tr>
                                <td></td>
                                <td>{list.name}</td>
                                <td>{list.position}</td>
                                <td>{list.departmentName}</td>
                                {list.man_day_infos.length > 0 ? (
                                    <td className="Click_Buttons" onClick={() => setNow_Select_User(list)}>
                                        입력 완료
                                    </td>
                                ) : (
                                    <td style={{ color: 'red', fontWeight: 'bolder' }}>미입력</td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </UserListsMainDivBox>
    );
};
export default UserLists;
