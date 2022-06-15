import React from "react";
import PropTypes from "prop-types";
import Loader from "../../common/loader";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";
import { useUser } from "../../../hooks/useUser";
import { CommentsProvider } from "../../../hooks/useComments";

const UserPage = ({ userId }) => {
    const { getUserById } = useUser();
    const user = getUserById(userId);
    return (
        <div className="container">
            {user
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
                            <CommentsProvider >
                                <Comments />
                            </CommentsProvider>
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
