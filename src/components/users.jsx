import React, { useState } from "react";
import api from "../api";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter(user => user._id != userId));
    };

    const renderPhrase = (number) => {
        const lastOne = Number(number.toString().slice(-1));
        if (number > 4 && number < 15) return "человек тусанет";
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
        if (lastOne === 1) return "человек тусанет";
        return "человек тусанет";
    };

    const getBadgeClasses = (bgColor) => {
        let classes = 'm-1 badge bg-';
        classes += bgColor;
        return classes;
    };

    return (

        <>
            <h2>
                <span 
                    className={"badge " + (users.length > 0 ? "bg-primary" : "bg-danger")}
                >
                    {users.length > 0
                        ? `${users.length + " " + renderPhrase(users.length)} с тобой сегодня`
                        : "Никто с тобой не тусанет"}
                </span>
            </h2>

            {users.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                        <th>Имя</th>
                        <th>Качества</th>
                        <th>Профессия</th>
                        <th>Встретился, раз</th>
                        <th>Оценка</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => {
                            return (
                                <tr key={user._id}>
                                    <td >{user.name}</td>
                                    <td>
                                        {user.qualities.map(qualitie => {
                                            return (
                                                <span 
                                                className={getBadgeClasses(qualitie.color)} 
                                                key={qualitie._id}
                                                >
                                                {qualitie.name}
                                                </span>
                                            )
                                        })}
                                    </td>
                                    <td key={user.profession._id}>
                                        {user.profession.name}
                                    </td>
                                    <td>{user.completedMeetings}</td>
                                    <td>{`${user.rate}/5`}</td>
                                    <td>
                                        <button
                                        className="btn btn-danger"
                                        onClick={()=>handleDelete(user._id)}>
                                        delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
            
        </>
    )
    return <h1 className="badge bg-danger">Никто с тобой не тусанет</h1>
}

export default Users;