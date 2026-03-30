import React, { useEffect, useState } from "react";
import RestrictRoute from "../RestrictRoute/RestrictRoute";
import { useAuth } from "../../Common/Hooks/Login/useAuth";
import { useNavigate } from "react-router-dom";

const LoginRoute = ({
  withAdminAuthorization,
  withAuthorization,
  component,
  User_Info,
  needAccessToken,
}) => {
  const navigate = useNavigate();
  const { checkAutoLogin } = useAuth();
  const [blockContent, setBlockContent] = useState(false);

  useEffect(() => {
    const verify = async () => {
      if (withAuthorization) {
        const { isLogged } = await checkAutoLogin();
        if (!isLogged) {
          alert("로그인 세션이 만료되었습니다.");
          navigate("/");
        }
      }
    };
    verify();
  }, [withAuthorization, checkAutoLogin, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBlockContent(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!withAuthorization) return <div>{component}</div>;

  const content = blockContent ? component : null;

  return withAdminAuthorization ? (
    <RestrictRoute
      component={component}
      User_Info={User_Info}
      needAccessToken={needAccessToken}
    >
      {content}
    </RestrictRoute>
  ) : (
    <div>{content}</div>
  );
};

export default LoginRoute;
