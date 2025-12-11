import React, { useRef, useState } from "react";
import styled from "styled-components";
import ScheduleRegistration from "./ScheduleRegistration/ScheduleRegistration";
import moment from "moment";
import WeekCalendarCells from "./CalendarCells/WeekCalendarCells";
import NowCalendarCells from "./CalendarCells/NowCalendarCells";
import EventCalendarCells from "./CalendarCells/EventCalendarCells";
import { useCalendarEventHooks } from "./CalendarEventHooks/CalendarEventHooks";
import HoverEventView from "./HoverEventView";
import CalendarModal from "./CalendarModal/CalendarModal";

const CalendarWrapper = styled.div`
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
    table {
      width: 100%;
      th {
        text-align: start;
        width: 40%;
        padding: 5px;
      }
      td {
        width: 60%;
        padding: 5px;
      }
    }
  }
`;

const CalendarHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Button = styled.button`
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

const CalendarGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: auto;
  background-color: #ddd;
  position: relative;
`;

const DayCell = styled.div`
  min-height: ${({ isHeader }) => (isHeader ? "30px" : `${150}px`)};
  /* min-height: ${({ isHeader, dynamicHeight }) =>
    isHeader ? "30px" : `${150 + dynamicHeight * 10}px`}; */
  padding: 5px;
  background-color: ${({ isCurrentMonth }) =>
    isCurrentMonth ? "white" : "#f0f0f0"};
  color: ${({ isCurrentMonth }) => (isCurrentMonth ? "black" : "#aaa")};
  /* display: flex; */
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 12px;
  font-weight: bold;
  border: 1px solid #ddd;
  position: relative;
`;

const EventBar = styled.div`
  /* position: absolute; */
  /* Bar 간격 */
  /* top: ${({ top, row }) => `${top + row * 22 - 90}px`};
    left: ${({ left }) => `${left}%`};
    width: ${({ width }) => `${width}%`}; */
  width: 100%;
  height: 18px;
  margin-top: 2px;
  background-color: rgba(255, 87, 34, 0.8);
  border-radius: 5px;
  /* display: flex;
    align-items: center;
    justify-content: center; */
  line-height: 18px;
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  overflow: hidden;
  font-size: 10px;
  color: white;
  font-weight: bold;
  &:hover {
    /* cursor: pointer; */
    opacity: 0.8;
  }
`;

const Calendar = ({
  year,
  month,
  Select_Month_UI,
  events,
  Change_Color_State,
  EventType,
}) => {
  const { hoveredEvent, popupPosition, handleMouseEnter, handleMouseLeave } =
    useCalendarEventHooks();
  const [ChooseDate, setChooseDate] = useState(moment().format("YYYY-MM-DD"));
  const [Selected_Data, setSelected_Data] = useState(null);
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const [ScheduleRegistrationIsModalOpen, setScheduleRegistrationIsModalOpen] =
    useState(false);

  const startDay = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  const prevDaysInMonth = prevLastDay.getDate();

  const daysOfWeek = [
    { label: "일", color: "red" },
    { label: "월", color: "black" },
    { label: "화", color: "black" },
    { label: "수", color: "black" },
    { label: "목", color: "black" },
    { label: "금", color: "black" },
    { label: "토", color: "blue" },
  ];
  const days = [];

  for (let i = startDay - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, prevDaysInMonth - i);
    days.push({
      day: prevDaysInMonth - i,
      isCurrentMonth: false,
      dayOfWeek: date.getDay(),
      date: moment(date).format("YYYY-MM-DD"),
    });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    days.push({
      day: i,
      isCurrentMonth: true,
      dayOfWeek: date.getDay(),
      date: moment(date).format("YYYY-MM-DD"),
    });
  }
  while (days.length % 7 !== 0) {
    const date = new Date(
      year,
      month + 1,
      days.length - daysInMonth - startDay + 1
    );
    days.push({
      day: days.length - daysInMonth - startDay + 1,
      isCurrentMonth: false,
      dayOfWeek: date.getDay(),
      date: moment(date).format("YYYY-MM-DD"),
    });
  }

  const eventLayers = {};

  const eventBars = events.flatMap((event) => {
    const startDate = new Date(event.start_date);
    const endDate = new Date(event.end_date);

    if (
      (startDate.getFullYear() !== year && endDate.getFullYear() !== year) ||
      (startDate.getMonth() > month && endDate.getMonth() > month) ||
      (startDate.getMonth() < month && endDate.getMonth() < month)
    ) {
      return [];
    }

    const startIndex =
      startDate.getMonth() < month ? 0 : startDate.getDate() + startDay - 1;
    const endIndex =
      endDate.getMonth() > month
        ? days.length - 1
        : endDate.getDate() + startDay - 1;

    let row = 0;
    for (let i = startIndex; i <= endIndex; i++) {
      if (eventLayers[i] !== undefined && eventLayers[i] >= row) {
        row = eventLayers[i] + 1;
      }
    }

    for (let i = startIndex; i <= endIndex; i++) {
      eventLayers[i] = row;
    }

    const bars = [];
    let weekStart = Math.floor(startIndex / 7) * 7;
    let currentStart = startIndex;

    while (currentStart <= endIndex) {
      const weekEnd = Math.min(weekStart + 6, endIndex);
      bars.push({
        ...event,
        top: Math.floor(currentStart / 7) + 1,
        left: ((currentStart % 7) / 7) * 100,
        width: (((weekEnd % 7) - (currentStart % 7) + 1) / 7) * 100,
        row: row,
      });
      weekStart += 7;
      currentStart = weekStart;
    }

    return bars;
  });

  const HandleAddSchedule = (day_info) => {
    if (EventType === "Home") {
      setChooseDate(`${year}-${month + 1}-${day_info.day}`);
      setScheduleRegistrationIsModalOpen(true);
    } else if (EventType === "SiteAllowance") {
      setChooseDate(`${year}-${month + 1}-${day_info.day}`);
      setScheduleRegistrationIsModalOpen(true);
    }
  };

  const OnClickEventData = (Select_Datas) => {
    setSelected_Data(Select_Datas);
    setScheduleRegistrationIsModalOpen(true);
  };

  return (
    <div>
      <CalendarWrapper className="AnnualLeaveCalendarTableMainDivBox">
        {Select_Month_UI()}
        <CalendarGrid>
          <WeekCalendarCells daysOfWeek={daysOfWeek}></WeekCalendarCells>
          <NowCalendarCells
            days={days}
            HandleAddSchedule={(data) => HandleAddSchedule(data)}
            eventBars={eventBars}
          ></NowCalendarCells>
          <EventCalendarCells
            eventBars={eventBars}
            handleMouseEnter={(e, data, id) => handleMouseEnter(e, data, id)}
            handleMouseLeave={handleMouseLeave}
            EventType={EventType}
            OnClickEventData={(data) => OnClickEventData(data)}
          ></EventCalendarCells>
          {hoveredEvent && (
            <HoverEventView
              popupPosition={popupPosition}
              hoveredEvent={hoveredEvent}
              EventType={EventType}
            ></HoverEventView>
          )}
        </CalendarGrid>
      </CalendarWrapper>
    </div>
  );
};

export default Calendar;
