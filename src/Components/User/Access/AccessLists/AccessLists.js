import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Request_Get_Axios, Request_Post_Axios } from "../../../../API";
import { UserInfoMainDivBox } from "../../Department/Contents/UsersInfo";
import { FaRegSquare } from "react-icons/fa";
import { FaRegCheckSquare } from "react-icons/fa";
import UserModal from "../../User/Contents/UserModal";
import AccessUserModal from "./AccessUserModal";
import { toast } from "../../../ToastMessage/ToastManager";
import { FaInfoCircle } from "react-icons/fa";
import { UserTableHeaderList } from "../../../Common/Utils/defaultArray";
import { useApi } from "../../../Common/Hooks/useApi";
import { API_CONFIG } from "../../../../API/config";
import { useUserSelection } from "../../../Common/Hooks/User/useUserSelection";

const AccessListsaMainDivBox = styled.div`
  ul {
    display: flex;
    border-bottom: 1px solid lightgray;
    position: relative;
    li {
      margin-left: 20px;
      padding: 10px;

      &:hover {
        cursor: pointer;
      }
    }
  }
  input {
    border: 1px solid lightgray;
    height: 30px;
    border-radius: 5px;
    padding-left: 10px;
    width: 300px;
  }

  .Button_Container {
    position: absolute;
    bottom: 7px;
    right: 10px;
    button {
      padding: 5px;
      border: 1px solid lightgray;
      border-radius: 5px;
      background-color: #fff;
      margin-left: 10px;
      &:hover {
        cursor: pointer;
        opacity: 0.7;
      }
    }
  }
`;

const UserRow = ({ user, onClick }) => {
  const {
    checked,
    name,
    user_position,
    user_department,
    user_salarygrade,
    user_gradebounce,
    email,
    user_occupational,
  } = user;

  const rowStyle = checked ? { backgroundColor: "RGB(239, 244, 252)" } : {};
  const checkColor = checked ? { color: "blue" } : {};

  return (
    <tr key={email} style={rowStyle}>
      <td
        style={checkColor}
        onClick={() => {
          console.log(user);
          onClick(user);
        }}
      >
        {checked ? <FaRegCheckSquare /> : <FaRegSquare />}
      </td>
      <td>{name}</td>
      <td>{user_position}</td>
      <td>{user_department}</td>
      <td>{user_salarygrade}</td>
      <td>{user_gradebounce}</td>
      <td>{email}</td>
      <td>{user_occupational}</td>
    </tr>
  );
};

const AccessLists = ({ Now_Select_Menu }) => {
  const {
    userLists,
    setUserLists,
    selectedUsers,
    setSelectedUsers,
    allChecking,
    handleUserToggle,
    handleAllToggle,
  } = useUserSelection();
  const [SearchData, setSearchData] = useState("");
  const [User_Select_Modal_Open, setUser_Select_Modal_Open] = useState(false);

  const { request: getSystemMenuUserDetailUserList } = useApi(
    API_CONFIG.UserAPI.GET_SYSTEM_MENU_USER_DETAIL_USER_LIST,
  );
  const { request: deleteSystemMenuAccessUser } = useApi(
    API_CONFIG.UserAPI.DELETE_SYSTEM_MENU_ACCESS_USER,
  );

  useEffect(() => {
    Getting_Menu_Access_User_List();
    setSelectedUsers([]);
  }, [Now_Select_Menu]);

  // 사용자 불러오기
  const Getting_Menu_Access_User_List = async () => {
    getSystemMenuUserDetailUserList(
      {
        Now_Select_Menu,
      },
      {
        onSuccess: (data) => {
          setUserLists(data);
        },
      },
    );
  };

  // 유저 권한 삭제
  const Delete_Access_User_Lists = async () => {
    deleteSystemMenuAccessUser(
      { Now_Select_Menu, Selected_User_Lists: selectedUsers },
      {
        onSuccess: async () => {
          toast.show({
            title: `${selectedUsers.length}명의 권한을 삭제 처리 하였습니다. `,
            successCheck: true,
            duration: 6000,
          });
          setSelectedUsers([]);
          await Getting_Menu_Access_User_List();
        },
      },
    );
  };

  const filteredUsers = userLists.filter((user) => {
    const searchTerm = SearchData.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.user_department.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <AccessListsaMainDivBox>
      <ul>
        <div style={{ padding: "10px" }}>등록된 사용자</div>
        <div className="Button_Container">
          <button onClick={() => Delete_Access_User_Lists()}>삭 제</button>
          <button onClick={() => setUser_Select_Modal_Open(true)}>추 가</button>
        </div>
      </ul>
      <div style={{ marginTop: "10px", paddingLeft: "30px" }}>
        <input
          type="text"
          value={SearchData}
          onChange={(e) => setSearchData(e.target.value)}
          placeholder="검색.."
        ></input>
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
              {UserTableHeaderList.map((list) => {
                return <th key={list}>{list}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <UserRow
                key={user.email}
                user={user}
                onClick={handleUserToggle}
              />
            ))}
          </tbody>
        </table>
      </UserInfoMainDivBox>
      {User_Select_Modal_Open && (
        <AccessUserModal
          Now_Select_Menu={Now_Select_Menu}
          onClose={() => setUser_Select_Modal_Open(false)}
          Getting_Menu_Access_User_List={() => Getting_Menu_Access_User_List()}
        ></AccessUserModal>
      )}
    </AccessListsaMainDivBox>
  );
};

export default AccessLists;
