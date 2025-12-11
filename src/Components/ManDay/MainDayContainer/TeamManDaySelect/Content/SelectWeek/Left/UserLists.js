import React, { useEffect } from "react";
import styled from "styled-components";
import { toast } from "../../../../../../ToastMessage/ToastManager";
import { useSelector } from "react-redux";
import { Request_Post_Axios } from "../../../../../../../API";
import moment from "moment";

const UserListsMainDivBox = styled.div`
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
    padding-bottom: 6px;
    padding-top: 6px;
    text-align: center;
    border-left: none;
    border-right: none;
  }

  th {
    color: black;
    background-color: lightgray;
  }

  thead {
    tr {
      position: sticky;
      top: 0px;
    }
  }
  .Click_Buttons {
    font-weight: bolder;
    &:hover {
      cursor: pointer;
      color: blue;
    }
  }
  .Nothing_Data_User_Button_Container {
    text-align: end;
    button {
      padding: 5px 10px;
      font-weight: bolder;
      background-color: #fff;
      border-radius: 5px;
      border: 1px solid lightgray;
      margin: 10px 0px;
      &:hover {
        cursor: pointer;
        background-color: lightgray;
      }
    }
  }
`;

const UserLists = ({
  UserLists,
  setNow_Select_User,
  Today_Date,
  NowDate,
  setSelect_Modes,
}) => {
  const Login_Info = useSelector(
    (state) => state.Login_Info_Reducer_State.Login_Info
  );

  // 미입력자에게 메일 발송
  const Handle_Send_Mail_User = async () => {
    const Nothing_User_Lists = Filter_User_List(UserLists, Today_Date);

    if (
      !window.confirm(
        `${Nothing_User_Lists.length}명의 인원에게 메일을 발송 하시겠습니까?
               `
      )
    ) {
      return;
    }
    if (Nothing_User_Lists.length === 0) {
      toast.show({
        title: `메일을 보낼 사용자가 없습니다.`,
        successCheck: false,
        duration: 4000,
      });
      return;
    } else {
      const Handle_Send_Mail_For_This_Week = await Request_Post_Axios(
        "/TeamLeaderManDay/Handle_Send_Mail_For_This_Week",
        {
          Nothing_User_Lists,
        }
      );
      if (Handle_Send_Mail_For_This_Week.status) {
        toast.show({
          title: `메일을 정상적으로 보냈습니다.`,
          successCheck: true,
          duration: 4000,
        });
      } else {
        toast.show({
          title: `오류가 발생되었습니다. IT팀에 문의바랍니다.`,
          successCheck: false,
          duration: 4000,
        });
      }
    }
  };

  const checkInputStatus = (user_list, emailToCheck, referenceDate) => {
    // 1. 기준일이 속한 주의 월~금 날짜 리스트 구하기
    const weekdays = [];
    const startOfWeek = moment(referenceDate).startOf("isoWeek"); // 월요일
    for (let i = 0; i < 5; i++) {
      weekdays.push(startOfWeek.clone().add(i, "days").format("YYYY-MM-DD"));
    }
    // 2. 해당 email의 user 찾기
    const user = user_list.find((user) => user.email === emailToCheck?.email);
    if (!user) return "사용자 없음";

    // 3. 중복 제거된 날짜 리스트 만들기
    const userDatesSet = new Set(
      user.man_day_infos.map((info) => moment(info.date).format("YYYY-MM-DD"))
    );

    // 4. 해당 주의 날짜 중 몇 개가 포함되어 있는지 확인
    const matchedCount = weekdays.filter((date) =>
      userDatesSet.has(date)
    ).length;

    // 5. 조건에 따른 결과 반환
    if (matchedCount === 0)
      return (
        <td
          className="Click_Buttons"
          style={{ color: "red", fontWeight: "bolder" }}
          onClick={() => {
            setNow_Select_User(emailToCheck);
            setSelect_Modes("reading");
          }}
        >
          미입력
        </td>
      );
    if (matchedCount === 5)
      return (
        <td
          className="Click_Buttons"
          onClick={() => {
            setNow_Select_User(emailToCheck);
            setSelect_Modes("reading");
          }}
        >
          입력 완료
        </td>
      );
    return (
      <td
        className="Click_Buttons"
        style={{ color: "orange", fontWeight: "bolder" }}
        onClick={() => {
          setNow_Select_User(emailToCheck);
          setSelect_Modes("reading");
        }}
      >
        부분 입력
      </td>
    );
  };

  const Filter_User_List = (user_list, referenceDate) => {
    // 1. 기준일이 속한 주의 월~금 날짜 리스트 구하기
    const weekdays = [];
    const startOfWeek = moment(referenceDate).startOf("isoWeek"); // 월요일
    for (let i = 0; i < 5; i++) {
      weekdays.push(startOfWeek.clone().add(i, "days").format("YYYY-MM-DD"));
    }
    return user_list.filter((user) => {
      const userDatesSet = new Set(
        user.man_day_infos.map((info) => moment(info.date).format("YYYY-MM-DD"))
      );

      const matchedCount = weekdays.filter((date) =>
        userDatesSet.has(date)
      ).length;

      return matchedCount < 5; // '입력'이 아닌 유저만
    });
  };

  return (
    <UserListsMainDivBox>
      {NowDate === Today_Date &&
      (Login_Info.team === "개발운영팀" ||
        Login_Info.id === "sjyoo@dhk.co.kr") ? (
        <div className="Nothing_Data_User_Button_Container">
          <button onClick={() => Handle_Send_Mail_User()}>
            미 입력 자 메일 발송
          </button>
        </div>
      ) : (
        <></>
      )}

      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>직위</th>
            <th>팀명</th>
            <th>입력여부</th>
          </tr>
        </thead>
        <tbody>
          {UserLists.map((list) => {
            return (
              <tr key={list.email}>
                <td>{list.name}</td>
                <td>{list.position}</td>
                <td>{list.departmentName}</td>
                {checkInputStatus(UserLists, list, NowDate)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </UserListsMainDivBox>
  );
};
export default UserLists;
