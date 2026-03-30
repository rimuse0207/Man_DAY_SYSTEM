import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ko";
import InputPage from "./InputPage";
import styled from "styled-components";
import { toast } from "../../../../ToastMessage/ToastManager";
import { useSelector } from "react-redux";
import ReadingBoxs from "./ReadingBoxs";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import {
  getWeekOfMonth,
  validateWeeklyManDay,
} from "../../CommonFunc/CommonFunc";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useApi } from "../../../../Common/Hooks/useApi";
import { API_CONFIG } from "../../../../../API/config";
moment.locale("ko");

export const ContentMainPageMainDivBox = styled.div`
  position: relative;
  .Input_Cotainer {
    display: flex;
    padding-right: 30px;
    justify-content: space-between;
  }
  .Save_Button_Container {
    margin-bottom: 50px;
    text-align: end;
    margin-right: 50px;
    button {
      width: 150px;
      margin: 0 auto;
      border-radius: 5px;
      height: 50px;
      line-height: 50px;
      font-size: 1.1em;
      text-align: center;
      background: #2985db;
      font-weight: bolder;
      border: 1px solid lightgray;
      color: #fff;
      &:hover {
        cursor: pointer;
        background: #056ac9;
      }
    }
  }
  .Update_Button_Container {
    margin-bottom: 50px;
    text-align: end;
    margin-right: 50px;
    button {
      width: 150px;
      margin: 0 auto;
      border-radius: 5px;
      height: 50px;
      line-height: 50px;
      font-size: 1.1em;
      text-align: center;
      background: green;
      font-weight: bolder;
      border: 1px solid lightgray;
      color: #fff;
      &:hover {
        cursor: pointer;
        background: #04cd00;
      }
    }
  }
  .Cancel_Button_Container {
    margin-bottom: 50px;
    text-align: end;
    margin-right: 50px;
    button {
      width: 150px;
      margin: 0 auto;
      border-radius: 5px;
      height: 50px;
      line-height: 50px;
      font-size: 1.1em;
      text-align: center;
      background: red;
      font-weight: bolder;
      border: 1px solid lightgray;
      color: #fff;
      &:hover {
        cursor: pointer;
        background: #ff4100;
      }
    }
  }
  .Change_Date_Container {
    font-size: 1.8em;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      height: 100%;
    }
    &:hover {
      cursor: pointer;
      opacity: 0.7;
    }
  }

  .Button_Group {
    position: absolute;
    top: 30px;
    right: 50px;
    ul {
      display: flex;
      li {
        margin-left: 30px;
        button {
          padding: 10px;
          border: none;
          border-radius: 5px;
          color: #fff;
          font-weight: bolder;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }

  .Support_Icons {
    display: flex;
    margin-left: 10px;

    font-size: 1em;
    padding-top: 10px;
    &:hover {
      cursor: pointer;
      opacity: 0.7;
    }
  }
  .react-confirm-alert-overlay {
    background-color: lightgray;
  }
`;

