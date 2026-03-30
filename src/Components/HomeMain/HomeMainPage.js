import React, { useEffect } from "react";
import NavigationMainPage from "../Navigation/NavigationMainPage";
import IconNavigationMainPage from "../Navigation/IconNavigation/IconNavigationMainPage";

import HomeContainer from "./HomeContainer/HomeContainer";

const HomeMainPage = () => {
  return (
    <div>
      <NavigationMainPage></NavigationMainPage>
      <IconNavigationMainPage></IconNavigationMainPage>
      <HomeContainer></HomeContainer>
    </div>
  );
};
export default HomeMainPage;
