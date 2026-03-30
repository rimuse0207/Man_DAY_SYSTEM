import moment from "moment";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getWeekOfMonth } from "../../../../../../ManDay/MainDayContainer/CommonFunc/CommonFunc";
import "moment/locale/ko";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../../../../../Common/Hooks/useApi";
import { API_CONFIG } from "../../../../../../../API/config";

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

const todayDate = moment().clone().startOf("isoWeek").format("YYYY-MM-DD");

const LicenseContainer = () => {
  const Navigation = useNavigate();

  const [WeekContainer, setWeekContainer] = useState([]);
  const { request: getWeekManDayData } = useApi(
    API_CONFIG.HomeAPI.GET_CARD_MAN_DAY,
  );

  useEffect(() => {
    getWeekManDayData(
      { Select_Date: todayDate },
      {
        onSuccess: (data) => {
          setWeekContainer(data.Date_Lists || []);
        },
      },
    );
  }, [getWeekManDayData]);

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
          {getWeekOfMonth(todayDate)}
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

export default React.memo(LicenseContainer);
