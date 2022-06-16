import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import PropTypes from "prop-types";

function ProtectedRoute({
    component: Component,
    children,
    computedMatch,
    ...rest
}) {
    const { currentUser } = useAuth();
    const { userId, edit } = computedMatch.params;
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!currentUser) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
                if (edit && userId !== currentUser._id) {
                    return (
                        <Redirect to={`/users/${currentUser._id}/edit`} />
                    );
                }
                return Component ? <Component {...props} /> : children;
            }}
        />
    );
};

ProtectedRoute.propTypes = {
    component: PropTypes.func,
    computedMatch: PropTypes.object,
    location: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProtectedRoute;
