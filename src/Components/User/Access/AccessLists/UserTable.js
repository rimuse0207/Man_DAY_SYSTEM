import React, { useEffect, useState } from "react";
import { UserInfoMainDivBox } from "../../Department/Contents/UsersInfo";
import { FaRegSquare } from "react-icons/fa";
import { FaRegCheckSquare } from "react-icons/fa";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { toast } from "../../../ToastMessage/ToastManager";
import { useApi } from "../../../Common/Hooks/useApi";
import { API_CONFIG } from "../../../../API/config";
import { useUserSelection } from "../../../Common/Hooks/User/useUserSelection";

export const UserTableMainDivBox = styled.div`
  position: relative;
  td,
  th {
    text-align: center !important;
  }
  td {
    padding-left: 0px !important;
  }
  .Showing_Select_Person_List_Container {
    display: flex;
    align-items: center;
    margin-left: 20px;
    padding: 5px;
    .Icon_Container {
      color: red;
      font-size: 1.3em;
      margin-left: 20px;
      padding-top: 5px;
      &:hover {
        cursor: pointer;
        opacity: 0.7;
      }
    }
  }
  .Button_Containers {
    position: absolute;
    top: -50px;
    right: 10px;
    z-index: 1000;
    button {
      border: 1px solid lightgray;
      padding: 10px;
      margin-left: 20px;
      border-radius: 5px;
      padding-left: 20px;
      padding-right: 20px;
      background-color: #fff;
      &:hover {
        cursor: pointer;
        opacity: 0.7;
      }
    }
  }
`;

const UserTable = ({
  onClose,
  NowSelect,
  Now_Select_Menu,
  Getting_Menu_Access_User_List,
}) => {
  // 사용자 선택 HOOK
  const {
    userLists,
    setUserLists,
    selectedUsers,
    allChecking,
    handleUserToggle,
    handleAllToggle,
    handleClearAll,
  } = useUserSelection();

  const { request: addSystemMenuAccessUser } = useApi(
    API_CONFIG.UserAPI.ADD_SYSTEM_MENU_ACCESS_USER,
  );
  const { request: getSystemMenuAccessUserList } = useApi(
    API_CONFIG.UserAPI.GET_SYSTEM_MENU_USER_LIST,
  );

  useEffect(() => {
    if (NowSelect) initAccessSystemMenuUserList();
  }, [NowSelect]);

  // 부서별 사용자 조회
  const initAccessSystemMenuUserList = () => {
    getSystemMenuAccessUserList(
      { itemCode: NowSelect.itemCode, Now_Select_Menu },
      {
        onSuccess: (data) => {
          const Change_Checked = data.map((list) => {
            return {
              ...list,
              checked: selectedUsers.some((item) => item.email === list.email),
            };
          });
          setUserLists(Change_Checked);
        },
      },
    );
  };

  // 시스템 메뉴 권한 사용자 등록
  const Handle_Add_Access_User = async () => {
    addSystemMenuAccessUser(
      { Selected_User_Lists: selectedUsers, NowSelect, Now_Select_Menu },
      {
        onSuccess: async () => {
          await Getting_Menu_Access_User_List();
          onClose();
          toast.show({
            title: `${selectedUsers.length}명의 사용자에게 ${
              Now_Select_Menu.accessType === "user" ? "사용자" : "관리자"
            }권한을 추가하였습니다.`,
            successCheck: true,
            duration: 6000,
          });
        },
      },
    );
  };

  return (
    <UserTableMainDivBox>
      <div className="Button_Containers">
        <button
          onClick={() => {
            onClose();
          }}
        >
          취소
        </button>
        <button
          onClick={() => {
            Handle_Add_Access_User();
          }}
        >
          추가
        </button>
      </div>

      <div className="Showing_Select_Person_List_Container">
        <div style={{ color: "blue" }}>
          선택된 인원 ({selectedUsers.length})
        </div>
        <div
          className="Icon_Container"
          onClick={() => {
            handleClearAll();
          }}
        >
          <IoClose />
        </div>
      </div>

      <UserInfoMainDivBox>
        <table>
          <thead>
            <tr>
              <th
                onClick={() => {
                  handleAllToggle();
                }}
              >
                {allChecking ? (
                  <FaRegCheckSquare />
                ) : (
                  <FaRegSquare></FaRegSquare>
                )}
              </th>
              <th>이름</th>
              <th>직위</th>
              <th>부서</th>
              <th>ID</th>
              <th>직군</th>
            </tr>
          </thead>
          <tbody>
            {userLists.map((list) => {
              const isBlock = list.disable;
              const isChecked = list?.checked;
              return (
                <tr
                  key={list.email}
                  style={
                    isBlock
                      ? { backgroundColor: "#efefff", opacity: "0.5" }
                      : isChecked
                        ? { backgroundColor: "RGB(239, 244, 252)" }
                        : {}
                  }
                  onClick={() => {
                    if (!isBlock) {
                      handleUserToggle(list);
                    }
                  }}
                >
                  {isBlock ? (
                    <td></td>
                  ) : (
                    <td style={isChecked ? { color: "blue" } : {}}>
                      {isChecked ? (
                        <FaRegCheckSquare />
                      ) : (
                        <FaRegSquare></FaRegSquare>
                      )}
                    </td>
                  )}
                  <td>{list.name}</td>
                  <td>{list.user_position}</td>
                  <td>{list.user_department}</td>
                  <td>{list.email}</td>
                  <td>{list.user_occupational}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </UserInfoMainDivBox>
    </UserTableMainDivBox>
  );
};

export default UserTable;
