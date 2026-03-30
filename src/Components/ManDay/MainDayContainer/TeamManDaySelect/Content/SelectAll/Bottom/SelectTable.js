import React, { Fragment, useMemo } from "react";
import styled from "styled-components";

const SelectTableMainDivBox = styled.div`
  height: 40vh;
  overflow: auto;
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.8em;
  }

  th,
  td {
    border: none;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 5px;
    text-align: center;
    border-left: none;
    border-right: none;
  }

  th {
    color: black;
    background-color: lightgray;
  }

  thead {
    position: sticky;
    top: -1px;
    height: 32px;
    tr {
      /* position: sticky;
            top: 0px; */
    }
  }
`;

const SelectTable = ({ Man_Day_Infos }) => {
  const tableRows = useMemo(() => {
    const rows = [];

    Man_Day_Infos.forEach((list) => {
      list.user_lists.forEach((item, j) => {
        // 입력된 데이터가 있는 경우
        if (item.man_day && item.man_day.length > 0) {
          item.man_day.forEach((user, idx) => {
            rows.push({
              key: `${list.date}-${item.email}-${idx}`,
              date: list.date,
              company: item.company,
              departmentName: item.departmentName,
              name: item.name,
              depart: user.depart,
              sub_depart: user.sub_depart,
              divideCode: user.divideCode,
              manDay: `${user.manDay.toFixed(0)} 시간`,
              isMissing: false,
            });
          });
        }
        // 미입력인 경우
        else {
          rows.push({
            key: `${list.date}-${item.email}-empty-${j}`,
            date: list.date,
            company: item.company,
            departmentName: item.departmentName,
            name: item.name,
            isMissing: true,
          });
        }
      });
    });

    return rows;
  }, [Man_Day_Infos]);

  return (
    <SelectTableMainDivBox>
      <table>
        <thead>
          <tr>
            <th>날짜</th>
            <th>회사명</th>
            <th>팀</th>
            <th>이름</th>
            <th>설비군</th>
            <th>설비명</th>
            <th>업무 유형</th>
            <th>Man-day(시간)</th>
            <th>입력여부</th>
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row) => (
            <tr key={row.key}>
              <td>{row.date}</td>
              <td>{row.company}</td>
              <td>{row.departmentName}</td>
              <td>{row.name}</td>

              {row.isMissing ? (
                <Fragment>
                  <td colSpan={4}></td>
                  <td style={{ color: "red" }}>미입력</td>
                </Fragment>
              ) : (
                <Fragment>
                  <td>{row.depart}</td>
                  <td>{row.sub_depart}</td>
                  <td>{row.divideCode}</td>
                  <td>{row.manDay}</td>
                  <td>입력완료</td>
                </Fragment>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "20px", marginBottom: "20px" }}></div>
    </SelectTableMainDivBox>
  );
};

export default SelectTable;
