import React, { useState } from "react";
import { Route, Routes, Router, BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginRoute from "./LoginRoute/LoginRouteMainPage";
import LoginMainPage from "../Login/LoginMainPage";
import HomeMainPage from "../../Components/HomeMain/HomeMainPage";
import ManDayMainPage from "../ManDay/ManDayMainPage";
import ManDayApplyMain from "../ManDay/MainDayContainer/ManDayApply/ManDayApplyMain";
import UserMainPage from "../User/UserMainPage";
import TeamManDaySelectMainPage from "../ManDay/MainDayContainer/TeamManDaySelect/TeamManDaySelectMainPage";
import ManDayExampleMainPage from "../ManDay/ManDayExampleMainPage";
import VideoUploadMainPage from "../VideoUpload/VideoUploadMainPage";
const RouterMainPage = () => {
  const User_Info = useSelector(
    (state) => state.Login_Info_Reducer_State.Login_Info
  );
  const [RouterInfo, setRouterInfo] = useState([
    {
      path: "/",
      element: <LoginMainPage></LoginMainPage>,
      withAuthorization: false,
      withAdminAuthorization: false,
    },
    {
      path: "/Home",
      element: <HomeMainPage></HomeMainPage>,
      withAuthorization: true,
      withAdminAuthorization: false,
    },
    {
      path: "/Man_Day",
      element: <ManDayMainPage></ManDayMainPage>,
      withAuthorization: true,
      withAdminAuthorization: false,
    },
    {
      path: "/Man_Day/Apply",
      element: <ManDayApplyMain></ManDayApplyMain>,
      withAuthorization: true,
      withAdminAuthorization: false,
    },
    {
      path: "/Man_Day/Team/Select",
      element: <TeamManDaySelectMainPage></TeamManDaySelectMainPage>,
      withAuthorization: true,
      withAdminAuthorization: true,
      needAccessToken: "man_day",
    },
    {
      path: "/User_Manage",
      element: <UserMainPage></UserMainPage>,
      withAuthorization: true,
      withAdminAuthorization: true,
      needAccessToken: "user",
    },

    {
      path: "/User_Manage/:Select_Menus",
      element: <UserMainPage></UserMainPage>,
      withAuthorization: true,
      withAdminAuthorization: true,
      needAccessToken: "user",
    },
    {
      path: "/Man_Day/Example",
      element: <ManDayExampleMainPage></ManDayExampleMainPage>,
      withAuthorization: false,
      withAdminAuthorization: false,
    },
    {
      path: "/Video_Upload",
      element: <VideoUploadMainPage></VideoUploadMainPage>,
      withAuthorization: true,
      withAdminAuthorization: false,
    },
  ]);

  return (
    <BrowserRouter>
      <Routes>
        {RouterInfo.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <LoginRoute
                  withAdminAuthorization={route.withAdminAuthorization}
                  withAuthorization={route.withAuthorization}
                  component={route.element}
                  User_Info={User_Info}
                  needAccessToken={route.needAccessToken}
                ></LoginRoute>
              }
            ></Route>
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};
export default RouterMainPage;
