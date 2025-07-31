import React from 'react';

const HolidayTableList = ({ Holiday_List }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>날짜</th>
                    <th>날짜명</th>
                </tr>
            </thead>
            <tbody>
                {Holiday_List.map(list => {
                    return (
                        <tr key={list.holidayDate}>
                            <td>{list.holidayDate}</td>
                            <td>{list.holidayName}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default HolidayTableList;
