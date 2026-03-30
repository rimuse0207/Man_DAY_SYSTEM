import React, { useEffect, useState } from "react";
import {
  Modal,
  Overlay,
} from "../../Department/Contents/Modal/DepartmentMoveModal";
import { UserContentMainPageButtonContainer } from "../UserContentMainPage";
import Select from "react-select";
import { UserModalMainDivBox } from "./UserModal";
import { toast } from "../../../ToastMessage/ToastManager";
import { TbHierarchy3 } from "react-icons/tb";
import DepartSelectModal from "../../../ManDay/MainDayContainer/TeamManDaySelect/Content/Statistic/CommonFilters/DepartSelectModal/DepartSelectModal";
import UserHeader from "../../Public/UserHeader";
import { useApi } from "../../../Common/Hooks/useApi";
import { API_CONFIG } from "../../../../API/config";
import { SelectStyles } from "../../../Common/Styled/index";

const initial_state = {
  company: null,
  email: "",
  name: "",
  department: null,
  salarygrade: null,
  occupational: null,
  gradebounce: null,
  position: null,
  dailyExpense: 0,
};

const USER_FORM_CONFIG = [
  { id: "company", label: "회사명", type: "select", divideType: "company" },
  {
    id: "email",
    label: "EMAIL",
    type: "input",
    placeholder: "XXXXXX@exicon.co.kr",
  },
  { id: "name", label: "이름", type: "input", placeholder: "홍길동" },
  { id: "position", label: "직위", type: "select", divideType: "position" },
  {
    id: "department",
    label: "부서",
    type: "select",
    divideType: "department",
    hasSearchIcon: true,
  }, // 부서만 특별히 아이콘 추가
  {
    id: "gradebounce",
    label: "연차",
    type: "select",
    divideType: "gradebounce",
  },
  {
    id: "salarygrade",
    label: "호봉",
    type: "select",
    divideType: "salarygrade",
  },
  {
    id: "occupational",
    label: "직군",
    type: "select",
    divideType: "occupational",
  },
  {
    id: "dailyExpense",
    label: "일급(만원)",
    type: "input",
    inputType: "number",
    step: 10,
  },
];

const AddUserModal = ({ Getting_All_User_Info, onClose }) => {
  const [Input_User_Info, setInput_User_Info] = useState(initial_state);
  const [Option_Lists, setOption_Lists] = useState([]);
  const [DepartSelectModalIsOpen, setDepartSelectModalIsOpen] = useState(false);

  const { request: getCommonData } = useApi(API_CONFIG.UserAPI.GET_COMMON_DATA);
  const { request: addUser } = useApi(API_CONFIG.UserAPI.ADD_USER);

  useEffect(() => {
    getCommonData({}, { onSuccess: (data) => setOption_Lists(data) });
  }, [getCommonData]);

  const Handle_Add_User_Info = async () => {
    const {
      company,
      email,
      name,
      department,
      salarygrade,
      occupational,
      gradebounce,
      position,
      dailyExpense,
    } = Input_User_Info;
    if (
      !company ||
      !email ||
      !name ||
      !department ||
      !salarygrade ||
      !occupational ||
      !gradebounce ||
      !position ||
      !dailyExpense < 0
    ) {
      toast.show({
        title: `공란을 전부 작성 후 등록 가능합니다.`,
        successCheck: false,
        duration: 6000,
      });
      return;
    }
    addUser(
      { Input_User_Info },
      {
        onSuccess: async (data) => {
          // 중복 사용자 거절
          if (data.dupleChecking) {
            toast.show({
              title: `이미 등록된 사용자가 있습니다. Email을 다시 확인 해 주세요.`,
              successCheck: false,
              duration: 6000,
            });
            return;
          }

          // 사용자 추가 완료
          toast.show({
            title: `${Input_User_Info.name}님을 추가하였습니다. 최초 비밀번호는 '1234'입니다.`,
            successCheck: true,
            duration: 6000,
          });
          await Getting_All_User_Info();
          onClose();
          setInput_User_Info(initial_state);
        },
      },
    );
  };

  const handleInputChange = (key, value) => {
    setInput_User_Info((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getSelectOptions = (divideType) => {
    return Option_Lists.filter((item) => item.divideType === divideType).map(
      (list) => ({ value: list.itemCode, label: list.itemName }),
    );
  };

  return (
    <Overlay>
      <Modal>
        <UserModalMainDivBox>
          <div className="Float_Top_Container">
            <UserHeader
              title={"사용자 상세"}
              subDescript={"사용자 상세를 조회하고 수정/관리 할 수 있습니다."}
            />
            <UserContentMainPageButtonContainer>
              <button
                onClick={() => {
                  onClose();
                  setInput_User_Info(initial_state);
                }}
              >
                취소
              </button>
            </UserContentMainPageButtonContainer>
          </div>
          <div>
            <table>
              <tbody>
                {USER_FORM_CONFIG.map((field) => (
                  <tr key={field.id}>
                    <th>{field.label}</th>
                    <td
                      style={field.type === "input" ? { padding: "10px" } : {}}
                    >
                      {field.type === "input" && (
                        <input
                          type={field.inputType || "text"}
                          step={field.step}
                          placeholder={field.placeholder}
                          value={Input_User_Info[field.id] || ""}
                          onChange={(e) =>
                            handleInputChange(field.id, e.target.value)
                          }
                        />
                      )}

                      {field.type === "select" && (
                        <div
                          style={
                            field.hasSearchIcon
                              ? { display: "flex", gap: "5px" }
                              : {}
                          }
                        >
                          <div
                            style={
                              field.hasSearchIcon
                                ? { flex: 1 }
                                : { width: "100%" }
                            }
                          >
                            <Select
                              value={Input_User_Info[field.id]}
                              onChange={(selectedOption) =>
                                handleInputChange(field.id, selectedOption)
                              }
                              isClearable
                              options={getSelectOptions(field.divideType)}
                              styles={SelectStyles}
                            />
                          </div>

                          {field.hasSearchIcon && (
                            <div
                              style={{
                                border: "1px solid lightgray",
                                borderRadius: "5px",
                                width: "40px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: "1.3em",
                                cursor: "pointer",
                              }}
                              className="Search_Icon_Container"
                              onClick={() => setDepartSelectModalIsOpen(true)}
                            >
                              <TbHierarchy3 />
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <UserContentMainPageButtonContainer style={{ marginTop: "20px" }}>
            <button
              onClick={() => {
                Handle_Add_User_Info();
              }}
            >
              추가
            </button>
          </UserContentMainPageButtonContainer>
        </UserModalMainDivBox>
        {DepartSelectModalIsOpen && (
          <DepartSelectModal
            onClose={() => setDepartSelectModalIsOpen(false)}
            Select_Types={"user"}
            Input_User_Info={Input_User_Info}
            setInput_User_Info={(data) => setInput_User_Info(data)}
          ></DepartSelectModal>
        )}
      </Modal>
    </Overlay>
  );
};
export default AddUserModal;
