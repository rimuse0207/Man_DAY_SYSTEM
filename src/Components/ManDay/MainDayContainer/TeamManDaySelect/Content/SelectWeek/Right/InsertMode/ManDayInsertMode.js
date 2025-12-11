import moment from "moment";
import React, { useEffect, useState } from "react";
import ManDayUpdateMode from "../UpdateMode/ManDayUpdateMode";
import { ContentMainPageMainDivBox } from "../../../../../ManDayApply/Contents/ContentMainPage";
import { toast } from "../../../../../../../ToastMessage/ToastManager";
import {
  Request_Get_Axios,
  Request_Post_Axios,
} from "../../../../../../../../API";

const ManDayInsertMode = ({
  NowDate,
  Now_Select_User,
  setSelect_Modes,
  Getting_Team_Member_Lists,
}) => {
  const [datess, setdatess] = useState([
    {
      date: moment(NowDate).clone().startOf("isoWeek").format("YYYY-MM-DD"),
    },
    {
      date: moment(NowDate).clone().isoWeekday(2).format("YYYY-MM-DD"),
    },
    {
      date: moment(NowDate).clone().isoWeekday(3).format("YYYY-MM-DD"),
    },
    {
      date: moment(NowDate).clone().isoWeekday(4).format("YYYY-MM-DD"),
    },
    {
      date: moment(NowDate).clone().isoWeekday(5).format("YYYY-MM-DD"),
    },
  ]);

  const [WeekContainer, setWeekContainer] = useState({
    ...Now_Select_User,
    keyCode: Now_Select_User?.man_day_infos?.map((item) => item.applyCode),
  });
  useEffect(() => {
    setWeekContainer({
      ...Now_Select_User,
      keyCode: Now_Select_User?.man_day_infos?.map((item) => item.applyCode),
    });
    setdatess([
      {
        date: moment(NowDate).clone().startOf("isoWeek").format("YYYY-MM-DD"),
      },
      {
        date: moment(NowDate).clone().isoWeekday(2).format("YYYY-MM-DD"),
      },
      {
        date: moment(NowDate).clone().isoWeekday(3).format("YYYY-MM-DD"),
      },
      {
        date: moment(NowDate).clone().isoWeekday(4).format("YYYY-MM-DD"),
      },
      {
        date: moment(NowDate).clone().isoWeekday(5).format("YYYY-MM-DD"),
      },
    ]);
  }, [Now_Select_User, NowDate]);

  const Handle_Input_Data_Man_Day_Func = async () => {
    // 대분류, 설비명, 구분 공란 체크
    if (
      WeekContainer?.man_day_infos?.some(
        (item) => !item.departCode || !item.subDepartCode || !item.divide
      )
    ) {
      toast.show({
        title: `공란을 전부 작성 해 주세요.`,
        successCheck: false,
        duration: 6000,
      });
      return;
    }

    /// Manday 합산 1 체크
    const Checking_Number_Sum_One = datess.map((list) => {
      return {
        date: list.date,
        data: WeekContainer?.man_day_infos?.filter(
          (item) => item.date === list.date
        ),
      };
    });
    const Chechking_Man_Day_Sum = Checking_Number_Sum_One.map((item) => {
      return {
        date: item.date,
        man_day: item.data.reduce((pre, acc) => pre + Number(acc.manDay), 0),
      };
    });
    if (
      Chechking_Man_Day_Sum.some(
        (item) => item.man_day !== 8 && item.man_day !== 0
      )
    ) {
      toast.show({
        title: `Man-day 합산은 8이 되어야 합니다.`,
        successCheck: false,
        duration: 6000,
      });
      return;
    }

    const Inserting_Man_Day_Info_By_Administrator_Axios =
      await Request_Post_Axios(
        "/TeamLeaderManDay/Inserting_Man_Day_Info_By_Administrator",
        {
          WeekContainer,
        }
      );
    if (Inserting_Man_Day_Info_By_Administrator_Axios.status) {
      toast.show({
        title: `정상적으로 변경처리 되었습니다.`,
        successCheck: true,
        duration: 4000,
      });
      await Getting_Team_Member_Lists();
    } else {
      toast.show({
        title: `오류가 발생되었습니다. IT팀에 문의바랍니다.`,
        successCheck: false,
        duration: 4000,
      });
    }
  };

  // 사용자 임시저장 데이터 가져오기
  const Getting_Temp_Save_Data = async () => {
    const Getting_Temp_Save_Data = await Request_Get_Axios(
      "/TeamLeaderManDay/Getting_Admin_Save_Temporarily_Man_Dat_Data",
      {
        Select_Date: NowDate,
        email: WeekContainer.email,
      }
    );
    if (Getting_Temp_Save_Data.status) {
      if (Getting_Temp_Save_Data.data.Have_Temporarily_Data) {
        setWeekContainer({
          ...WeekContainer,
          man_day_infos: Getting_Temp_Save_Data.data.data,
        });
      } else {
        toast.show({
          title: `임시저장한 데이터가 없습니다.`,
          successCheck: false,
          duration: 4000,
        });
      }
    }
  };

  return (
    <ContentMainPageMainDivBox>
      <h3 style={{ textAlign: "center" }}>
        {Now_Select_User
          ? `${Now_Select_User.departmentName} ${Now_Select_User.name} ${Now_Select_User.position}`
          : ""}
      </h3>
      <div className="Input_Cotainer">
        {datess.map((list) => {
          return (
            <ManDayUpdateMode
              key={list.date}
              List_Items={list}
              WeekContainer={WeekContainer}
              setWeekContainer={(data) => setWeekContainer(data)}
            ></ManDayUpdateMode>
          );
        })}
      </div>
      <div className="Mode_Button_Containers">
        <button onClick={() => setSelect_Modes("reading")}>취소</button>
        <button
          onClick={() => {
            Getting_Temp_Save_Data();
          }}
        >
          임시저장 불러오기
        </button>
        <button
          onClick={() => {
            Handle_Input_Data_Man_Day_Func();
          }}
        >
          Man_day 추가하기
        </button>
      </div>
    </ContentMainPageMainDivBox>
  );
};

export default ManDayInsertMode;
