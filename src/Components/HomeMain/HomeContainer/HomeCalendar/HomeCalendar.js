import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import styled from "styled-components";
import { Request_Get_Axios } from "../../../../API";
import { useSelector } from "react-redux";

export const AnnualLeaveCalendarTableMainDivBox = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;
    th {
      background: #eff4fc;
      font-weight: 500;
      font-size: 0.9em;
      height: 40px !important;
    }
    th,
    td {
      position: relative; /* Make td relative so that absolute positioned elements within it are relative to it */
      border: 1px solid lightgray;
      vertical-align: top;
      height: 180px; /* td height */
    }
    .Telecommuting_Table_nextMonth {
      background-color: #efefef;
      color: #c9c9c9 !important;
    }
    .Telecommuting_Table_nowMonth,
    .Telecommuting_Table_nextMonth,
    .Telecommuting_table_today {
      width: 14%;
      position: relative;
    }
    .Telecommuting_table_today {
      background-color: pink;
    }
    .Calendar_Bar_Container {
      position: absolute; /* Now positioning relative to the td */
      top: 30px; /* Position at the bottom of the td */
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: auto;
    }
    .Calendar_Bar {
      position: absolute;
      background-color: #368;
      margin-bottom: 3px;
      width: 100%;
      z-index: 1; /* Ensures that the bars stack on top of each other */
      font-size: 0.7em;
      text-align: center;
      box-shadow: 1px 0px 0px 1px lightgray;
      overflow: hidden;
      :hover {
        cursor: pointer;
        opacity: 0.7;
      }
    }
  }
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

