import moment from "moment";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { getWeekOfMonth } from "../../../CommonFunc/CommonFunc";
import styled from "styled-components";
import UserListsComponent from "./Left/UserLists";
import ManDaySelect from "./Right/SelectMode/ManDaySelect";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";
import UpdateModeMainPage from "./Right/UpdateMode/UpdateModeMainPage";
import ManDayInsertMode from "./Right/InsertMode/ManDayInsertMode";
import { Man_Day_Select_Option_fetchData } from "../../../../../../Models/ReduxThunks/ManDaySelectOptionReducer";
import { useApi } from "../../../../../Common/Hooks/useApi";
import { API_CONFIG } from "../../../../../../API/config";
import { accessCheck } from "../../../../../Common/Utils/ManDay/sortingOptions";

export const MyListMainDivBox = styled.div`
  width: 300px;
  height: 80px;
  margin-right: 20px;
  .Sub_Box {
    background-color: #056ac9;
    border-radius: 10px;
    color: white;
    font-size: 1.2em;
    text-align: center;
    font-weight: bolder;
    height: 80px;
    .Float_Container {
      height: 80px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      ::after {
        display: block;
        content: "";
        clear: both;
      }
    }
    .Float_Left {
      float: left;
      width: 80px;
      font-size: 2.5em;
    }
    .Float_Right {
      float: right;
      width: calc(100%-80px);
      :first-child {
        font-size: 0.9em;
      }
      :nth-child(2) {
        font-size: 1.5em;
      }
    }
    .Sub_Descript_Container {
      border-top: 1px solid lightgray;
      font-size: 0.8em;
      padding-top: 10px;
      font-weight: light;
    }
  }
`;
const SelectWeekMainPageMainDivBox = styled.div`
  height: calc(100vh - 145px);
  overflow: auto;
  .GetWeekOfMonth_Container {
    margin-top: 20px;
    margin-bottom: 20px;
    .AminOnlyArrow {
      display: flex;
      align-items: center;
      .Icon_Containers {
        margin-right: 10px;
        font-size: 2em;
        &:hover {
          cursor: pointer;
          color: gray;
        }
      }
    }
    .Title {
      font-size: 1.7em;
      font-weight: bolder;
    }
  }
  .Left_Right_Containers {
    display: flex;
    flex-wrap: wrap;
    .Left_Container {
      width: 300px;
      padding-right: 10px;
      border-right: 1px solid lightgray;
      height: calc(100vh - 31vh);
      overflow: auto;
    }
    .Right_Container {
      width: calc(100% - 300px);
      padding-left: 10px;
      height: calc(100vh - 31vh);
      overflow: auto;
    }
  }

  .Status_Board_Container {
    li {
      border: 1px solid lightgray;
    }
  }
  .Mode_Button_Containers {
    text-align: end;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-right: 20px;
    button {
      border: 1px solid lightgray;
      padding: 8px 10px;
      background-color: #fff;
      border-radius: 5px;
      margin-left: 20px;
      font-weight: bolder;
      &:hover {
        cursor: pointer;
        background-color: #efefee;
      }
    }
  }
`;

