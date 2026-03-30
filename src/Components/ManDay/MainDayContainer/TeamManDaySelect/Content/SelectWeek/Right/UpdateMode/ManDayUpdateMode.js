import moment from "moment";
import React from "react";
import { InputPageMainDivBox } from "../../../../../ManDayApply/Contents/InputPage";
import { MdDeleteForever } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import ManDayInputSelect from "./ManDayInputSelect";
import "moment/locale/ko";

const ManDayUpdateMode = ({ WeekContainer, setWeekContainer, List_Items }) => {
  const currentDateInfos = (WeekContainer?.man_day_infos || []).filter(
    (item) => item.date === List_Items.date,
  );

  const handleDeleteData = (selectData) => {
    setWeekContainer((prev) => ({
      ...prev,
      man_day_infos: (prev.man_day_infos || []).filter(
        (item) => item.indexs !== selectData.indexs,
      ),
    }));
  };

  const handleAddChild = () => {
    const addItems = {
      applyCode: null,
      calculateDailyExpense: 0,
      date: List_Items.date,
      depart: null,
      departCode: null,
      departmentCode: null,
      divide: null,
      divideCode: null,
      email: WeekContainer?.email || "",
      indexs: `${List_Items.date}_${moment().format("YYYYMMDDHHmmssSSS")}`,
      manDay: 0,
      originalDailyExpense: 0,
      subDepartCode: null,
      sub_depart: null,
    };

    setWeekContainer((prev) => ({
      ...prev,
      man_day_infos: [...(prev.man_day_infos || []), addItems],
    }));
  };

  return (
    <InputPageMainDivBox>
      <div
        style={{ textAlign: "center", fontWeight: "bolder", margin: "10px 0" }}
      >
        {moment(List_Items.date).format("MM.DD dddd")}
      </div>

      <div>
        {currentDateInfos.map((list, j) => (
          <div key={list.indexs}>
            <div className="Delete_Container">
              <div>{j + 1}.</div>
              <div
                className="Delete_Button"
                onClick={() => handleDeleteData(list)}
              >
                <MdDeleteForever />
              </div>
            </div>

            <ManDayInputSelect
              Now_Data={list}
              WeekContainer={WeekContainer}
              setWeekContainer={setWeekContainer}
            />
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "40px" }}>
        <div className="Plus_Container" onClick={handleAddChild}>
          <FaPlus />
        </div>
      </div>
    </InputPageMainDivBox>
  );
};

export default ManDayUpdateMode;
