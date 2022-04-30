import { React, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Loader from "./loader";
import api from "../api";

const UserPage = () => {
    const [selectedUser, setSelectedUser] = useState();
    const history = useHistory();
    const { userId } = useParams();
    useEffect(() => {
        api.users.getById(userId).then(data => setSelectedUser(data));
    }, []);
    const handleShowAllUsers = () => {
        history.push("/users");
    };
    return (
        <>
            { selectedUser
                ? (
                    <div key={selectedUser._id} className="m-3">
                        <h1>{selectedUser.name}</h1>
                        <h3>Профессия: {selectedUser.profession.name}</h3>
                        {selectedUser.qualities.map(quality => (
                            <p key={quality._id} className={"m-2 badge bg-" + quality.color}>
                                {quality.name}
                            </p>)
                        )}
                        <p>completedMeetings: {selectedUser.completedMeetings}</p>
                        <h3>Rate: {selectedUser.rate}</h3>
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

export default UserPage;
