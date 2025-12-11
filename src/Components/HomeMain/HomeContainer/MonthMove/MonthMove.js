import { useState } from "react";
import styled from "styled-components";

export const CalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  .Popup {
    position: fixed;
    background: white;
    border: 1px solid #ccc;
    padding: 20px;
    font-size: 12px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    white-space: nowrap;
    z-index: 1000; /* ✅ z-index 높여서 최상단으로 */
    transition: opacity 0.2s ease-in-out;
    opacity: 0;
    pointer-events: none;
  }

  .Popup.show {
    opacity: 1;
  }
`;

export const CalendarHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #2bc4f4;
  color: white;

  &:hover {
    background-color: #080bfe;
  }
`;

export const CalendarGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: auto;
  background-color: #ddd;
  position: relative;
  table {
    th {
      text-align: start;
      width: 100px;
      padding: 5px;
    }
  }
`;
export const useMonthMove = () => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const handleMonthChange = (offset) => {
    let newMonth = month + offset;
    let newYear = year;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    setYear(newYear);
    setMonth(newMonth);
  };

  const Select_Month_UI = () => {
    return (
      <CalendarWrapper className="AnnualLeaveCalendarTableMainDivBox">
        <CalendarHeader>
          <Button onClick={() => handleMonthChange(-1)}>〈 이전 달</Button>
          <h3>
            {year}년 {month + 1}월
          </h3>
          <Button onClick={() => handleMonthChange(1)}>다음 달 〉</Button>
        </CalendarHeader>
      </CalendarWrapper>
    );
  };

  return {
    Select_Month_UI,
    handleMonthChange,
    year,
    month,
  };
};
