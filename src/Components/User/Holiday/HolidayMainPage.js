import moment from "moment";
import React, { useEffect, useState } from "react";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { MdArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";
import { ContentMainPageMainDivBox } from "../../ManDay/MainDayContainer/ManDayApply/Contents/ContentMainPage";
import { Request_Get_Axios } from "../../../API";
import { UserInfoMainDivBox } from "../Department/Contents/UsersInfo";
import { DepartmentMainPageMainDivBox } from "../Department/DepartmentMainPage";
import styled from "styled-components";
import { toast } from "../../ToastMessage/ToastManager";
import HolidayTableList from "./Left/HolidayTableList";
import HolidayInputMainPage from "./Right/HolidayInputMainPage";

const HolidayMainPageMainDivBox = styled.div`
  height: calc(100vh - 100px);
  overflow: hidden;
  .All_Container {
    position: relative;
    .Button_Container {
      position: absolute;
      top: -35px;
      right: 10px;

      button {
        padding: 5px 10px;
        background-color: #fff;
        border: 1px solid lightgray;
        border-radius: 5px;
        &:hover {
          cursor: pointer;
          opacity: 0.5;
        }
      }
    }
  }
`;

const HolidayMainPage = () => {
  const [Select_Date, setSelect_Date] = useState(moment().format("YYYY"));
  const [Holiday_List, setHoliday_List] = useState([]);
  useEffect(() => {
    Getting_Holiday_Lists();
  }, [Select_Date]);

  const Getting_Holiday_Lists = async () => {
    const Getting_Holiday_Lists = await Request_Get_Axios(
      "/User/Getting_Holiday_Lists",
      {
        Select_Date,
      }
    );
    if (Getting_Holiday_Lists.status) {
      setHoliday_List(Getting_Holiday_Lists.data);
    }
  };

  const Handle_Getting_Holiday_Lists_From_Public_open_API_Can_use_1000times_for_one_month =
    async () => {
      const Handle_Getting_Holiday_Lists_From_Public_open_API_Can_use_1000times_for_one_month_Axios =
        await Request_Get_Axios(
          "/User/Getting_Holiday_Lists_From_Public_open_API_Can_use_1000times_for_one_month",
          {
            Select_Date,
          }
        );
      if (
        Handle_Getting_Holiday_Lists_From_Public_open_API_Can_use_1000times_for_one_month_Axios.status
      ) {
        if (
          Handle_Getting_Holiday_Lists_From_Public_open_API_Can_use_1000times_for_one_month_Axios
            .data.dataChecking
        ) {
          //성공
          await Getting_Holiday_Lists();
          toast.show({
            title: `현재 기준으로 갱신 되었습니다.`,
            successCheck: true,
            duration: 5000,
          });
        } else {
          // 데이터 없음
          toast.show({
            title: `데이터가 없습니다.`,
            successCheck: false,
            duration: 5000,
          });
        }
      }
    };

  return (
    <HolidayMainPageMainDivBox>
      <div
        style={{ borderBottom: "1px solid lightgray", paddingBottom: "10px" }}
      >
        <h2>공휴일 관리</h2>
        <div style={{ fontSize: "0.8em", marginTop: "10px", color: "gray" }}>
          공휴일을 최신 현황으로 갱신 할 수 있습니다.
        </div>
      </div>
      <div>
        <DepartmentMainPageMainDivBox>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              borderBottom: "1px solid lightgray",
              paddingBottom: "20px",
              paddingTop: "20px",
              position: "sticky",
              top: "0px",
              background: "#fff",
            }}
          >
            <div
              className="Change_Date_Container"
              style={{ marginRight: "20px", lineHeight: "" }}
              onClick={() => {
                setSelect_Date(
                  moment(Select_Date).subtract(1, "year").format("YYYY")
                );
              }}
            >
              <MdOutlineArrowBackIosNew />
            </div>
            <h2>{Select_Date}년</h2>

            <div
              className="Change_Date_Container"
              style={{ marginLeft: "20px", lineHeight: "" }}
              onClick={() => {
                setSelect_Date(
                  moment(Select_Date).add(1, "year").format("YYYY")
                );
              }}
            >
              <MdArrowForwardIos />
            </div>
          </div>
          <div className="All_Container">
            <div
              className="Left_Content"
              style={{
                width: "50%",
                height: "calc(100vh - 250px)",
                borderLeft: "none",
              }}
            >
              <UserInfoMainDivBox>
                <h4>현재 등록된 공휴일 리스트</h4>
                <HolidayTableList
                  Holiday_List={Holiday_List}
                ></HolidayTableList>
              </UserInfoMainDivBox>
            </div>
            <div className="Right_Content" style={{ width: "50%" }}>
              <HolidayInputMainPage
                Getting_Holiday_Lists={() => Getting_Holiday_Lists()}
              ></HolidayInputMainPage>
            </div>
            <div className="Button_Container">
              <button
                onClick={() =>
                  Handle_Getting_Holiday_Lists_From_Public_open_API_Can_use_1000times_for_one_month()
                }
              >
                자동으로 갱신
              </button>
            </div>
          </div>
        </DepartmentMainPageMainDivBox>
      </div>
    </HolidayMainPageMainDivBox>
  );
};

export default HolidayMainPage;