const SelectWeekMainPage = () => {
  const dispatch = useDispatch();

  const todayDate = moment().startOf("isoWeek").format("YYYY-MM-DD");

  const [nowDate, setNowDate] = useState(todayDate);
  const [userLists, setUserLists] = useState([]);
  const [nowSelectUser, setNowSelectUser] = useState(null);
  const [selectMode, setSelectMode] = useState("reading");

  const loginInfo = useSelector(
    (state) => state.Login_Info_Reducer_State.Login_Info,
  );
  const hasAccess = accessCheck(loginInfo);

  const nextDate = moment()
    .add(7, "days")
    .startOf("isoWeek")
    .format("YYYY-MM-DD");

  const { request: getTeamMember } = useApi(
    API_CONFIG.TeamLeaderAPI.GET_TEAM_MEMBER_LIST,
  );

  const fetchTeamMembers = useCallback(() => {
    getTeamMember(
      { NowDate: nowDate },
      {
        onSuccess: (data) => {
          setUserLists(data);

          if (nowSelectUser) {
            const updatedUser = data?.find(
              (item) => item.email === nowSelectUser.email,
            );
            setNowSelectUser(updatedUser || null);
            setSelectMode("reading");
          }
        },
      },
    );
  }, [nowDate, nowSelectUser, getTeamMember]);

  useEffect(() => {
    fetchTeamMembers();
    dispatch(Man_Day_Select_Option_fetchData());
  }, [nowDate]);

  const handleChangeDate = (direction) => {
    setNowDate((prev) =>
      moment(prev)
        [direction === "minus" ? "subtract" : "add"](7, "days")
        .startOf("isoWeek")
        .format("YYYY-MM-DD"),
    );
    setSelectMode("reading");
  };

  const totalCount = userLists.length;
  const inputtedCount = userLists.filter(
    (item) => item.man_day_infos?.length > 0,
  ).length;
  const missingCount = totalCount - inputtedCount;

  const renderRightContent = () => {
    if (!hasAccess) {
      return <ManDaySelect Now_Select_User={nowSelectUser} NowDate={nowDate} />;
    }

    if (!nowSelectUser)
      return <div style={{ padding: "20px" }}>조회할 팀원을 선택해주세요.</div>;

    switch (selectMode) {
      case "updating":
        return (
          <UpdateModeMainPage
            Now_Select_User={nowSelectUser}
            NowDate={nowDate}
            setSelect_Modes={setSelectMode}
            Getting_Team_Member_Lists={fetchTeamMembers}
          />
        );
      case "writing":
        return (
          <ManDayInsertMode
            Now_Select_User={nowSelectUser}
            NowDate={nowDate}
            setSelect_Modes={setSelectMode}
            Getting_Team_Member_Lists={fetchTeamMembers}
          />
        );
      case "reading":
      default:
        return (
          <Fragment>
            <ManDaySelect Now_Select_User={nowSelectUser} NowDate={nowDate} />
            <div className="Mode_Button_Containers">
              {nowSelectUser.man_day_infos?.length === 0 ? (
                <button onClick={() => setSelectMode("writing")}>
                  Man_day 추가
                </button>
              ) : (
                <button onClick={() => setSelectMode("updating")}>
                  Man_day 수정
                </button>
              )}
            </div>
          </Fragment>
        );
    }
  };

  return (
    <SelectWeekMainPageMainDivBox>
      <div className="GetWeekOfMonth_Container">
        <div className="AminOnlyArrow">
          {hasAccess && (
            <div
              className="Icon_Containers"
              onClick={() => handleChangeDate("minus")}
            >
              <IoIosArrowBack />
            </div>
          )}

          <div className="Title">{getWeekOfMonth(nowDate)}</div>
          <div className="Sub">
            ( {moment(nowDate).startOf("isoWeek").format("MM.DD")} ~{" "}
            {moment(nowDate).startOf("isoWeek").add(4, "days").format("MM.DD")}{" "}
            )
          </div>

          {hasAccess && nextDate !== nowDate && (
            <div
              style={{ marginLeft: "20px" }}
              className="Icon_Containers"
              onClick={() => handleChangeDate("plus")}
            >
              <IoIosArrowForward />
            </div>
          )}
        </div>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            width: "300px",
            justifyContent: "space-between",
            fontWeight: "bold",
          }}
        >
          <div style={{ width: "100px", textAlign: "center" }}>전체인원</div>
          <div style={{ width: "100px", textAlign: "center" }}>입력인원</div>
          <div style={{ width: "100px", textAlign: "center" }}>미입력인원</div>
        </div>
        <div
          style={{
            display: "flex",
            width: "300px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "100px", textAlign: "center" }}>
            {totalCount} 명
          </div>
          <div style={{ width: "100px", textAlign: "center" }}>
            {inputtedCount} 명
          </div>
          <div
            style={{
              width: "100px",
              textAlign: "center",
              color: missingCount > 0 ? "red" : "black",
            }}
          >
            {missingCount} 명
          </div>
        </div>
      </div>

      <div className="Left_Right_Containers">
        <div className="Left_Container">
          <UserListsComponent
            UserLists={userLists}
            setNow_Select_User={setNowSelectUser}
            NowDate={nowDate}
            Today_Date={todayDate}
            setSelect_Modes={setSelectMode}
          />
        </div>
        <div className="Right_Container">{renderRightContent()}</div>
      </div>
    </SelectWeekMainPageMainDivBox>
  );
};

export default SelectWeekMainPage;
