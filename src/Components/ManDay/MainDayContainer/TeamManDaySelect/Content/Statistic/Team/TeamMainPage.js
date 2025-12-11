import React, { useEffect, useState } from "react";
import CommonFilters from "../CommonFilters/CommonFilters";
import { PersonMainPageMainDivBox } from "../Person/PersonMainPage";
import { Request_Get_Axios } from "../../../../../../../API";
import { useSelector } from "react-redux";
import BarGraph from "../Person/BarGraph";
import PieGraph from "../Company/PieGraph";
import Loader from "../../../../../../Loader/Loader";

const TeamMainPage = ({ menuCode }) => {
  const Filter_State = useSelector(
    (state) => state.Man_Day_Select_Filter_Reducer_State.Filters_State
  );
  const [Bar_State, setBar_State] = useState([]);
  const [Pie_State, setPie_State] = useState([]);
  const [grade_bounce_Pie_State, setgrade_bounce_Pie_State] = useState([]);
  const [TextInfo, setTextInfo] = useState(null);
  const [Loading_Check, setLoading_Check] = useState(false);

  useEffect(() => {
    if (Filter_State.statisticTeam) {
      Getting_Team_Part_Bar_State();
    }
  }, []);

  const Getting_Team_Part_Bar_State = async () => {
    setLoading_Check(true);
    const Getting_Person_Bar_State_Axios = await Request_Get_Axios(
      "/TeamLeaderManDay/Getting_Team_Part_Bar_State",
      {
        Filter_State,
      }
    );
    if (Getting_Person_Bar_State_Axios.status) {
      setBar_State(Getting_Person_Bar_State_Axios.data.Bar_Data);
      setPie_State(Getting_Person_Bar_State_Axios.data.Pie_Data);
      setgrade_bounce_Pie_State(
        Getting_Person_Bar_State_Axios.data.Grade_Bounce_Pie_Data
      );
      setTextInfo(Filter_State.statisticTeam);
    }
    setLoading_Check(false);
  };
  return (
    <PersonMainPageMainDivBox>
      <CommonFilters
        menuCode={menuCode}
        Getting_Person_Bar_State={() => Getting_Team_Part_Bar_State()}
      ></CommonFilters>
      <div>
        <h2 style={{ textAlign: "center" }}>
          {" "}
          {TextInfo?.itemName
            ? `${TextInfo?.divideType === "PART" ? "파트 : " : "팀 : "}${
                TextInfo?.itemName
              } 공수정보`
            : ""}{" "}
        </h2>
        <BarGraph Bar_State={Bar_State}></BarGraph>
      </div>
      <div style={{ display: "flex" }}>
        {/* <div style={{ width: '50%' }}>
                    <PieGraph Pie_State={Pie_State}></PieGraph>
                </div> */}
        {TextInfo?.itemName ? (
          TextInfo?.divideType === "PART" ? (
            <></>
          ) : (
            <div style={{ width: "50%" }}>
              <h3 style={{ textAlign: "center" }}>{TextInfo?.itemName} 구성</h3>
              <PieGraph Pie_State={Pie_State}></PieGraph>
            </div>
          )
        ) : (
          <></>
        )}
        <div style={{ width: "50%" }}>
          <h3 style={{ textAlign: "center" }}>연차 분포</h3>
          <PieGraph
            Pie_State={grade_bounce_Pie_State.filter((item) => item.value > 0)}
          ></PieGraph>
        </div>
      </div>
      <div style={{ padding: "20px" }}></div>
      <Loader loading={Loading_Check}></Loader>
    </PersonMainPageMainDivBox>
  );
};

export default TeamMainPage;
