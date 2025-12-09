import React from "react";
import { AnnualLeaveContainerMainPageMainDivBox } from "../ManDay/ManDayMainPage";
import TopNavigationMainPage from "../Navigation/TopNavigation/TopNavigationMainPage";
import SideNavigationMainPage from "../Navigation/SideNavigation/SideNavigationMainPage";
import ContentMainPage from "./Content/ContentMainPage";

const VideoUploadMainPage = () => {
  return (
    <AnnualLeaveContainerMainPageMainDivBox>
      <TopNavigationMainPage></TopNavigationMainPage>
      <div className="Personal_Main_Float">
        <div className="Personal_Main_Float_Left">
          <SideNavigationMainPage
            NavState={"Video_Upload"}
          ></SideNavigationMainPage>
        </div>

        <div className="Personal_Main_Float_Right">
          <ContentMainPage></ContentMainPage>
        </div>
      </div>
    </AnnualLeaveContainerMainPageMainDivBox>
  );
};

export default VideoUploadMainPage;
