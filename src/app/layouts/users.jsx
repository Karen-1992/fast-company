import React from "react";
import { useParams } from "react-router";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage/usersListPage";
import EditUserPage from "../components/page/editUserPage/editUserPage";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    return (
        <>
            {userId ? (
                edit ? (
                    <EditUserPage />
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
