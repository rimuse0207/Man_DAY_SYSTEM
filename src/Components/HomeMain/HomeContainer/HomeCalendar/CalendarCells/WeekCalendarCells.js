import React, { useEffect } from 'react';
import styled from 'styled-components';

export const DayCell = styled.div`
    padding: 5px;
    background-color: ${({ isCurrentMonth }) => (isCurrentMonth ? 'white' : '#f0f0f0')};
    color: ${({ isCurrentMonth }) => (isCurrentMonth ? 'black' : '#aaa')};
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: 12px;
    font-weight: bold;
    border: 1px solid #ddd;
    position: relative;
`;

const WeekCalendarCells = ({ daysOfWeek = [] }) => {
    return daysOfWeek.map(day => (
        <DayCell
            key={day.label}
            isCurrentMonth={true}
            isHeader={true}
            style={{ color: `${day.color}`, minHeight: '30px', justifyContent: 'center', alignItems: 'center' }}
        >
            {day.label}
        </DayCell>
    ));
};

export default WeekCalendarCells;
