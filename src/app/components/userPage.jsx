import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "./loader";
import api from "../api";
import QualitiesList from "./qualitiesList";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    const history = useHistory();
    // const { userId } = useParams();
    useEffect(() => {
        api.users.getById(userId).then(data => setUser(data));
    }, []);
    const handleShowAllUsers = () => {
        history.push("/users");
    };
    return (
        <>
            { user
                ? (
                    <div key={user._id} className="m-3">
                        <h1>{user.name}</h1>
                        <h2>Профессия: {user.profession.name}</h2>
                        <QualitiesList qualities={user.qualities}/>
                        <p>completedMeetings: {user.completedMeetings}</p>
                        <h2>Rate: {user.rate}</h2>
                        <button
                            className='btn btn-secondary'
                            onClick={handleShowAllUsers}
                        >
                            Все пользователи
                        </button>
                    </div>)
                : <Loader/>
            }
        </>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};
export default UserPage;
