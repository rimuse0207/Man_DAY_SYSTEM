import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import ScheduleRegistration from './ScheduleRegistration/ScheduleRegistration';
import moment from 'moment';

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
    min-height: ${({ isHeader }) => (isHeader ? '30px' : `${150}px`)};
    /* min-height: ${({ isHeader, dynamicHeight }) => (isHeader ? '30px' : `${150 + dynamicHeight * 10}px`)}; */
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

const EventBar = styled.div`
    position: absolute;
    top: ${({ top, row }) => `${top + row * 22 - 90}px`}; /* Bar 간격 */
    left: ${({ left }) => `${left}%`};
    width: ${({ width }) => `${width}%`};
    height: 18px;
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

const Calendar = ({ year, month, onMonthChange, events, Change_Color_State }) => {
    const [hoveredEvent, setHoveredEvent] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    const [ChooseDate, setChooseDate] = useState(moment().format('YYYY-MM-DD'));
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const [ScheduleRegistrationIsModalOpen, setScheduleRegistrationIsModalOpen] = useState(false);

    const startDay = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();
    const prevDaysInMonth = prevLastDay.getDate();

    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const days = [];

    for (let i = startDay - 1; i >= 0; i--) {
        days.push({ day: prevDaysInMonth - i, isCurrentMonth: false });
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push({ day: i, isCurrentMonth: true });
    }
    while (days.length % 7 !== 0) {
        days.push({ day: days.length - daysInMonth - startDay + 1, isCurrentMonth: false });
    }

    const eventLayers = {};

    const eventBars = events.flatMap(event => {
        const startDate = new Date(event.date);
        const endDate = new Date(event.date);

        if (
            (startDate.getFullYear() !== year && endDate.getFullYear() !== year) ||
            (startDate.getMonth() > month && endDate.getMonth() > month) ||
            (startDate.getMonth() < month && endDate.getMonth() < month)
        ) {
            return [];
        }

        const startIndex = startDate.getMonth() < month ? 0 : startDate.getDate() + startDay - 1;
        const endIndex = endDate.getMonth() > month ? days.length - 1 : endDate.getDate() + startDay - 1;

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
                top: (Math.floor(currentStart / 7) + 1) * 150,
                left: ((currentStart % 7) / 7) * 100,
                width: (((weekEnd % 7) - (currentStart % 7) + 1) / 7) * 100,
                row: row,
            });
            weekStart += 7;
            currentStart = weekStart;
        }

        return bars;
    });

    const handleMouseEnter = (e, event, index) => {
        const parentElement = e.currentTarget.closest('.AnnualLeaveCalendarTableMainDivBox'); // 부모 요소 찾기
        if (!parentElement) return;

        const parentRect = parentElement.getBoundingClientRect(); // 부모 요소 위치 정보 가져오기
        let popupX = e.clientX - parentRect.left + parentElement.scrollLeft; // 화면 기준 X 좌표
        let popupY = e.clientY - parentRect.top + parentElement.scrollTop - 30; // 부모 요소 내 Y 좌표

        // 금요일(5) 또는 토요일(6)일 때 왼쪽으로 이동
        if (e.clientX >= 1200) {
            popupX -= 270; // 왼쪽으로 이동
        }

        // 4번째 주(3) 이상이면 위로 이동
        if (e.clientY >= 300) {
            popupY -= 170; // 위로 이동
        }

        setHoveredEvent(event);
        setPopupPosition({ x: popupX, y: popupY });
    };

    const handleMouseLeave = () => {
        setHoveredEvent(null);
    };

    const HandleAddSchedule = day_info => {
        setChooseDate(`${year}-${month + 1}-${day_info.day}`);
        setScheduleRegistrationIsModalOpen(true);
    };

    const Getting_Max_Row = Event_Bars => {
        const maxObjArr = Event_Bars.reduce((prev, value) => {
            return prev >= value.row ? prev : value.row;
        });
    };

    return (
        <div>
            <CalendarWrapper className="AnnualLeaveCalendarTableMainDivBox">
                <CalendarHeader>
                    <Button onClick={() => onMonthChange(-1)}>〈 이전 달</Button>
                    <h3>
                        {year}년 {month + 1}월
                    </h3>
                    <Button onClick={() => onMonthChange(1)}>다음 달 〉</Button>
                </CalendarHeader>
                <CalendarGrid>
                    {daysOfWeek.map(day => (
                        <DayCell
                            key={day}
                            isCurrentMonth={true}
                            isHeader={true}
                            style={{ justifyContent: 'center', alignItems: 'center' }}
                            dynamicHeight={Math.max(0, ...eventBars.map(o => o.row))}
                        >
                            {day}
                        </DayCell>
                    ))}
                    {days.map((date, index) => (
                        <DayCell
                            key={index}
                            isCurrentMonth={date.isCurrentMonth}
                            // onClick={() => HandleAddSchedule(date)}
                            dynamicHeight={Math.max(0, ...eventBars.map(o => o.row))}
                        >
                            {date.day}
                        </DayCell>
                    ))}
                    {eventBars.map((bar, idx) => (
                        <EventBar
                            key={idx}
                            top={bar.top}
                            left={bar.left}
                            width={bar.width}
                            row={bar.row}
                            onMouseEnter={e => handleMouseEnter(e, bar, idx)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {bar.sub_depart} {bar.divideCode} {bar.manDay.toFixed(1)}
                        </EventBar>
                    ))}
                    {hoveredEvent && (
                        <div
                            className="Popup show"
                            style={{
                                position: 'absolute',
                                top: `${popupPosition.y}px`,
                                left: `${popupPosition.x}px`,
                            }}
                        >
                            <h2 style={{ marginBottom: '10px' }}>{hoveredEvent.date} Man_day</h2>
                            {/* <strong>{hoveredEvent.title}</strong> */}
                            {/* <div style={{ paddingTop: 'px' }}></div> */}
                            <table>
                                <tbody>
                                    <tr>
                                        <th>상위 설비명</th>
                                        <td>{hoveredEvent.depart}</td>
                                    </tr>
                                    <tr>
                                        <th>설 비 명</th>
                                        <td>{hoveredEvent.sub_depart}</td>
                                    </tr>
                                    <tr>
                                        <th>구분 항목</th>
                                        <td>{hoveredEvent.divideCode}</td>
                                    </tr>
                                    <tr>
                                        <th>Man_day</th>
                                        <td>{hoveredEvent.manDay.toFixed(1)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </CalendarGrid>
            </CalendarWrapper>
            {ScheduleRegistrationIsModalOpen ? (
                <ScheduleRegistration
                    ChooseDate={ChooseDate}
                    ScheduleRegistrationIsModalOpen={ScheduleRegistrationIsModalOpen}
                    setScheduleRegistrationIsModalOpen={() => setScheduleRegistrationIsModalOpen(false)}
                    Change_Color_State={() => Change_Color_State()}
                ></ScheduleRegistration>
            ) : (
                ''
            )}
        </div>
    );
};

export default Calendar;
