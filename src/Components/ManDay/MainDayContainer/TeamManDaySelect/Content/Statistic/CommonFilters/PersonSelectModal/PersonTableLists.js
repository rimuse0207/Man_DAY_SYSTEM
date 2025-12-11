import React, { useEffect, useState } from "react";
import { UserTableMainDivBox } from "../../../../../../../User/Access/AccessLists/UserTable";
import { UserInfoMainDivBox } from "../../../../../../../User/Department/Contents/UsersInfo";
import { Request_Get_Axios } from "../../../../../../../../API";
import { useDispatch, useSelector } from "react-redux";
import { Insert_Man_Day_Select_Reducer_State_Func } from "../../../../../../../../Models/ManDayReducers/ManDaySelectFilterReducer";

const PersonTableLists = ({ onClose, NowSelect }) => {
  const dispatch = useDispatch();
  const Filter_State = useSelector(
    (state) => state.Man_Day_Select_Filter_Reducer_State.Filters_State
  );
  const [NowSelectedUser, setNowSelectedUser] = useState([]);

  useEffect(() => {
    if (NowSelect) Getting_Department_Users();
  }, [NowSelect]);

  const Getting_Department_Users = async () => {
    const Getting_Department_Users_Axios = await Request_Get_Axios(
      "/TeamLeaderManDay/Getting_Department_Users",
      {
        itemCode: NowSelect.itemCode,
      }
    );
    if (Getting_Department_Users_Axios.status) {
      setNowSelectedUser(Getting_Department_Users_Axios.data);
    }
  };

  const Handle_Clicks_User = (Selected) => {
    dispatch(
      Insert_Man_Day_Select_Reducer_State_Func({
        ...Filter_State,
        name: { value: Selected.email, label: Selected.name },
      })
    );
    onClose(false);
  };

  return (
    <div>
      <UserTableMainDivBox>
        <div className="Button_Containers">
          <button
            onClick={() => {
              onClose(false);
            }}
          >
            취소
          </button>
        </div>
        <div style={{ height: "calc(90vh - 120px)", overflow: "auto" }}>
          <UserInfoMainDivBox>
            <table>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>직위</th>
                  <th>부서</th>
                  <th>ID</th>
                  <th>직군</th>
                </tr>
              </thead>
              <tbody className="Person_Tbody_Table">
                {NowSelectedUser.map((list) => {
                  return (
                    <tr
                      key={list.email}
                      onClick={() => {
                        Handle_Clicks_User(list);
                      }}
                      style={
                        list?.checked
                          ? { backgroundColor: "RGB(239, 244, 252)" }
                          : {}
                      }
                    >
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
        </div>
      </UserTableMainDivBox>
    </div>
  );
};

export default PersonTableLists;
