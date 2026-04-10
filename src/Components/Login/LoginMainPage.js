import React, { useEffect, useState } from "react";
import { toast } from "../ToastMessage/ToastManager";
import LoginContent from "./Contents/LoginContent";
import PasswordChangeContent from "./Contents/PasswordChangeContent";

import { LoginMainPageDivBox } from "../Common/Styled/Login/LoginStyled";
import { useAuth } from "../Common/Hooks/Login/useAuth";
import { isValidPassword } from "../Common/Utils/validation";
import { useNavigate } from "react-router-dom";

const LoginMainPage = () => {
  const navigate = useNavigate();
  const { checkAutoLogin, login, changePassword } = useAuth();

  const [isPasswordChangeMode, setIsPasswordChangeMode] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: localStorage.getItem("userId") || "",
    password: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    email: "",
    password: "",
    passwordCheck: "",
  });

  useEffect(() => {
    const init = async () => {
      const { isLogged } = await checkAutoLogin();
      if (isLogged) navigate("/Home");
    };
    init();
  }, [checkAutoLogin, navigate]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!loginForm.email || !loginForm.password) {
      toast.show({
        title: `ID 또는 패스워드를 확인 해 주세요.`,
        successCheck: false,
        duration: 3000,
      });
      setLoginForm((prev) => ({ ...prev, password: "" }));
      return;
    }

    login(loginForm, {
      onRequirePasswordChange: () => {
        setIsPasswordChangeMode(true);
        setPasswordForm((prev) => ({ ...prev, email: loginForm.email }));
      },
      onError: () => setLoginForm((prev) => ({ ...prev, password: "" })),
    });
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    const { password, passwordCheck } = passwordForm;

    if (password.length < 4) {
      toast.show({
        title: `비밀번호는 4자리 이상으로 설정 해 주세요.`,
        successCheck: false,
        duration: 3000,
      });
      resetPasswordForm();
      return;
    }
    if (password !== passwordCheck) {
      toast.show({
        title: `비밀번호가 서로 다릅니다.`,
        successCheck: false,
        duration: 3000,
      });
      return;
    }
    if (!isValidPassword(password)) {
      toast.show({
        title: `비밀번호에 ' , { , } 또는 \`는 사용할 수 없습니다.`,
        successCheck: false,
        duration: 3000,
      });
      return;
    }

    changePassword(passwordForm, {
      onSuccess: () => {
        setIsPasswordChangeMode(false);
        setLoginForm((prev) => ({ ...prev, password: "" }));
        resetPasswordForm();
      },
      onError: () => resetPasswordForm(),
    });
  };

  const resetPasswordForm = () => {
    setPasswordForm({ email: "", password: "", passwordCheck: "" });
  };

  return (
    <LoginMainPageDivBox>
      <div className="page-container">
        <div className="login-form-container shadow">
          <div className="login-form-right-side">
            <div className="top-logo-wrap"></div>
            <h1>MAN-DAY 시스템</h1>
            <p>* 문의사항은 jiseop.kim@exicon.co.kr에게 문의바랍니다.</p>
          </div>

          {isPasswordChangeMode ? (
            <PasswordChangeContent
              Change_password={passwordForm}
              setChange_password={setPasswordForm}
              HandleChangePassword={handleChangePasswordSubmit}
            />
          ) : (
            <LoginContent
              LoginDataInfo={loginForm}
              setLoginDataInfo={setLoginForm}
              handleClicksLogin={handleLoginSubmit}
            />
          )}
        </div>
      </div>
    </LoginMainPageDivBox>
  );
};

export default LoginMainPage;
