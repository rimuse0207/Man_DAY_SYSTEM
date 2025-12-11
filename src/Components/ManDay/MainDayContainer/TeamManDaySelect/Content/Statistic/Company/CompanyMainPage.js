import React, { useEffect, useState } from "react";
import CommonFilters from "../CommonFilters/CommonFilters";
import { PersonMainPageMainDivBox } from "../Person/PersonMainPage";
import { Request_Get_Axios } from "../../../../../../../API";
import { useSelector } from "react-redux";
import BarGraph from "../Person/BarGraph";
import PieGraph from "./PieGraph";
import Loader from "../../../../../../Loader/Loader";

const CompanyMainPage = ({ menuCode }) => {
  const Filter_State = useSelector(
    (state) => state.Man_Day_Select_Filter_Reducer_State.Filters_State
  );
  const [depart_Bar_State, setdepart_Bar_State] = useState([]);
  const [sub_depart_Bar_State, setsub_depart_Bar_State] = useState([]);
  const [department_Pie_State, setdepartment_Pie_State] = useState([]);
  const [gradbounce_Pie_State, setgradbounce_Pie_State] = useState([]);
  const [CompanyInfos, setCompanyInfos] = useState({
    value: "all",
    label: "전체",
  });
  const [companyChecking, setcompanyChecking] = useState(false);
  const [Loading_Check, setLoading_Check] = useState(false);
  useEffect(() => {
    Getting_Company_Data();
  }, [companyChecking]);
  const Getting_Company_Data = async () => {
    setLoading_Check(true);
    try {
      const Getting_Company_Data_Axios = await Request_Get_Axios(
        "/TeamLeaderManDay/Getting_Company_Data",
        {
          Filter_State,
          companyChecking: companyChecking,
        }
      );

      if (Getting_Company_Data_Axios.status) {
        setdepart_Bar_State(Getting_Company_Data_Axios.data.depart_Bar_Data);
        setsub_depart_Bar_State(
          Getting_Company_Data_Axios.data.sub_depart_Bar_Data
        );
        setdepartment_Pie_State(
          Getting_Company_Data_Axios.data.User_Counting_Pie_Data
        );
        setgradbounce_Pie_State(
          Getting_Company_Data_Axios.data.Based_Annual_Leave_User_Count_Pie_Data
        );
        setCompanyInfos(Filter_State.company);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading_Check(false);
  };

  return (
    <PersonMainPageMainDivBox>
      <CommonFilters
        menuCode={menuCode}
        Getting_Person_Bar_State={() => Getting_Company_Data()}
      ></CommonFilters>
      <div className="User_Info_Container">
        <div className="User_Content_Container">
          <span>총원 : </span>
          <span>
            {department_Pie_State.reduce((pre, acc) => pre + acc.value, 0)}명
          </span>
        </div>
        <div>
          <input
            type="checkbox"
            value={companyChecking}
            onClick={() => setcompanyChecking(!companyChecking)}
            id="inputChecking"
          ></input>
          <label htmlFor="inputChecking">
            관계사 업무에 참여하는 MD 반영하기
          </label>
        </div>
      </div>
      {CompanyInfos?.value ? (
        <h3 style={{ textAlign: "center" }}>
          {CompanyInfos.value === "all" ? "YC & EXICON" : CompanyInfos.value}{" "}
          Man_day
        </h3>
      ) : (
        <></>
      )}
      <h3>설비군</h3>
      <BarGraph Bar_State={depart_Bar_State}></BarGraph>
      <h3>설비명</h3>
      <BarGraph Bar_State={sub_depart_Bar_State}></BarGraph>
      <h3 style={{ textAlign: "center" }}>
        {Filter_State.company.value === "all"
          ? "YC & EXICON"
          : Filter_State.company.value}{" "}
        인력 구성
      </h3>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <PieGraph Pie_State={department_Pie_State}></PieGraph>
        </div>
        <div style={{ width: "50%" }}>
          <PieGraph
            Pie_State={gradbounce_Pie_State.filter((item) => item.value > 0)}
          ></PieGraph>
        </div>
      </div>
      <div style={{ padding: "20px" }}></div>
      <Loader loading={Loading_Check}></Loader>
    </PersonMainPageMainDivBox>
  );
};

export default CompanyMainPage;
