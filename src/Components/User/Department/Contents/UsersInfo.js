import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaRegSquare } from "react-icons/fa";
import { FaRegCheckSquare } from "react-icons/fa";
import DepartmentMoveModal from "./Modal/DepartmentMoveModal";
import { toast } from "../../../ToastMessage/ToastManager";
import { useApi } from "../../../Common/Hooks/useApi";
import { API_CONFIG } from "../../../../API/config";
import { UserTableHeaderList } from "../../../Common/Utils/defaultArray";
import { useUserSelection } from "../../../Common/Hooks/User/useUserSelection";

export const UserInfoMainDivBox = styled.div`
  width: 100%;
  padding: 5px 10px;
  height: calc(100vh - 300px);
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
  }
  .Open_Click_Modal_Container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .Button_Container {
      margin-left: 20px;

      button {
        border: none;
        padding: 5px;
        background-color: #fff;
        border: 1px solid lightgray;
        border-radius: 5px;
        &:hover {
          cursor: pointer;
          opacity: 0.7;
        }
      }
    }
  }
  thead {
    position: sticky;
    top: -10px;
    height: 30px;
    background-color: #fff;
  }
  .Detail_Info_Button_Container {
    &:hover {
      cursor: pointer;
      color: blue;
    }
  }
  .Person_Tbody_Table {
    tr {
      &:hover {
        cursor: pointer;
        opacity: 0.8;
        background-color: rgb(239, 244, 252);
      }
    }
  }
`;

const UsersInfo = ({ NowSelect, Department_State }) => {
  const {
    userLists,
    setUserLists,
    selectedUsers,
    allChecking,
    handleUserToggle,
    handleAllToggle,
    handleClearAll,
  } = useUserSelection();

  const [Modal_Choose_Department_State, setModal_Choose_Department_State] =
    useState(Department_State);
  const [ModalNowSelect, setModalNowSelect] = useState(null);
  const [isOpen, setisOpen] = useState(false);

  const { request: departmentIncludeUser } = useApi(
    API_CONFIG.UserAPI.GET_DEPARTMENT_INCLUDE_USER,
  );
  const { request: updateUserDepartment } = useApi(
    API_CONFIG.UserAPI.UPDATE_USER_DEPARTMENT,
  );

  useEffect(() => {
    if (NowSelect) {
      Getting_User_Info_Data_Iclduing_Department();
      handleClearAll();
    }
  }, [NowSelect]);

  useEffect(() => {
    setModal_Choose_Department_State(Department_State);
  }, [Department_State]);

  /// 부서변경 서버로 전송
  const Update_User_Info_Data = async () => {
    updateUserDepartment(
      { ModalNowSelect, Select_User_Lists: selectedUsers },
      {
        onSuccess: () => {
          toast.show({
            title: `${selectedUsers.length}명의 인원이 ${ModalNowSelect.itemName}로 부서이동 되었습니다.`,
            successCheck: true,
            duration: 6000,
          });
          handleClearAll();
          setModalNowSelect(null);
          setisOpen(false);
          Getting_User_Info_Data_Iclduing_Department();
        },
      },
    );
  };

  // 부서별 사용자 조회
  const Getting_User_Info_Data_Iclduing_Department = () => {
    departmentIncludeUser(
      { NowSelect: { itemCode: NowSelect.itemCode } },
      {
        onSuccess: (data) => {
          setUserLists(data);
        },
      },
    );
  };

  return (
    <UserInfoMainDivBox
      style={{ height: "calc(100vh - 270px)", overflow: "auto" }}
    >
      <h4 style={{ marginBottom: "10px" }}>부서원 목록</h4>
      <div>
        <div>
          <div
            className="Open_Click_Modal_Container"
            style={{ color: "blue", fontSize: "0.8em" }}
          >
            <div>선택된 인원 : {selectedUsers.length}</div>
            <div className="Button_Container">
              <button onClick={() => setisOpen(true)}>부서이동</button>
            </div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th onClick={() => handleAllToggle()}>
                {allChecking ? (
                  <FaRegCheckSquare />
                ) : (
                  <FaRegSquare></FaRegSquare>
                )}
              </th>
              {UserTableHeaderList.map((list) => {
                return <th key={list}>{list}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {userLists.map((list) => {
              const isChecked = list.checked;
              return (
                <tr
                  key={list.email}
                  onClick={() => handleUserToggle(list)}
                  style={
                    isChecked ? { backgroundColor: "RGB(239, 244, 252)" } : {}
                  }
                >
                  <td style={isChecked ? { color: "blue" } : {}}>
                    {isChecked ? (
                      <FaRegCheckSquare />
                    ) : (
                      <FaRegSquare></FaRegSquare>
                    )}
                  </td>
                  <td>{list.name}</td>
                  <td>{list.user_position}</td>
                  <td>{list.user_department}</td>
                  <td>{list.user_salarygrade}</td>
                  <td>{list.user_gradebounce}</td>
                  <td>{list.email}</td>
                  <td>{list.user_occupational}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {isOpen && (
        <DepartmentMoveModal
          isOpen={isOpen}
          onClose={() => setisOpen(false)}
          Department_State={Modal_Choose_Department_State}
          setDepartment_State={(data) => setModal_Choose_Department_State(data)}
          NowSelect={ModalNowSelect}
          setNowSelect={(data) => setModalNowSelect(data)}
          Update_User_Info_Data={() => Update_User_Info_Data()}
        ></DepartmentMoveModal>
      )}
    </UserInfoMainDivBox>
  );
};
export default UsersInfo;
