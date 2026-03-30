import React, { useMemo } from "react";
import { SelectBoxsMainDivBox } from "../../../../../ManDayApply/Contents/SelectBoxs";
import { useSelector, shallowEqual } from "react-redux";

const ManDayInputSelect = ({ Now_Data, setWeekContainer }) => {
  const {
    Depart_Option_Lists,
    Sub_Depart_Option_Lists,
    Divide_Depart_Option_Lists,
  } = useSelector(
    (state) => state.Man_Day_Select_Option_Lists_State,
    shallowEqual,
  );

  const updateCurrentItem = (updates) => {
    setWeekContainer((prev) => ({
      ...prev,
      man_day_infos: prev.man_day_infos.map((item) =>
        item.date === Now_Data.date && item.indexs === Now_Data.indexs
          ? { ...item, ...updates }
          : item,
      ),
    }));
  };

  const handleManDayChange = (e) => {
    const val = e.target.value;

    if (val === "") {
      updateCurrentItem({ manDay: "" });
      return;
    }

    const num = Number(val);
    if (!isNaN(num) && Number.isInteger(num) && num >= 0 && num <= 8) {
      updateCurrentItem({ manDay: num });
    }
  };

  const subDepartOptions = useMemo(() => {
    if (!Now_Data.departCode) return [];

    return Sub_Depart_Option_Lists.filter(
      (item) => item.itemParentCode === Now_Data.departCode,
    ).sort((a, b) => a.itemRank - b.itemRank);
  }, [Sub_Depart_Option_Lists, Now_Data.departCode]);

  const divideOptions = useMemo(() => {
    if (!Now_Data.subDepartCode) return [];

    return Divide_Depart_Option_Lists.filter(
      (item) => item.itemParentCode === Now_Data.subDepartCode,
    ).sort((a, b) => a.itemRank - b.itemRank);
  }, [Divide_Depart_Option_Lists, Now_Data.subDepartCode]);

  return (
    <SelectBoxsMainDivBox style={{ fontSize: "0.8em" }}>
      <div className="Input_GR">
        <div className="Title">설비군</div>
        <div className="Answer">
          <select
            name="departCode"
            value={Now_Data.departCode || ""}
            onChange={(e) => {
              updateCurrentItem({
                departCode: e.target.value,
                subDepartCode: "",
                divide: "",
              });
            }}
          >
            <option value=""></option>

            {Depart_Option_Lists.map((list) => (
              <option value={list.itemCode} key={list.itemCode}>
                {list.itemName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="Input_GR">
        <div className="Title">설비명</div>
        <div className="Answer">
          <select
            name="subDepartCode"
            value={Now_Data.subDepartCode || ""}
            onChange={(e) => {
              updateCurrentItem({
                subDepartCode: e.target.value,
                divide: "",
              });
            }}
          >
            <option value=""></option>
            {subDepartOptions.map((list) => (
              <option value={list.itemCode} key={list.itemCode}>
                {list.itemName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="Input_GR">
        <div className="Title">업무 유형</div>
        <div className="Answer">
          <select
            value={Now_Data.divide || ""}
            onChange={(e) => updateCurrentItem({ divide: e.target.value })}
          >
            <option value=""></option>
            {divideOptions.map((list) => (
              <option value={list.itemCode} key={list.itemCode}>
                {list.itemName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="Input_GR">
        <div className="Title">Man-day(시간)</div>
        <div className="Answer">
          <input
            value={Now_Data.manDay !== undefined ? Now_Data.manDay : ""}
            type="number"
            min={0}
            max={8}
            step={1}
            onChange={handleManDayChange}
          />
        </div>
      </div>
    </SelectBoxsMainDivBox>
  );
};

export default ManDayInputSelect;
