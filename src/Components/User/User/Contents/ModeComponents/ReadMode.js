import React from "react";
import { UserModalMainDivBox } from "../UserModal";
import UserHeader from "../../../Public/UserHeader";
import { UserContentMainPageButtonContainer } from "../../UserContentMainPage";

const ReadMode = ({ Select_User, onClose, setUpdate_Mode }) => {
  const BASE_USER_INFO = [
    { label: "ID", value: Select_User.email },
    { label: "이름", value: Select_User.name },
    { label: "직위", value: Select_User.user_position },
    { label: "부서", value: Select_User.user_department },
    { label: "연차", value: Select_User.user_gradebounce },
    { label: "호봉", value: Select_User.user_salarygrade },
    { label: "직군", value: Select_User.user_occupational },
    { label: "일급(만원)", value: Select_User.dailyExpense },
    {
      label: "읽기전용",
      value: Select_User.readOnly === 1 ? "읽기전용" : "쓰기/읽기",
    },
  ];
  return (
    <UserModalMainDivBox>
      <div className="Float_Top_Container">
        <UserHeader
          title={"사용자 상세"}
          subDescript={"사용자 상세를 조회하고 수정/관리 할 수 있습니다."}
        />
        <UserContentMainPageButtonContainer>
          <button onClick={onClose}>취소</button>
          <button onClick={() => setUpdate_Mode(true)}>수정</button>
        </UserContentMainPageButtonContainer>
      </div>
      <div>
        <table>
          <tbody>
            {BASE_USER_INFO.map((list) => {
              return (
                <tr key={list.label}>
                  <th>{list.label}</th>
                  <td>{list.value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </UserModalMainDivBox>
  );
};

export default ReadMode;
