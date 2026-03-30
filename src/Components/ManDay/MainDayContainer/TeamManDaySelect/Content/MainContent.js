import React, { useState } from "react";
import styled from "styled-components";
import SelectWeekMainPage from "./SelectWeek/SelectWeekMainPage";
import SelectAllMainPage from "./SelectAll/SelectAllMainPage";
import StatisticMainPage from "./Statistic/StatisticMainPage";

const MainContentMainDivBox = styled.div`
  height: 100%;
  ul {
    display: flex;
    padding: 10px;
    padding-bottom: 0px;
    border-bottom: 1px solid lightgray;
    li {
      margin-right: 20px;
      font-weight: bolder;
      padding-bottom: 10px;
      padding-left: 10px;
      padding-right: 10px;
      color: gray;
    }
  }
`;
const MENU_LISTS = [
  {
    menuName: "금주 조회",
    menuCode: "selectWeek",
    Component: SelectWeekMainPage,
  },
  {
    menuName: "전체 조회",
    menuCode: "selectAll",
    Component: SelectAllMainPage,
  },
  { menuName: " 통 계 ", menuCode: "statistic", Component: StatisticMainPage },
];

const MainContent = () => {
  const [activeMenuCode, setActiveMenuCode] = useState("selectWeek");

  const ActiveMenu = MENU_LISTS.find(
    (item) => item.menuCode === activeMenuCode,
  );
  const ActiveComponent = ActiveMenu ? ActiveMenu.Component : null;

  return (
    <MainContentMainDivBox>
      <ul>
        {MENU_LISTS.map((list) => (
          <li
            key={list.menuCode}
            style={
              activeMenuCode === list.menuCode
                ? { borderBottom: "2px solid black", color: "black" }
                : {}
            }
            onClick={() => setActiveMenuCode(list.menuCode)}
          >
            {list.menuName}
          </li>
        ))}
      </ul>

      {ActiveComponent && <ActiveComponent />}
    </MainContentMainDivBox>
  );
};

export default MainContent;
