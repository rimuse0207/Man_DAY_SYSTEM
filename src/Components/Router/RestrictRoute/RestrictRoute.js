import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from '../../ToastMessage/ToastManager';

const RestrictRoute = ({ component, User_Info }) => {
    const withAdminAuthorization = false;
    const Alert_Go_To_Main_Home = () => {
        toast.show({
            title: `관리자 권한이 없습니다.`,
            successCheck: false,
            duration: 6000,
        });
        return <Navigate to="/Home" />;
    };

    return withAdminAuthorization ? { component } : Alert_Go_To_Main_Home();
};

export default RestrictRoute;
