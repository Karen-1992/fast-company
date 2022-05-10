import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "../../common/loader";
import api from "../../../api";
import Qualities from "../../ui/qualities";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    const history = useHistory();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    const handleEditUserInfo = () => {
        history.push(`/users/${userId}/edit`);
    };
    return (
        <>
            { user
                ? (
                    <div key={user._id} className="m-3">
                        <h1>{user.name}</h1>
                        <h2>Профессия: {user.profession.name}</h2>
                        <Qualities qualities={user.qualities} />
                        <p>completedMeetings: {user.completedMeetings}</p>
                        <h2>Rate: {user.rate}</h2>
                        <button
                            className="btn btn-secondary"
                            onClick={handleEditUserInfo}
                        >
                            Изменить
                        </button>
                    </div>
                )
                : (
                    <Loader />
                )}
        </>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};
export default UserPage;
