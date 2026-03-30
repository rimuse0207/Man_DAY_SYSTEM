import React, { useEffect, useState } from "react";
import {
  Modal,
  Overlay,
} from "../../Department/Contents/Modal/DepartmentMoveModal";
import Select from "react-select";
import { UserModalMainDivBox } from "../../User/Contents/UserModal";
import { UserContentMainPageButtonContainer } from "../../User/UserContentMainPage";
import ParentTree from "../../Department/TreeMenu/ParentTree";
import UserTable from "./UserTable";
import { useDispatch, useSelector } from "react-redux";
import { customStyles } from "../../../ManDay/MainDayContainer/TeamManDaySelect/Content/SelectAll/Top/SelectAllFilter";
import { Change_User_Search_Reducer } from "../../../../Models/UserSearchReducer/UserSearchReducer";
import { findItemByCode } from "../../Department/DepartmentMainPage";
import { useApi } from "../../../Common/Hooks/useApi";
import { API_CONFIG } from "../../../../API/config";

const AccessUserModal = ({
  onClose,
  Now_Select_Menu,
  Getting_Menu_Access_User_List,
}) => {
  const dispatch = useDispatch();
  const SearchInfo = useSelector(
    (state) => state.Change_User_Search_Reducer_State,
  );
  const [NowSelect, setNowSelect] = useState(null);
  const [Department_State, setDepartment_State] = useState([]);
  const [Search_User_Name, setSearch_User_Name] = useState(null);
  const [User_Select_Options, setUser_Select_Options] = useState([]);

  const { request: getDepartmentList } = useApi(
    API_CONFIG.UserAPI.GET_DEPARTMENT,
  );

  useEffect(() => {
    getDepartmentList(
      {
        SearchInfo,
      },
      {
        onSuccess: (data) => {
          setDepartment_State(data.Change_Tree_State);
          setUser_Select_Options(data.Change_User_Options);
        },
      },
    );
  }, [SearchInfo, getDepartmentList]);

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
                <h3>사용자 선택</h3>
              </div>
            </UserContentMainPageButtonContainer>
          </div>
          <div></div>
          <div className="All_Container">
            <div className="Left_Content">
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
            <div className="Right_Content">
              <UserTable
                onClose={() => onClose()}
                NowSelect={NowSelect}
                Now_Select_Menu={Now_Select_Menu}
                Getting_Menu_Access_User_List={() =>
                  Getting_Menu_Access_User_List()
                }
              ></UserTable>
            </div>
          </div>
        </UserModalMainDivBox>
      </Modal>
    </Overlay>
  );
};
export default AccessUserModal;
