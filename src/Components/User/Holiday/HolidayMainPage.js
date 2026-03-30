import moment from "moment";
import React, { useEffect, useState } from "react";
import { MdArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";
import { UserInfoMainDivBox } from "../Department/Contents/UsersInfo";
import { DepartmentMainPageMainDivBox } from "../Department/DepartmentMainPage";
import styled from "styled-components";
import { toast } from "../../ToastMessage/ToastManager";
import HolidayTableList from "./Left/HolidayTableList";
import HolidayInputMainPage from "./Right/HolidayInputMainPage";
import { useApi } from "../../Common/Hooks/useApi";
import { API_CONFIG } from "../../../API/config";
import UserHeader from "../Public/UserHeader";

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

  const { request: getHolidayList } = useApi(
    API_CONFIG.UserAPI.GET_HOLIDAY_LISTS,
  );
  const { request: bringHolidayListsFromOtherAPI } = useApi(
    API_CONFIG.UserAPI.BRING_HOLIDAY_LISTS_FROM_EXTERNAL_API,
  );

  useEffect(() => {
    Getting_Holiday_Lists();
  }, [Select_Date]);

  // 현재 등록된 공휴일 가져오기
  const Getting_Holiday_Lists = async () => {
    getHolidayList(
      { Select_Date },
      {
        onSuccess: (data) => {
          setHoliday_List(data);
        },
      },
    );
  };

  // 외부 API를 활용한 데이터 갱신
  const Handle_Getting_Holiday_Lists_From_Public_open_API_Can_use_1000times_for_one_month =
    () => {
      bringHolidayListsFromOtherAPI(
        { Select_Date },
        {
          onSuccess: async () => {
            await Getting_Holiday_Lists();
            toast.show({
              title: `현재 기준으로 갱신 되었습니다.`,
              successCheck: true,
              duration: 5000,
            });
          },
        },
      );
    };

  return (
    <HolidayMainPageMainDivBox>
      <UserHeader
        title={"공휴일 관리"}
        subDescript={"공휴일을 최신 현황으로 갱신 할 수 있습니다."}
      ></UserHeader>

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
                  moment(Select_Date).subtract(1, "year").format("YYYY"),
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
                  moment(Select_Date).add(1, "year").format("YYYY"),
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
