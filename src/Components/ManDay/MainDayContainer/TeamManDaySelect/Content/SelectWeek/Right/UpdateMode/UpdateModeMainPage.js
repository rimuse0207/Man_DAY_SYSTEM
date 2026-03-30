import React, { useEffect, useState, useMemo } from "react";
import { ContentMainPageMainDivBox } from "../../../../../ManDayApply/Contents/ContentMainPage";
import ManDayUpdateMode from "./ManDayUpdateMode";
import moment from "moment";
import { toast } from "../../../../../../../ToastMessage/ToastManager";
import { useApi } from "../../../../../../../Common/Hooks/useApi";
import { API_CONFIG } from "../../../../../../../../API/config";
import { validateAdminManDay } from "../../../../../CommonFunc/CommonFunc";

const UpdateModeMainPage = ({
  Now_Select_User,
  NowDate,
  setSelect_Modes,
  Getting_Team_Member_Lists,
}) => {
  const { request: updateManDayDataByAdmin } = useApi(
    API_CONFIG.TeamLeaderAPI.UPDATE_MAN_DAY_DATA_BY_ADMIN,
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

  const handleUpdateData = () => {
    const errorMessage = validateAdminManDay(WeekContainer?.man_day_infos);

    if (errorMessage) {
      toast.show({ title: errorMessage, successCheck: false, duration: 6000 });
      return;
    }

    //// 데이터 체크 완료, 데이터 저장
    updateManDayDataByAdmin(
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
        <button onClick={handleUpdateData}>Man_day 수정하기</button>
      </div>
    </ContentMainPageMainDivBox>
  );
};

export default UpdateModeMainPage;
