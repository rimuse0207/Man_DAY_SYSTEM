import React, { useEffect, useState } from "react";
import { Request_Get_Axios, Request_Post_Axios } from "../../../API";
import ParentTree from "./TreeMenu/ParentTree";
import styled from "styled-components";
import SelectDepartment from "./Contents/SelectDepartment";
import { toast } from "../../ToastMessage/ToastManager";
import Select from "react-select";
import { Change_User_Search_Reducer } from "../../../Models/UserSearchReducer/UserSearchReducer";
import { useDispatch, useSelector } from "react-redux";
import UserHeader from "../Public/UserHeader";
import { useApi } from "../../Common/Hooks/useApi";
import { API_CONFIG } from "../../../API/config";

export const DepartmentMainPageMainDivBox = styled.div`
  .All_Container {
    height: calc(100vh - 160px);
    display: flex;
    flex-flow: wrap;
    .Left_Content {
      border-right: 1px solid lightgray;
      border-left: 1px solid lightgray;
      width: 20%;
      padding: 10px;
      height: calc(100vh - 160px);
      overflow: auto;
      .Button_Containers {
        text-align: end;
        position: sticky;
        top: 0px;
        width: 100%;
        display: flex;
      }
      button {
        border: 1px solid lightgray;
        padding: 5px;
        border-radius: 5px;
        background-color: #fff;
        padding-left: 10px;
        padding-right: 10px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .Right_Content {
      padding-right: 10px;
      /* float: right; */
      width: 80%;
      height: 100%;
      /* overflow: auto; */
    }
  }
`;
const customStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: "40px",
    height: "40px",
    fontSize: "12px",
    padding: "0 4px",
    display: "flex",
    alignItems: "center",
    lineHeight: "1.2",
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: "40px",
    padding: "0 4px",
    display: "flex",
    alignItems: "center",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "40px",
    display: "flex",
    alignItems: "center",
  }),
  singleValue: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    lineHeight: "1.2",
  }),
  option: (provided) => ({
    ...provided,
    fontSize: "12px",
    padding: "6px 8px",
    lineHeight: "1.5",
  }),
};

export const findItemByCode = (nodes, targetCode) => {
  for (const node of nodes) {
    if (node.itemCode === targetCode) {
      return node;
    }
    if (node.children && node.children.length > 0) {
      const found = findItemByCode(node.children, targetCode);
      if (found) return found;
    }
  }
  return null;
};

const DepartmentMainPage = () => {
  const dispatch = useDispatch();
  const SearchInfo = useSelector(
    (state) => state.Change_User_Search_Reducer_State,
  );
  const [Department_State, setDepartment_State] = useState([]);
  const [NowSelect, setNowSelect] = useState(null);
  const [Select_Menus, setSelect_Menus] = useState("user");
  const [Update_Mode, setUpdate_Mode] = useState(false);
  const [New_DepartMent_State, setNew_DepartMent_State] = useState("");
  const [Search_User_Name, setSearch_User_Name] = useState(null);
  const [User_Select_Options, setUser_Select_Options] = useState([]);

  const { request: getDepartmentList } = useApi(
    API_CONFIG.UserAPI.GET_DEPARTMENT,
  );
  const { request: addDepartment } = useApi(API_CONFIG.UserAPI.ADD_DEPARTMENT);

  //부서 조회
  const initFunc = () => {
    getDepartmentList(
      { SearchInfo },
      {
        onSuccess: (data) => {
          setDepartment_State(data.Change_Tree_State);
          setUser_Select_Options(data.Change_User_Options);
        },
      },
    );
  };
  useEffect(() => {
    initFunc();
  }, [SearchInfo, getDepartmentList]);

  // 부서 추가
  const Add_Department_Data = async () => {
    addDepartment(
      { New_DepartMent_State, NowSelect },
      {
        onSuccess: () => {
          toast.show({
            title: `${New_DepartMent_State}의 부서를 추가하였습니다.`,
            successCheck: true,
            duration: 6000,
          });
          setUpdate_Mode(false);
          initFunc();
          setNew_DepartMent_State("");
        },
      },
    );
  };

  const HandleChange_UserSearchStart = (e) => {
    e.preventDefault();

    if (Search_User_Name) {
      dispatch(Change_User_Search_Reducer(Search_User_Name.value));
      setNowSelect(findItemByCode(Department_State, Search_User_Name.codes));
    }
  };

  return (
    <DepartmentMainPageMainDivBox>
      <UserHeader
        title={"부서"}
        subDescript={"부서 정보를 조회/관리할 수 있습니다."}
      ></UserHeader>
      <div className="All_Container">
        <div className="Left_Content">
          <form onSubmit={(e) => HandleChange_UserSearchStart(e)}>
            {Select_Menus === "user" && (
              <div className="Button_Containers">
                <div style={{ width: "calc(100% - 60px)", textAlign: "start" }}>
                  <Select
                    styles={customStyles}
                    value={Search_User_Name}
                    onChange={(e) => {
                      setSearch_User_Name(e);
                    }}
                    isClearable
                    options={User_Select_Options}
                    placeholder="선택 해 주세요."
                  ></Select>
                </div>
                <button
                  style={{ width: "55px" }}
                  onClick={(e) => HandleChange_UserSearchStart(e)}
                >
                  {" "}
                  검 색{" "}
                </button>
              </div>
            )}
          </form>
          <ParentTree
            TreeMenu={Department_State}
            setDepartment_State={(data) => setDepartment_State(data)}
            NowSelect={NowSelect}
            setNowSelect={(data) => setNowSelect(data)}
          ></ParentTree>
        </div>
        <div className="Right_Content">
          <SelectDepartment
            New_DepartMent_State={New_DepartMent_State}
            setNew_DepartMent_State={(data) => setNew_DepartMent_State(data)}
            Update_Mode={Update_Mode}
            setUpdate_Mode={() => setUpdate_Mode(false)}
            Department_State={Department_State}
            setDepartment_State={(data) => setDepartment_State(data)}
            Select_Menus={Select_Menus}
            setSelect_Menus={(data) => setSelect_Menus(data)}
            NowSelect={NowSelect}
            Add_Department_Data={() => Add_Department_Data()}
          ></SelectDepartment>
        </div>
      </div>
    </DepartmentMainPageMainDivBox>
  );
};

export default DepartmentMainPage;
