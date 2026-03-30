import React from "react";
import styled from "styled-components";
import DepartmentInfo from "./DepartmentInfo";
import UsersInfo from "./UsersInfo";
import AccessUsers from "./AccessUsers";

const SelectDepartmentMainDivBox = styled.div`
  .Menu_Container {
    ul {
      display: flex;
      flex-flow: wrap;
      padding-left: 20px;
      border-bottom: 1px solid lightgray;
      li {
        padding: 10px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .Content_Info_Container {
    display: flex;
    flex-flow: wrap;
    justify-content: center;
    width: 100%;
    .Content_Container {
      width: 40%;
      height: 50px;
      display: flex;
      align-items: center;
    }
  }
`;

const SelectDepartment = ({
  Select_Menus,
  setSelect_Menus,
  NowSelect,
  Department_State,
  Update_Mode,
  setUpdate_Mode,
  New_DepartMent_State,
  setNew_DepartMent_State,
  Add_Department_Data,
}) => {
  const SUBMENULIST = [
    {
      code: "user",
      label: "부서원 정보",
      clicks: () => setSelect_Menus("user"),
      component: (
        <UsersInfo
          Department_State={Department_State}
          NowSelect={NowSelect}
        ></UsersInfo>
      ),
    },
    {
      code: "access",
      label: "부서조회 권한",
      clicks: () => setSelect_Menus("access"),
      component: <AccessUsers NowSelect={NowSelect}></AccessUsers>,
    },
    {
      code: "company",
      label: "부서 정보",
      clicks: () => setSelect_Menus("company"),
      component: (
        <DepartmentInfo
          NowSelect={NowSelect}
          Update_Mode={Update_Mode}
          setUpdate_Mode={() => setUpdate_Mode(false)}
          New_DepartMent_State={New_DepartMent_State}
          setNew_DepartMent_State={(data) => setNew_DepartMent_State(data)}
          Add_Department_Data={() => Add_Department_Data()}
        ></DepartmentInfo>
      ),
    },
  ];

  return (
    <SelectDepartmentMainDivBox>
      <div className="Menu_Container">
        <ul>
          {SUBMENULIST.map((list) => {
            return (
              <li
                key={list.code}
                style={
                  list.code === Select_Menus
                    ? { borderBottom: "2px solid black" }
                    : {}
                }
                onClick={list.clicks}
              >
                <h4>{list.label}</h4>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="Content_Info_Container">
        {SUBMENULIST.find((item) => item.code === Select_Menus).component}
      </div>
    </SelectDepartmentMainDivBox>
  );
};

export default SelectDepartment;
