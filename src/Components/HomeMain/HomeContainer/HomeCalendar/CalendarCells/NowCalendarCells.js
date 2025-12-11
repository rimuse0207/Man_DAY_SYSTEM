import React from "react";
import { DayCell } from "./WeekCalendarCells";
import { useSelector } from "react-redux";

const NowCalendarCells = ({ days = [], HandleAddSchedule, eventBars = [] }) => {
  const Holiday_Lists = useSelector((state) => state.HolidayThunkReducer.data);
  //   const Holiday_Lists = [];
  const CheckingHoliday = (date) => {
    const isHoliday = Holiday_Lists.find(
      (item) => item.holidayDate === date.date
    );
    return isHoliday;
  };
  return days.map((date, index) => (
    <DayCell
      key={date.date}
      isCurrentMonth={date.isCurrentMonth}
      onClick={() => HandleAddSchedule(date)}
      style={{
        color:
          date.dayOfWeek === 0 || CheckingHoliday(date)
            ? "red" // 일요일
            : date.dayOfWeek === 6
            ? "blue" // 토요일
            : "black",
        minHeight: Math.max(...eventBars.map((item) => item.row))
          ? Math.max(...eventBars.map((item) => item.row)) > 5
            ? `${
                150 + (Math.max(...eventBars.map((item) => item.row)) - 5) * 30
              }px`
            : "150px"
          : "150px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "90%",
          alignItems: "end",
          flexFlow: "wrap",
        }}
      >
        <div>{date.day}</div>
        <div style={{ fontSize: "0.8em", marginLeft: "5px" }}>
          {" "}
          {CheckingHoliday(date)
            ? `( ${CheckingHoliday(date).holidayName} )`
            : ""}
        </div>
      </div>
    </DayCell>
  ));
};

export default React.memo(NowCalendarCells);
