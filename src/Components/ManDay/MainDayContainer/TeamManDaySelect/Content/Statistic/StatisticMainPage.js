import React, { useState } from "react";
import PersonMainPage from "./Person/PersonMainPage";
import CompanyMainPage from "./Company/CompanyMainPage";
import EquipmentsMainPage from "./Equipments/EquipmentsMainPage";
import TeamMainPage from "./Team/TeamMainPage";
import SalaryMainPage from "./Salary/SalaryMainPage";

const MENU_LISTS = [
  {
    menuName: "인원",
    menuCode: "Person",
    Component: <PersonMainPage menuCode="Person" />,
  },
  {
    menuName: "회사",
    menuCode: "Company",
    Component: <CompanyMainPage menuCode="Company" />,
  },
  {
    menuName: "장비 공수정보",
    menuCode: "Equipments",
    Component: <EquipmentsMainPage menuCode="Equipments" />,
  },
  {
    menuName: "장비 인건비",
    menuCode: "Salary",
    Component: <SalaryMainPage menuCode="Salary"></SalaryMainPage>,
  },
  {
    menuName: "팀,파트",
    menuCode: "Team",
    Component: <TeamMainPage menuCode="Team" />,
  },
];

const StatisticMainPage = () => {
  const [activeMenuCode, setActiveMenuCode] = useState("Person");
  const ActiveMenu = MENU_LISTS.find(
    (item) => item.menuCode === activeMenuCode,
  );
  const ActiveComponent = ActiveMenu ? ActiveMenu.Component : null;
  return (
    <div>
      <ul>
        {MENU_LISTS.map((list) => {
          return (
            <li
              onClick={() => setActiveMenuCode(list.menuCode)}
              style={
                activeMenuCode === list.menuCode
                  ? { borderBottom: "2px solid black", color: "black" }
                  : {}
              }
              key={list.menuCode}
            >
              {list.menuName}
            </li>
          );
        })}
      </ul>
      {ActiveComponent}
    </div>
  );
};

export default StatisticMainPage;
