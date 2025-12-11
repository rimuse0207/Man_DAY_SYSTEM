import React from "react";

const HoverEventView = ({ popupPosition, hoveredEvent, EventType }) => {
  const RenderingChecking = () => {
    switch (EventType) {
      case "Home":
        return HomeHoverEvnetView();
      case "MealSettlement":
        return MealHoverEventView();
      case "SiteAllowance":
        return <div></div>;
      default:
        return <div></div>;
    }
  };

  /// Main Home 일정 등록
  const HomeHoverEvnetView = () => {
    return (
      <div
        className="Popup show"
        style={{
          position: "absolute",
          top: `${popupPosition.y}px`,
          left: `${popupPosition.x}px`,
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>{hoveredEvent.Code}</h2>
        <table>
          <thead>
            <tr>
              <th style={{ width: "150px" }}> 설 비 군 </th>
              <td>{hoveredEvent.depart}</td>
            </tr>
            <tr>
              <th style={{ width: "150px" }}> 설 비 명 </th>
              <td>{hoveredEvent.sub_depart}</td>
            </tr>
            <tr>
              <th style={{ width: "150px" }}> 구분 항목 </th>
              <td>{hoveredEvent.divideCode}</td>
            </tr>
            <tr>
              <th style={{ width: "150px" }}> Man-day(시간) </th>
              <td>{hoveredEvent.manDay} </td>
            </tr>
          </thead>
        </table>
      </div>
    );
  };

  /// 식대 정산
  const MealHoverEventView = () => {
    return (
      <div
        className="Popup show"
        style={{
          position: "absolute",
          top: `${popupPosition.y}px`,
          left: `${popupPosition.x}px`,
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>{hoveredEvent.division}</h2>
        <table>
          <tbody>
            <tr>
              <th>일자</th>
              <td>{hoveredEvent.dates}</td>
            </tr>
            <tr>
              <th>지출 금액</th>
              <td>{hoveredEvent.spending.toLocaleString()} 원</td>
            </tr>
            <tr>
              <th>지역 및 방문처</th>
              <td>
                {hoveredEvent.location} {hoveredEvent.place}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return RenderingChecking();
};

export default HoverEventView;
