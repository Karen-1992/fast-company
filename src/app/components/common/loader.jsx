import React from "react";

const Loader = () => {
    return (
        <button className="btn btn-primary m-3" type="button" disabled>
            <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
            ></span>
            <span className="m-2">Loading...</span>
        </button>
    );
};

export default Loader;
