import React, { useEffect, useState, useMemo, Fragment } from "react";
import styled from "styled-components";
import { useApi } from "../../../Common/Hooks/useApi";
import { API_CONFIG } from "../../../../API/config";
import {
  Modal,
  Overlay,
} from "../../Department/Contents/Modal/DepartmentMoveModal";
import UpdateMode from "./ModeComponents/UpdateMode";
import ReadMode from "./ModeComponents/ReadMode";

export const UserModalMainDivBox = styled.div`
  .Float_Top_Container {
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0px;
    text-align: start;
    font-size: 1em;
    border-bottom: 1px solid lightgray;
    padding-bottom: 20px;
    z-index: 1000;
    padding-top: 20px;
    background-color: #fff;
  }
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
    padding: 15px;
  }
  td {
    padding-left: 10px;
    text-align: start;
  }
  th {
    color: black;
    text-align: center;
    background-color: #efefef;
    width: 200px;
  }
  input {
    border: 1px solid lightgray;
    border-radius: 5px;
    min-height: 38px;
    padding-left: 10px;
    width: 99%;
  }
`;

const formatUserInfo = (user) => ({
  ...user,
  department: { value: user.departmentCode, label: user.user_department },
  salarygrade: { value: user.salarygradeCode, label: user.user_salarygrade },
  occupational: { value: user.occupationalCode, label: user.user_occupational },
  gradebounce: { value: user.gradebounceCode, label: user.user_gradebounce },
  position: { value: user.positionCode, label: user.user_position },
  SelectreadOnly: {
    value: user.readOnly === 1 ? "readOnly" : "writeAndreading",
    label: user.readOnly === 1 ? "읽기전용" : "쓰기/읽기",
  },
});

const UserModal = ({
  onClose,
  Select_User,
  Update_Mode,
  setUpdate_Mode,
  Getting_All_User_Info,
  setSelect_User,
}) => {
  const [Input_User_Info, setInput_User_Info] = useState(() =>
    formatUserInfo(Select_User),
  );
  const [Option_Lists, setOption_Lists] = useState([]);

  const { request: getCommonData } = useApi(API_CONFIG.UserAPI.GET_COMMON_DATA);
  useEffect(() => {
    getCommonData({}, { onSuccess: (data) => setOption_Lists(data) });
  }, [getCommonData]);

  useEffect(() => {
    setInput_User_Info(formatUserInfo(Select_User));
  }, [Select_User, Update_Mode]);

  return (
    <Overlay>
      <Modal>
        <UserModalMainDivBox>
          {Update_Mode ? (
            <UpdateMode
              Select_User={Select_User}
              setUpdate_Mode={(data) => setUpdate_Mode(data)}
              setSelect_User={(data) => setSelect_User(data)}
              Input_User_Info={Input_User_Info}
              Option_Lists={Option_Lists}
              Getting_All_User_Info={Getting_All_User_Info}
              onClose={onClose}
              setInput_User_Info={(data) => setInput_User_Info(data)}
            ></UpdateMode>
          ) : (
            <ReadMode
              onClose={onClose}
              Select_User={Select_User}
              setUpdate_Mode={(data) => setUpdate_Mode(data)}
            ></ReadMode>
          )}
        </UserModalMainDivBox>
      </Modal>
    </Overlay>
  );
};

export default UserModal;
