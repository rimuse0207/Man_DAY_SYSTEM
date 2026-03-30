import moment from "moment";
import React, { useEffect, useState, useMemo } from "react";
import ManDayUpdateMode from "../UpdateMode/ManDayUpdateMode";
import { ContentMainPageMainDivBox } from "../../../../../ManDayApply/Contents/ContentMainPage";
import { toast } from "../../../../../../../ToastMessage/ToastManager";
import { useApi } from "../../../../../../../Common/Hooks/useApi";
import { API_CONFIG } from "../../../../../../../../API/config";
import { validateAdminManDay } from "../../../../../CommonFunc/CommonFunc";

const ManDayInsertMode = ({
  NowDate,
  Now_Select_User,
  setSelect_Modes,
  Getting_Team_Member_Lists,
}) => {
  const { request: addManDayByAdmin } = useApi(
    API_CONFIG.TeamLeaderAPI.ADD_MAN_DAY_DATA_BY_ADMIN,
  );
  const { request: getTemporaryManDayByAdmin } = useApi(
    API_CONFIG.TeamLeaderAPI.GET_TEMPORARY_MAN_DAY_DATA_BY_ADMIN,
  );

  const weekDays = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => ({
      date: moment(NowDate)
        .clone()
        .isoWeekday(index + 1)
        .format("YYYY-MM-DD"),
    }));
  }, [NowDate]);

  const [WeekContainer, setWeekContainer] = useState({});

  useEffect(() => {
    if (Now_Select_User) {
      setWeekContainer({
        ...Now_Select_User,
        keyCode:
          Now_Select_User.man_day_infos?.map((item) => item.applyCode) || [],
      });
    }
  }, [Now_Select_User]);

  const handleSaveData = () => {
    const errorMessage = validateAdminManDay(WeekContainer?.man_day_infos);
    if (errorMessage) {
      toast.show({ title: errorMessage, successCheck: false, duration: 6000 });
      return;
    }

    addManDayByAdmin(
      { WeekContainer },
      {
        onSuccess: () => {
          toast.show({
            title: `정상적으로 변경처리 되었습니다.`,
            successCheck: true,
            duration: 4000,
          });
          Getting_Team_Member_Lists();
        },
      },
    );
  };

  const handleLoadTempData = () => {
    getTemporaryManDayByAdmin(
      { Select_Date: NowDate, email: WeekContainer.email },
      {
        onSuccess: (data) => {
          if (data.Have_Temporarily_Data) {
            setWeekContainer((prev) => ({
              ...prev,
              man_day_infos: data.data,
            }));
            toast.show({
              title: `임시저장한 데이터를 불러왔습니다.`,
              successCheck: true,
              duration: 3000,
            });
          } else {
            toast.show({
              title: `임시저장한 데이터가 없습니다.`,
              successCheck: false,
              duration: 4000,
            });
          }
        },
      },
    );
  };

  if (!Now_Select_User) return null;

  return (
    <ContentMainPageMainDivBox>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
        {Now_Select_User.departmentName} {Now_Select_User.name}{" "}
        {Now_Select_User.position}
      </h3>

      <div className="Input_Cotainer">
        {weekDays.map((list) => (
          <ManDayUpdateMode
            key={list.date}
            List_Items={list}
            WeekContainer={WeekContainer}
            setWeekContainer={setWeekContainer}
          />
        ))}
      </div>

      <div className="Mode_Button_Containers">
        <button onClick={() => setSelect_Modes("reading")}>취소</button>
        <button onClick={handleLoadTempData}>임시저장 불러오기</button>
        <button onClick={handleSaveData}>Man_day 추가하기</button>
      </div>
    </ContentMainPageMainDivBox>
  );
};

export default ManDayInsertMode;
