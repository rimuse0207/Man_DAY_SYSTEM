import React, { useEffect, useState } from "react";
import { UserContentMainPageButtonContainer } from "../../../../../../../User/User/UserContentMainPage";
import { UserModalMainDivBox } from "../../../../../../../User/User/Contents/UserModal";
import {
  Modal,
  Overlay,
} from "../../../../../../../User/Department/Contents/Modal/DepartmentMoveModal";
import ParentTree from "../../../../../../../User/Department/TreeMenu/ParentTree";
import PersonTableLists from "./PersonTableLists";
import { useApi } from "../../../../../../../Common/Hooks/useApi";
import { API_CONFIG } from "../../../../../../../../API/config";

const PersonSelectModal = ({ onClose }) => {
  const [Department_State, setDepartment_State] = useState([]);
  const [NowSelect, setNowSelect] = useState(null);

  const { request: getDepartmentTree } = useApi(
    API_CONFIG.TeamLeaderAPI.GET_DEPARTMENT_TREE,
  );

  useEffect(() => {
    getDepartmentTree(
      {},
      {
        onSuccess: (data) => {
          setDepartment_State(data);
        },
      },
    );
  }, []);

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
          <div
            className="All_Container"
            style={{ display: "flex", height: "calc(90vh - 100px)" }}
          >
            <div
              className="Left_Content"
              style={{
                height: "calc(100vh-100px)",
                width: "30%",
                borderRight: "1px solid lightgray",
                overflow: "auto",
              }}
            >
              <ParentTree
                TreeMenu={Department_State}
                setDepartment_State={(data) => setDepartment_State(data)}
                NowSelect={NowSelect}
                setNowSelect={(data) => setNowSelect(data)}
              ></ParentTree>
            </div>
            <div
              className="Right_Content"
              style={{ height: "calc(100vh-100px)", width: "70%" }}
            >
              <PersonTableLists
                onClose={() => onClose()}
                NowSelect={NowSelect}
              ></PersonTableLists>
            </div>
          </div>
        </UserModalMainDivBox>
      </Modal>
    </Overlay>
  );
};

export default PersonSelectModal;
