import React, { useState } from "react";
import { UserTableMainDivBox } from "../../../Access/AccessLists/UserTable";
import { UserInfoMainDivBox } from "../UsersInfo";
import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa";
import { toast } from "../../../../ToastMessage/ToastManager";
import { useApi } from "../../../../Common/Hooks/useApi";
import { API_CONFIG } from "../../../../../API/config";

const UserSelectTable = ({
  onClose,
  NowSelectedUser,
  setNowSelectedUser,
  setChecked_user_lists,
  Checked_user_lists,
  Choose_Lists,
  Department_Including_User_Data,
}) => {
  const { request: addDepartmentAccessUser } = useApi(
    API_CONFIG.UserAPI.ADD_DEPARTMENT_ACCESS_USER,
  );

  const Handle_Clicks_User = (Selected_User) => {
    const checked = NowSelectedUser.map((list) => {
      return {
        ...list,
        checked:
          list.email === Selected_User.email ? !list.checked : list.checked,
      };
    });
    setNowSelectedUser(checked);
    if (Selected_User.checked) {
      setChecked_user_lists(
        Checked_user_lists.filter((item) => item.email !== Selected_User.email),
      );
    } else {
      setChecked_user_lists(Checked_user_lists.concat(Selected_User));
    }
  };

  const Handle_Add_Access_User_Lists = async () => {
    addDepartmentAccessUser(
      {
        Checked_user_lists,
        Choose_Lists,
      },
      {
        onSuccess: async () => {
          await Department_Including_User_Data();
          onClose();
          toast.show({
            title: `${Checked_user_lists.length}명의 인원 ${Choose_Lists.itemName} 부서 조회 권한이 등록 되었습니다.`,
            successCheck: true,
            duration: 6000,
          });
        },
      },
    );
  };

  return (
    <div>
      <UserTableMainDivBox>
        <div> 선택된 유저 수:{Checked_user_lists.length}</div>
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
              Handle_Add_Access_User_Lists();
            }}
          >
            추가
          </button>
        </div>

        <UserInfoMainDivBox>
          <table>
            <thead>
              <tr>
                <th style={{ width: "100px" }}></th>
                <th>이름</th>
                <th>직위</th>
                <th>부서</th>
                <th>ID</th>
                <th>직군</th>
              </tr>
            </thead>
            <tbody>
              {NowSelectedUser.map((list) => {
                const blockSetting = list.disabled;
                const isChecked = list.checked;
                return (
                  <tr
                    key={list.email}
                    style={
                      blockSetting
                        ? { backgroundColor: "#efefff", opacity: "0.5" }
                        : { backgroundColor: "RGB(239, 244, 252)" }
                    }
                    onClick={() => {
                      if (!blockSetting) {
                        Handle_Clicks_User(list);
                      }
                    }}
                  >
                    {blockSetting ? (
                      <td style={{ width: "100px" }}></td>
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
    </div>
  );
};

export default UserSelectTable;