const HomeCalendar = () => {
  const Login_Info = useSelector(
    (state) => state.Login_Info_Reducer_State.Login_Info
  );
  const [getMoment, setGetMoment] = useState(moment());
  const [Adata, setAdata] = useState([]);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const tdRefs = useRef(new Map());
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const Change_Color_State = async () => {
    const Getting_PIMS_Data = await Request_Get_Axios(
      "/Ce_Route/Tools/Getting_PIMS_Select",
      { id: Login_Info.id }
    );
    if (Getting_PIMS_Data.status) {
      setAdata(Getting_PIMS_Data.data);
    }
  };

  useEffect(() => {
    Change_Color_State();
  }, []);

  const today = getMoment;
  const firstWeek = today.clone().startOf("month").week();
  const lastWeek =
    today.clone().endOf("month").week() === 1
      ? 53
      : today.clone().endOf("month").week();

  const getBarElements = (date, tdIndex) => {
    let events = Adata.filter((event) =>
      moment(date).isBetween(event.start_date, event.end_date, null, "[]")
    );

    if (events.length === 0) return null;

    let activeEvents = [];
    let currentTopLevels = [];

    // ✅ 각 날짜별로 표시된 title을 관리하는 객체
    let shownTitlesByDate = {};

    // ✅ start_date 기준 정렬 + end_date 고려하여 정렬
    events.sort(
      (a, b) =>
        new Date(a.start_date) - new Date(b.start_date) ||
        new Date(a.end_date) - new Date(b.end_date)
    );

    return (
      <div className="Calendar_Bar_Container">
        {events.map((event) => {
          const start = moment(event.start_date);
          const end = moment(event.end_date);
          const isStart = start.format("YYYY-MM-DD") === date;
          const isEnd = end.format("YYYY-MM-DD") === date;

          // ✅ 현재 날짜에서 끝난 이벤트는 제거하여 자리 확보
          activeEvents = activeEvents.filter((activeEvent) =>
            moment(date).isBetween(
              activeEvent.start_date,
              activeEvent.end_date,
              null,
              "[]"
            )
          );

          // ✅ 동일 날짜에서 여러 이벤트가 있을 때, 각 이벤트에 고유한 top 값을 할당
          let newTop = 0;

          // ✅ 해당 날짜에 겹치는 이벤트의 `top` 값을 조정
          let overlapCount = 0; // 겹치는 이벤트 수

          while (currentTopLevels.includes(newTop)) {
            newTop += 25; // 간격을 띄워서 겹치지 않도록
            overlapCount++;
          }

          // ✅ 새로운 `top` 값을 등록
          currentTopLevels.push(newTop);

          // ✅ 해당 날짜에서 이미 표시된 title을 확인하고, 중복된 title은 표시하지 않음
          let showTitle =
            !shownTitlesByDate[date] ||
            !shownTitlesByDate[date].has(event.title);

          if (showTitle) {
            if (!shownTitlesByDate[date]) {
              shownTitlesByDate[date] = new Set();
            }
            shownTitlesByDate[date].add(event.title);
          }

          return (
            <div
              key={event.index}
              className="Calendar_Bar"
              style={{
                top: `${newTop}px`,
                height: "18px",
                backgroundColor: event.color,
                borderTopLeftRadius: isStart ? "5px" : "0px",
                borderBottomLeftRadius: isStart ? "5px" : "0px",
                borderTopRightRadius: isEnd ? "5px" : "0px",
                borderBottomRightRadius: isEnd ? "5px" : "0px",
                color: "black",
                fontWeight: "bolder",
              }}
              onMouseEnter={(e) => handleMouseEnter(e, event, tdIndex)}
              onMouseLeave={handleMouseLeave}
            >
              {isStart ? event.title : null}
            </div>
          );
        })}
      </div>
    );
  };

  const handleMouseEnter = (e, event, tdIndex) => {
    const barElement = e.currentTarget;

    if (!barElement) {
      return;
    }

    requestAnimationFrame(() => {
      const barRect = barElement.getBoundingClientRect();

      const containerRect = document
        .querySelector(".AnnualLeaveCalendarTableMainDivBox")
        .getBoundingClientRect();

      let popupX = barRect.left;
      let popupY = barRect.bottom + document.documentElement.scrollTop;

      if (popupX + 150 > containerRect.width) {
        popupX -= 150;
      }

      setHoveredEvent(event);
      setPopupPosition({ x: popupX, y: popupY });
    });
  };

  const handleMouseLeave = () => {
    setHoveredEvent(null);
  };
  const calendar = () => {
    let result = [];
    let week = firstWeek;
    for (week; week <= lastWeek; week++) {
      result = result.concat(
        <tr key={week} className="row">
          {Array(7)
            .fill(0)
            .map((_, index) => {
              let days = today
                .clone()
                .startOf("year")
                .week(week)
                .startOf("week")
                .add(index, "day");
              if (!tdRefs.current[index])
                tdRefs.current[index] = React.createRef();
              const tdIndex = `${week}-${index}`; // ✅ 여기서 일관되게 tdIndex 설정
              return (
                <td
                  ref={(el) => tdRefs.current.set(tdIndex, el)}
                  key={index}
                  className={
                    moment().format("YYYY-MM-DD") === days.format("YYYY-MM-DD")
                      ? "Telecommuting_table_today"
                      : days.format("MM") !== today.format("MM")
                      ? "Telecommuting_Table_nextMonth"
                      : "Telecommuting_Table_nowMonth"
                  }
                >
                  <div className="Telecommuting_Table_dayNumber">
                    <div style={{ paddingLeft: "5px" }}>{days.format("D")}</div>
                  </div>
                  {getBarElements(days.format("YYYY-MM-DD"), tdIndex)}{" "}
                  {/* ✅ 수정된 부분 */}
                </td>
              );
            })}
        </tr>
      );
    }
    return result;
  };

  return (
    <div>
      <AnnualLeaveCalendarTableMainDivBox>
        <table className="AnnualLeaveCalendarTableMainDivBox">
          <thead>
            <tr>
              {["일", "월", "화", "수", "목", "금", "토"].map((el) => (
                <th key={el}>
                  <span>{el}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{calendar()}</tbody>
        </table>
      </AnnualLeaveCalendarTableMainDivBox>
    </div>
  );
};

export default HomeCalendar;
