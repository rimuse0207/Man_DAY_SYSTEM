import React, { useEffect, useState } from "react";
import { Modal, Overlay } from "./DepartmentMoveModal";
import { UserModalMainDivBox } from "../../../User/Contents/UserModal";
import { UserContentMainPageButtonContainer } from "../../../User/UserContentMainPage";
import ParentTree from "../../TreeMenu/ParentTree";
import UserSelectTable from "./UserSelectTable";
import { customStyles } from "../../../../ManDay/MainDayContainer/TeamManDaySelect/Content/SelectAll/Top/SelectAllFilter";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { Change_User_Search_Reducer } from "../../../../../Models/UserSearchReducer/UserSearchReducer";
import { findItemByCode } from "../../DepartmentMainPage";
import { useApi } from "../../../../Common/Hooks/useApi";
import { API_CONFIG } from "../../../../../API/config";

const UserAddModal = ({
  onClose,
  User_Lists,
  Choose_Lists,
  Department_Including_User_Data,
}) => {
  const dispatch = useDispatch();
  const SearchInfo = useSelector(
    (state) => state.Change_User_Search_Reducer_State,
  );
  const [NowSelect, setNowSelect] = useState(null);
  const [Department_State, setDepartment_State] = useState([]);
  const [NowSelectedUser, setNowSelectedUser] = useState([]);
  const [Checked_user_lists, setChecked_user_lists] = useState([]);
  const [Search_User_Name, setSearch_User_Name] = useState(null);
  const [User_Select_Options, setUser_Select_Options] = useState([]);

  const { request: getDepartmentList } = useApi(
    API_CONFIG.UserAPI.GET_DEPARTMENT,
  );
  const { request: departmentIncludeUser } = useApi(
    API_CONFIG.UserAPI.GET_DEPARTMENT_INCLUDE_USER,
  );

  useEffect(() => {
    // 부서 리스트 조회
    getDepartmentList(
      { SearchInfo },
      {
        onSuccess: (data) => {
          setDepartment_State(data.Change_Tree_State);
          setUser_Select_Options(data.Change_User_Options);
        },
      },
    );
  }, [SearchInfo]);

  useEffect(() => {
    if (NowSelect) Getting_Department_Users();
  }, [NowSelect]);

  // 조직도 선택 별 부서 사용자 리스트 조회
  const Getting_Department_Users = async () => {
    departmentIncludeUser(
      { NowSelect: { itemCode: NowSelect.itemCode } },
      {
        onSuccess: (data) => {
          const InsertCheckBox = data.map((list) => {
            return {
              ...list,
              checked: Checked_user_lists.some(
                (item) => item.email === list.email,
              ),
              disabled: User_Lists.some((item) => item.email === list.email),
            };
          });
          setNowSelectedUser(InsertCheckBox);
        },
      },
    );
  };

  const HandleChange_UserSearchStart = (e) => {
    e.preventDefault();

    if (Search_User_Name) {
      dispatch(Change_User_Search_Reducer(Search_User_Name.value));
      setNowSelect(findItemByCode(Department_State, Search_User_Name.codes));
    }
  };

  return (
    <Overlay>
      <Modal>
        <UserModalMainDivBox>
          <div className="Float_Top_Container">
            <UserContentMainPageButtonContainer>
              <div>
                <h3>'{Choose_Lists.itemName}' 부서 권한 추가 사용자 선택</h3>
              </div>
            </UserContentMainPageButtonContainer>
          </div>
          <div></div>
          <div className="All_Container">
            <div
              className="Left_Content"
              style={{ height: "calc(100vh-100px)" }}
            >
              <div className="Button_Containers">
                <div style={{ width: "calc(100% - 60px)", textAlign: "start" }}>
                  <Select
                    styles={customStyles}
                    value={Search_User_Name}
                    onChange={(e) => {
                      setSearch_User_Name(e);
                    }}
                    isClearable
                    options={User_Select_Options}
                    placeholder="선택 해 주세요."
                  ></Select>
                </div>
                <button
                  style={{ width: "55px" }}
                  onClick={(e) => HandleChange_UserSearchStart(e)}
                >
                  {" "}
                  검 색{" "}
                </button>
              </div>
              <ParentTree
                TreeMenu={Department_State}
                setDepartment_State={(data) => setDepartment_State(data)}
                NowSelect={NowSelect}
                setNowSelect={(data) => setNowSelect(data)}
              ></ParentTree>
            </div>
            <div
              className="Right_Content"
              style={{ height: "calc(100vh-100px)" }}
            >
              <UserSelectTable
                onClose={() => onClose()}
                NowSelectedUser={NowSelectedUser}
                setNowSelectedUser={(data) => setNowSelectedUser(data)}
                setChecked_user_lists={(data) => setChecked_user_lists(data)}
                Checked_user_lists={Checked_user_lists}
                Choose_Lists={Choose_Lists}
                Department_Including_User_Data={() =>
                  Department_Including_User_Data()
                }
              ></UserSelectTable>
            </div>
          </div>
        </UserModalMainDivBox>
      </Modal>
    </Overlay>
  );
};

export default UserAddModal;
