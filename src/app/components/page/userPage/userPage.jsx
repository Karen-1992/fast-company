import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Loader from "../../common/loader";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    return (
        <div className="container">
            { user
                ? (
                    <div key={user._id} className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <UserCard
                                user={user}
                            />
                            <QualitiesCard
                                data={user.qualities}
                            />
                            <MeetingsCard
                                value={user.completedMeetings}
                            />
                        </div>
                        <div className="col-md-8">
                            <Comments />
                        </div>
                    </div>
                )
                : (
                    <Loader />
                )}
        </div>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};
export default UserPage;
