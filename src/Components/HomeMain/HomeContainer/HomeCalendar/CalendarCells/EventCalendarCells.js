import React, { useEffect } from "react";
import styled from "styled-components";

const EventBar = styled.div`
  position: absolute;
  /* Bar 간격 */
  /* top: ${({ top, row, isMaxRows }) =>
    `${
      (top - 1) *
        (isMaxRows ? (isMaxRows > 5 ? isMaxRows - 5 * 30 + 150 : 150) : 150) +
      30 +
      (row + 1) * 22
    }px`}; */
  top: ${(props) => calcTop(props)};
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
    cursor: pointer;
    opacity: 0.8;
  }
`;

const calcTop = ({ top, row, isMaxRows }) => {
  const baseRowHeight = 22;
  const baseTop = 30;

  let heightPerRow = 150;

  if (isMaxRows) {
    if (isMaxRows > 5) {
      heightPerRow = (isMaxRows - 5) * 30 + 150;
    }
  }

  return `${(top - 1) * heightPerRow + baseTop + (row + 1) * baseRowHeight}px`;
};
const EventCalendarCells = ({
  eventBars = [],
  handleMouseEnter,
  handleMouseLeave,
  EventType,
  OnClickEventData,
}) => {
  let MaxRows = Math.max(...eventBars.map((item) => item.row));
  useEffect(() => {
    MaxRows = Math.max(...eventBars.map((item) => item.row));
  }, [eventBars]);
  return eventBars.map((bar, idx) => (
    <EventBar
      key={idx}
      top={bar.top}
      left={bar.left}
      width={bar.width}
      row={bar.row}
      onMouseEnter={(e) => handleMouseEnter(e, bar, idx)}
      onMouseLeave={handleMouseLeave}
      isMaxRows={MaxRows ? MaxRows : 1}
    >
      <div
        onClick={(e) => {
          e.preventDefault();
          if (EventType === "MealSettlement") OnClickEventData(bar);
          else if (EventType === "SiteAllowance") OnClickEventData(bar);
        }}
      >{`${bar.sub_depart} ${bar.divideCode} ${bar.manDay.toFixed(1)}`}</div>
    </EventBar>
  ));
};

export default React.memo(EventCalendarCells);
