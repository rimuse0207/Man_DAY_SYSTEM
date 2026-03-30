import React, { Fragment, useMemo } from "react";
import UserHeader from "../../../Public/UserHeader";
import { UserModalMainDivBox } from "../UserModal";
import { UserContentMainPageButtonContainer } from "../../UserContentMainPage";
import Select from "react-select";
import { useApi } from "../../../../Common/Hooks/useApi";
import { API_CONFIG } from "../../../../../API/config";
import { toast } from "../../../../ToastMessage/ToastManager";
import { SelectStyles } from "../../../../Common/Styled";

const UpdateMode = ({
  Select_User,
  Input_User_Info,
  setSelect_User,
  setUpdate_Mode,
  Option_Lists,
  Getting_All_User_Info,
  onClose,
  setInput_User_Info,
}) => {
  const { request: updateUserInfoApi } = useApi(API_CONFIG.UserAPI.UPDATE_USER);
  const { request: resetPasswordApi } = useApi(
    API_CONFIG.UserAPI.RESET_PASSWORD,
  );

  const options = useMemo(() => {
    const filterAndMap = (type) =>
      Option_Lists.filter((item) => item.divideType === type).map((list) => ({
        value: list.itemCode,
        label: list.itemName,
      }));
    return {
      position: filterAndMap("position"),
      department: filterAndMap("department"),
      gradebounce: filterAndMap("gradebounce"),
      salarygrade: filterAndMap("salarygrade"),
      occupational: filterAndMap("occupational"),
    };
  }, [Option_Lists]);

  const Handle_Reset_Password = (Select_Type) => {
    const confirmMsg =
      Select_Type === "retire"
        ? "정말로 퇴직처리 하시겠습니까?"
        : Select_Type === "cancel"
          ? "정말로 원복처리 하시겠습니까?"
          : null;

    if (confirmMsg && !window.confirm(confirmMsg)) return;

    resetPasswordApi(
      { Select_User, Select_Menu: Select_Type },
      {
        onSuccess: async () => {
          if (Select_Type === "password_reset") {
            toast.show({
              title: `${Select_User.name}님의 비밀번호를 '1234'로 변경처리 하였습니다.`,
              successCheck: true,
            });
          } else {
            const actionText =
              Select_Type === "retire" ? "퇴직처리" : "원복처리";
            toast.show({
              title: `${Select_User.name}님을 ${actionText} 하였습니다.`,
              successCheck: true,
            });
            if (Select_Type === "cancel") {
              toast.show({
                title: `원복처리되어 비밀번호가 1234로 변경되었습니다.`,
                successCheck: true,
              });
            }
            await Getting_All_User_Info();
            onClose();
          }
          setUpdate_Mode(false);
        },
      },
    );
  };

  const Handle_Update_User_Info_Data = () => {
    const { department, salarygrade, occupational, gradebounce } =
      Input_User_Info;
    if (!department || !salarygrade || !occupational || !gradebounce) {
      return toast.show({
        title: `빈 항목을 전부 채워 주세요.`,
        successCheck: false,
      });
    }

    updateUserInfoApi(
      { Input_User_Info },
      {
        onSuccess: async (data) => {
          toast.show({
            title: `사용자를 정상적으로 변경 처리하였습니다.`,
            successCheck: true,
          });
          setSelect_User(data);
          await Getting_All_User_Info();
          setUpdate_Mode(false);
        },
      },
    );
  };

  const USER_FORM_FIELDS = [
    { id: "name", label: "이름", type: "input", inputType: "text" },
    {
      id: "position",
      label: "직위",
      type: "select",
      options: options.position,
    },
    {
      id: "department",
      label: "부서",
      type: "select",
      options: options.department,
    },
    {
      id: "gradebounce",
      label: "연차",
      type: "select",
      options: options.gradebounce,
    },
    {
      id: "salarygrade",
      label: "호봉",
      type: "select",
      options: options.salarygrade,
    },
    {
      id: "occupational",
      label: "직군",
      type: "select",
      options: options.occupational,
    },
    {
      id: "dailyExpense",
      label: "일급(만원)",
      type: "input",
      inputType: "number",
      step: 10,
    },
    {
      id: "SelectreadOnly",
      label: "읽기전용",
      type: "select",
      options: [
        { value: "readOnly", label: "읽기전용" },
        { value: "writeAndreading", label: "쓰기/읽기" },
      ],
    },
  ];

  const handleInputChange = (key, value) => {
    setInput_User_Info((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <UserModalMainDivBox>
      <div className="Float_Top_Container">
        <UserHeader
          title={"사용자 상세"}
          subDescript={"사용자 상세를 조회하고 수정/관리 할 수 있습니다."}
        />
        <UserContentMainPageButtonContainer>
          <button onClick={() => setUpdate_Mode(false)}>취소</button>
          <button onClick={() => Handle_Reset_Password("password_reset")}>
            비밀번호 초기화
          </button>
          {Select_User.inservice === 1 ? (
            <button onClick={() => Handle_Reset_Password("retire")}>
              퇴직
            </button>
          ) : (
            <button onClick={() => Handle_Reset_Password("cancel")}>
              원복
            </button>
          )}
        </UserContentMainPageButtonContainer>
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <td>{Select_User.email}</td>
            </tr>
            {USER_FORM_FIELDS.map((field) => (
              <tr key={field.id}>
                <th>{field.label}</th>
                <td style={field.type === "input" ? { padding: "10px" } : {}}>
                  {field.type === "input" && (
                    <input
                      type={field.inputType}
                      step={field.step}
                      value={Input_User_Info[field.id] || ""}
                      onChange={(e) =>
                        handleInputChange(field.id, e.target.value)
                      }
                    />
                  )}

                  {field.type === "select" && (
                    <Select
                      value={Input_User_Info[field.id]}
                      onChange={(selectedOption) =>
                        handleInputChange(field.id, selectedOption)
                      }
                      isClearable
                      options={field.options}
                      styles={SelectStyles}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserContentMainPageButtonContainer style={{ marginTop: "20px" }}>
        <button onClick={Handle_Update_User_Info_Data}>수정</button>
      </UserContentMainPageButtonContainer>
    </UserModalMainDivBox>
  );
};

export default UpdateMode;
