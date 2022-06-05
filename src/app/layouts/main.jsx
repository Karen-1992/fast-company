import React from "react";
import useMocData from "../utils/mockData";

const Main = () => {
    const { error, initialize, progress, status } = useMocData();
    const handleClick = () => {
        console.log("init");
        initialize();
    };
    return (
        <div className="container mt-5">
            <h1>Main</h1>;
            <h3>Инициализаци данных в FireBase</h3>
            <ul>
                <li>{status}</li>
                <li>{progress}</li>
                {error && <li>{error}</li>}
            </ul>
            <button
                onClick={handleClick}
                className="btn btn-primary"
            >
                Инициализировать
            </button>
        </div>
    );
};

export default Main;
