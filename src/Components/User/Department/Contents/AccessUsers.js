import React, { useEffect, useState } from "react";
import { UserInfoMainDivBox } from "./UsersInfo";
import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa";
import UserAddModal from "./Modal/UserAddModal";
import { toast } from "../../../ToastMessage/ToastManager";
import { UserTableHeaderList } from "../../../Common/Utils/defaultArray";
import { useApi } from "../../../Common/Hooks/useApi";
import { API_CONFIG } from "../../../../API/config";
import { useUserSelection } from "../../../Common/Hooks/User/useUserSelection";

const AccessUsers = ({ NowSelect }) => {
  const {
    userLists,
    setUserLists,
    selectedUsers,
    setSelectedUsers,
    handleUserToggle,
  } = useUserSelection();

  // const [User_Lists, setUser_Lists] = useState([]);
  // const [Select_User_Lists, setSelect_User_Lists] = useState([]);
  const [UserModalIsOpen, setUserModalIsOpen] = useState(false);
  const { request: accessDepartmentUser } = useApi(
    API_CONFIG.UserAPI.GET_DEPARTMENT_ACCESS_USER,
  );
  const { request: deleteAccessDepartmentUser } = useApi(
    API_CONFIG.UserAPI.DELETE_DEPARTMENT_ACCESS_USER,
  );

  // 권한별 user 불러오기
  const initRequestUserList = () => {
    accessDepartmentUser(
      {
        itemCode: NowSelect?.itemCode,
      },
      {
        onSuccess: (data) => {
          setUserLists(data);
        },
      },
    );
  };

  useEffect(() => {
    if (NowSelect) initRequestUserList();
  }, [NowSelect]);

  // user 권한 삭제
  const Delete_User_By_DepartMents = async () => {
    deleteAccessDepartmentUser(
      { NowSelect, Select_User_Lists: selectedUsers },
      {
        onSuccess: () => {
          setSelectedUsers([]);
          initRequestUserList();
          toast.show({
            title: `${selectedUsers.length}명의 부서 조회 권한을 삭제처리 하였습니다.`,
            successCheck: true,
            duration: 6000,
          });
        },
      },
    );
  };

  return (
    <UserInfoMainDivBox>
      <h4 style={{ marginBottom: "10px" }}>등록된 사용자 목록</h4>
      <div>
        <div>
          {selectedUsers.length > 0 ? (
            <div
              className="Open_Click_Modal_Container"
              style={{ color: "blue", fontSize: "0.8em" }}
            >
              <div>선택된 인원 : {selectedUsers.length}</div>
              <div className="Button_Container">
                <button
                  onClick={() => {
                    Delete_User_By_DepartMents();
                  }}
                >
                  권한 삭제
                </button>
              </div>
            </div>
          ) : NowSelect ? (
            <div style={{ textAlign: "end" }}>
              <button
                style={{
                  padding: "8px 10px",
                  fontWeight: "bolder",
                  background: "#fff",
                  border: "1px solid lightgray",
                  borderRadius: "5px",
                }}
                onClick={() => setUserModalIsOpen(true)}
              >
                {" "}
                추 가{" "}
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
        <table style={{ marginTop: "10px" }}>
          <thead>
            <tr>
              <th></th>
              {UserTableHeaderList.map((list) => {
                return <th key={list}>{list}</th>;
              })}
              <th>소유 권한</th>
            </tr>
          </thead>
          <tbody>
            {userLists.map((list) => {
              return (
                <tr
                  key={list.email}
                  style={
                    list.code_type !== "original" ? { color: "lightgray" } : {}
                  }
                >
                  {list.code_type !== "original" ? (
                    <td></td>
                  ) : selectedUsers.some(
                      (item) => item.email === list.email,
                    ) ? (
                    <td
                      style={{ color: "blue" }}
                      onClick={() => handleUserToggle(list)}
                    >
                      <FaRegCheckSquare />
                    </td>
                  ) : (
                    <td onClick={() => handleUserToggle(list)}>
                      <FaRegSquare></FaRegSquare>
                    </td>
                  )}
                  <td>{list.name}</td>
                  <td>{list.user_position}</td>
                  <td>{list.user_department}</td>
                  <td>{list.user_salarygrade}</td>
                  <td>{list.user_gradebounce}</td>
                  <td>{list.email}</td>
                  <td>{list.user_occupational}</td>
                  <td>{list.itemName}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {UserModalIsOpen && (
        <UserAddModal
          onClose={() => setUserModalIsOpen(false)}
          User_Lists={userLists}
          Choose_Lists={NowSelect}
          Department_Including_User_Data={() => initRequestUserList()}
        ></UserAddModal>
      )}
    </UserInfoMainDivBox>
  );
};

export default AccessUsers;
