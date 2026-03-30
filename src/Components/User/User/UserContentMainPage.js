import React, { useEffect, useMemo, useState } from "react";
import { DepartmentMainPageMainDivBox } from "../Department/DepartmentMainPage";
import { UserInfoMainDivBox } from "../Department/Contents/UsersInfo";
import styled from "styled-components";
import UserModal from "./Contents/UserModal";
import AddUserModal from "./Contents/AddUserModal";
import { useApi } from "../../Common/Hooks/useApi";
import { API_CONFIG } from "../../../API/config";
import UserHeader from "../Public/UserHeader";
import TableHeader from "../Public/TableHeader";

export const UserContentMainPageButtonContainer = styled.div`
  text-align: end;
  margin-bottom: 10px;
  button {
    margin-right: 20px;
    border: 1px solid lightgray;
    padding: 7px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 5px;
    background-color: #fff;
    &:hover {
      cursor: pointer;
      opacity: 0.7;
    }
  }
  .Button_Containers {
    text-align: end;
  }
`;

const UserSearchContainer = styled.div`
  font-size: 0.9em;
  .SpanBox {
    margin-left: 20px;
  }
  .SearchInput {
    border: 1px solid lightgray;
    height: 30px;
    padding-left: 10px;
    border-radius: 5px;
    width: 300px;
  }
`;

const TableContainer = styled.div`
  height: calc(100vh - 250px);
  overflow: auto;
  table {
    font-size: 0.9em;
    thead {
      position: sticky;
      top: -1px;
      height: 30px;
      z-index: 10;
      tr {
        background-color: RGB(239, 244, 252);
      }
    }
  }
`;

const UserContentMainPage = () => {
  const [User_Lists_State, setUser_Lists_State] = useState([]);
  const [SearchInput, setSearchInput] = useState("");
  const [Select_User, setSelect_User] = useState(null);
  const [User_Modal_IsOpen, setUser_Modal_IsOpen] = useState(false);
  const [Update_Mode, setUpdate_Mode] = useState(false);
  const [AddUserModalOpen, setAddUserModalOpen] = useState(false);

  const { request: requestUser } = useApi(API_CONFIG.UserAPI.GET_USER);

  const initFunc = () => {
    requestUser(
      {},
      {
        onSuccess: (data) => {
          setUser_Lists_State(data);
        },
      },
    );
  };

  useEffect(() => {
    initFunc();
  }, []);

  const filteredUsers = useMemo(() => {
    const searchLower = SearchInput?.toLowerCase() || "";

    return User_Lists_State.filter((user) => {
      return (
        user?.name?.toLowerCase().includes(searchLower) ||
        user?.email?.toLowerCase().includes(searchLower) ||
        user?.user_department?.toLowerCase().includes(searchLower)
      );
    });
  }, [User_Lists_State, SearchInput]);

  const UserRow = React.memo(({ user, isSelected, onClick }) => {
    const rowStyle = {
      opacity: user.inservice === 0 ? 0.5 : 1,
      backgroundColor: isSelected ? "RGB(239, 244, 252)" : "transparent",
      cursor: "pointer",
    };

    return (
      <tr style={rowStyle} onClick={() => onClick(user)}>
        <td>{user.name}</td>
        <td>{user.user_position}</td>
        <td>{user.user_department}</td>
        <td>{user.user_salarygrade}</td>
        <td>{user.user_gradebounce}</td>
        <td>{user.email}</td>
        <td>{user.user_occupational}</td>
        <td>{user.readOnly === 1 ? "O" : "X"}</td>
      </tr>
    );
  });

  return (
    <DepartmentMainPageMainDivBox>
      <UserHeader
        title={"사용자"}
        subDescript={"사용자 정보를 조회/관리할 수 있습니다."}
      ></UserHeader>
      <UserInfoMainDivBox>
        <div>
          <UserSearchContainer>
            <span>사용자 수 ({User_Lists_State.length})</span>
            <span className="SpanBox">
              <input
                className="SearchInput"
                value={SearchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="검색..."
              ></input>
            </span>
          </UserSearchContainer>

          <UserContentMainPageButtonContainer>
            <button onClick={() => setAddUserModalOpen(true)}>추 가</button>
          </UserContentMainPageButtonContainer>
        </div>

        <TableContainer>
          <table>
            <TableHeader
              headerList={[
                "이름",
                "직급",
                "부서",
                "호봉",
                "연차",
                "ID",
                "직군",
                "읽기전용 체크",
              ]}
            ></TableHeader>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <UserRow
                    key={user.email}
                    user={user}
                    isSelected={user.email === Select_User?.email}
                    onClick={(selectedUser) => {
                      setSelect_User(selectedUser);
                      setUser_Modal_IsOpen(true);
                    }}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="8">검색 결과가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </TableContainer>
      </UserInfoMainDivBox>
      {User_Modal_IsOpen && (
        <UserModal
          Getting_All_User_Info={() => initFunc()}
          Select_User={Select_User}
          setSelect_User={(data) => setSelect_User(data)}
          isOpen={User_Modal_IsOpen}
          onClose={() => {
            setUser_Modal_IsOpen(false);
            setSelect_User(null);
          }}
          Update_Mode={Update_Mode}
          setUpdate_Mode={(data) => setUpdate_Mode(data)}
        ></UserModal>
      )}
      {AddUserModalOpen && (
        <AddUserModal
          Getting_All_User_Info={() => initFunc()}
          onClose={() => {
            setAddUserModalOpen(false);
          }}
        ></AddUserModal>
      )}
    </DepartmentMainPageMainDivBox>
  );
};

export default UserContentMainPage;
