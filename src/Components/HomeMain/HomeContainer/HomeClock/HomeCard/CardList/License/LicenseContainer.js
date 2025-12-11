import moment from "moment";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getWeekOfMonth } from "../../../../../../ManDay/MainDayContainer/CommonFunc/CommonFunc";
import { Request_Get_Axios } from "../../../../../../../API";
import "moment/locale/ko";
import { useNavigate } from "react-router-dom";
import { RiArrowRightWideFill } from "react-icons/ri";
moment.locale("ko");
const LicnenseContainerMainDivBox = styled.div`
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #e0e8ee;
  .Descript {
    font-size: 12px;
    padding-left: 20px;
    margin-bottom: 10px;
    strong {
      font-size: 13px;
    }
  }
  table {
    font-size: 14px;
    width: 100%;
    tr {
      padding: 10px;
    }
    .Td_Title {
      padding-right: 20px;
    }
    .Td_Descript {
      font-size: 12px;
    }
    th,
    td {
      padding: 5px;
    }
    td {
      &:hover {
        cursor: pointer;
        color: gray;
      }
    }
  }
`;

const LicenseContainer = () => {
  const Navigation = useNavigate();
  const Today_Date = moment().clone().startOf("isoWeek").format("YYYY-MM-DD");
  const [WeekContainer, setWeekContainer] = useState([]);
  useEffect(() => {
    Getting_Man_Day_Info_Befroe_Data();
  }, []);

  // 이전 데이터 불러오기
  const Getting_Man_Day_Info_Befroe_Data = async () => {
    const Getting_Man_Day_Info_Before_Data_Axios = await Request_Get_Axios(
      `/ManDayInfo/Getting_Man_Day_Info_Before_Data`,
      {
        Select_Date: moment(Today_Date)
          .clone()
          .startOf("isoWeek")
          .format("YYYY-MM-DD"),
      }
    );
    if (Getting_Man_Day_Info_Before_Data_Axios.status) {
      if (Getting_Man_Day_Info_Before_Data_Axios.data.Date_Lists.length > 0) {
        setWeekContainer(
          Getting_Man_Day_Info_Before_Data_Axios.data.Date_Lists
        );
      }
    }
  };
  return (
    <LicnenseContainerMainDivBox>
      <div>
        <div
          style={{
            marginBottom: "10px",
            fontWeight: "bolder",
            textAlign: "center",
            borderBottom: "1px solid lightgray",
          }}
        >
          {" "}
          {getWeekOfMonth(Today_Date)}
        </div>
        <div className="Table_Flex_Container">
          <div>
            <table>
              <thead>
                <tr>
                  {WeekContainer.map((list) => {
                    return (
                      <th key={list.date}>
                        {moment(list.date).format("MM.DD dd")}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {WeekContainer.map((list) => {
                    return list.child.length > 0 ? (
                      <td
                        className="Td_Descript"
                        onClick={() => Navigation("/Man_day/Apply")}
                        key={list.date}
                      >
                        입력완료
                      </td>
                    ) : (
                      <td
                        key={list.date}
                        className="Td_Descript"
                        onClick={() => Navigation("/Man_day/Apply")}
                        style={{ color: "red" }}
                      >
                        미입력
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LicnenseContainerMainDivBox>
  );
};

export default LicenseContainer;