const ContentMainPage = () => {
  const Login_Info = useSelector(
    (state) => state.Login_Info_Reducer_State.Login_Info,
  );

  const todayIsoWeek = moment().startOf("isoWeek").format("YYYY-MM-DD");
  const nextIsoWeek = moment()
    .add(7, "days")
    .startOf("isoWeek")
    .format("YYYY-MM-DD");

  const [Select_Date, setSelect_Date] = useState(todayIsoWeek);

  const [WeekContainer, setWeekContainer] = useState({
    represent_Date: todayIsoWeek,
    Mode: "writing",
    Before_key: null,
    Date_Lists: [],
  });

  // 주별 MANDAY 조회
  const { request: getManDayBeforeData } = useApi(
    API_CONFIG.ManDayAPI.GET_MAN_DAY_BEFORE_APPLY_DATA,
  );
  // MANDAY 저장
  const { request: addManDayData } = useApi(
    API_CONFIG.ManDayAPI.ADD_MAN_DAY_DATA,
  );

  // 한달 이내의 최근 MANDAY 가져오기
  const { request: getManDayDataRecentOneMonth } = useApi(
    API_CONFIG.ManDayAPI.GET_MAN_DAY_DATA_RECENT_ONE_MONTH,
  );

  // 임시 저장된 MANDAY 데이터 가져오기
  const { request: getTemporaryManDayData } = useApi(
    API_CONFIG.ManDayAPI.GET_TEMPORARY_MAN_DAY_DATA,
  );

  // MANDAY 데이터 임시 저장
  const { request: addTemporaryManDayData } = useApi(
    API_CONFIG.ManDayAPI.ADD_TEMPORARY_MAN_DAY_DATA,
  );

  const isCurrentOrNextWeek =
    Select_Date === todayIsoWeek || Select_Date === nextIsoWeek;

  const isWritingOrUpdating =
    WeekContainer.Mode === "writing" || WeekContainer.Mode === "updating";
  const showLoadButtons = isWritingOrUpdating && isCurrentOrNextWeek;

  useEffect(() => {
    Getting_Man_Day_Info_Befroe_Data();
  }, [Select_Date]);

  // 이전 데이터 불러오기
  const Getting_Man_Day_Info_Befroe_Data = async () => {
    getManDayBeforeData(
      { Select_Date },
      {
        onSuccess: (data) => {
          setWeekContainer(data);
        },
      },
    );
  };

  const Save_Man_Day_Data = async () => {
    const errorMessage = validateWeeklyManDay(WeekContainer.Date_Lists);
    if (errorMessage) {
      toast.show({ title: errorMessage, successCheck: false, duration: 6000 });
      return;
    }

    addManDayData(
      { WeekContainer, Login_Info },
      {
        onSuccess: async () => {
          toast.show({
            title: `금주 Man_day 데이터가 ${WeekContainer.Mode === "updating" ? "수정" : "입력"}되었습니다.`,
            successCheck: true,
            duration: 6000,
          });
          await Getting_Man_Day_Info_Befroe_Data();
        },
      },
    );
  };

  const Cancel_Man_Day_Data = () => {
    confirmAlert({
      title: "정말 취소 하시겠습니까?",
      message: "취소하시면 저장되지 않은 데이터는 삭제됩니다.",
      buttons: [
        {
          label: "예",
          onClick: async () => {
            await Getting_Man_Day_Info_Befroe_Data();
            toast.show({
              title: "수정모드가 취소되었습니다.",
              successCheck: true,
              duration: 2000,
            });
          },
        },
        { label: "아니오" },
      ],
    });
  };

  // 한달 이내의 이전 데이터 가져오기
  const Handle_Getting_Before_Data = async () => {
    getManDayDataRecentOneMonth(
      {
        Select_Date,
      },
      {
        onSuccess: (data) => {
          console.log("DADAD", data);
          if (data.Have_Previous_data) {
            setWeekContainer(data.data);
            toast.show({
              title: `이전주의 저장한 데이터를 불러왔습니다.`,
              successCheck: true,
              duration: 3000,
            });
          } else {
            toast.show({
              title: `이전주의 저장한 데이터가 없습니다.`,
              successCheck: false,
              duration: 5000,
            });
          }
        },
      },
    );
  };

  // 임시 저장
  const Save_Temporarily_Man_Data_Info_Data = async () => {
    addTemporaryManDayData(
      {
        WeekContainer,
      },
      {
        onSuccess: () => {
          toast.show({
            title: `데이터를 임시저장하였습니다.`,
            successCheck: true,
            duration: 5000,
          });
        },
      },
    );
  };

  // 임시 저장 된 데이터 불러오기
  const Handle_Getting_Save_Temporarily_Man_Dat_Data = async () => {
    getTemporaryManDayData(
      { Select_Date },
      {
        onSuccess: (data) => {
          if (data.Have_Temporarily_Data) {
            setWeekContainer({
              ...WeekContainer,
              Date_Lists: data.data.Date_Lists,
            });
            toast.show({
              title: `임시 저장한 데이터를 불러왔습니다.`,
              successCheck: true,
              duration: 3000,
            });
          } else {
            toast.show({
              title: `임시 저장한 데이터가 없습니다.`,
              successCheck: false,
              duration: 3000,
            });
          }
        },
      },
    );
  };

  const renderActionButtons = () => {
    if (!isCurrentOrNextWeek) return null; // 주차 아니면 버튼 삭제

    switch (WeekContainer.Mode) {
      case "reading":
        return (
          <div className="Update_Button_Container">
            <button
              onClick={() =>
                setWeekContainer({ ...WeekContainer, Mode: "updating" })
              }
            >
              수정
            </button>
          </div>
        );
      case "updating":
        return (
          <div style={{ display: "flex", justifyContent: "end" }}>
            <div className="Cancel_Button_Container">
              <button onClick={Cancel_Man_Day_Data}>취소</button>
            </div>
            <div className="Update_Button_Container">
              <button onClick={Save_Temporarily_Man_Data_Info_Data}>
                임시 저장
              </button>
            </div>
            <div className="Save_Button_Container">
              <button onClick={Save_Man_Day_Data}>수정 완료</button>
            </div>
          </div>
        );
      case "writing":
        return (
          <div style={{ display: "flex", justifyContent: "end" }}>
            <div className="Update_Button_Container">
              <button onClick={Save_Temporarily_Man_Data_Info_Data}>
                임시 저장
              </button>
            </div>
            <div className="Save_Button_Container">
              <button onClick={Save_Man_Day_Data}>저장</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <ContentMainPageMainDivBox>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          padding: "20px 0",
          borderBottom: "1px solid lightgray",
          position: "sticky",
          top: 0,
          background: "#fff",
        }}
      >
        <div
          className="Change_Date_Container"
          style={{ marginRight: "20px" }}
          onClick={() =>
            setSelect_Date(
              moment(Select_Date).subtract(7, "days").format("YYYY-MM-DD"),
            )
          }
        >
          <MdOutlineArrowBackIosNew />
        </div>
        <h2>{getWeekOfMonth(WeekContainer.represent_Date)}</h2>
        <h2
          className="Support_Icons"
          onClick={() =>
            window.open(
              "/Man_Day/Example",
              "입력 예시",
              "menubar=no, width=1200px, height=800px",
            )
          }
        >
          <BsFillQuestionSquareFill />
        </h2>
        {Select_Date !== nextIsoWeek && (
          <div
            className="Change_Date_Container"
            style={{ marginLeft: "20px" }}
            onClick={() =>
              setSelect_Date(
                moment(Select_Date).add(7, "days").format("YYYY-MM-DD"),
              )
            }
          >
            <MdArrowForwardIos />
          </div>
        )}
        <div style={{ textAlign: "end" }}>
          * YC 중국향 설비는 MT3000으로 입력 바랍니다. ( Wafer - MT3000 ){" "}
        </div>
      </div>

      {/* 불러오기 버튼 */}
      {showLoadButtons && (
        <div className="Button_Group">
          <ul>
            <li>
              <button
                style={{ backgroundColor: "green" }}
                onClick={Handle_Getting_Save_Temporarily_Man_Dat_Data}
              >
                임시저장 불러오기
              </button>
            </li>
            <li>
              <button
                style={{ backgroundColor: "orange" }}
                onClick={Handle_Getting_Before_Data}
              >
                이전 주 데이터 불러오기
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* 메인 리스트 */}
      <div className="Input_Cotainer">
        {WeekContainer.Date_Lists.map((list) =>
          WeekContainer.Mode === "reading" ? (
            <ReadingBoxs key={list.date} List_Items={list} />
          ) : (
            <InputPage
              key={list.date}
              List_Items={list}
              setWeekContainer={setWeekContainer}
              isEditableWeek={isCurrentOrNextWeek}
            />
          ),
        )}
      </div>

      {/* 하단 저장/수정/취소 버튼  */}
      {renderActionButtons()}
    </ContentMainPageMainDivBox>
  );
};

export default ContentMainPage;
