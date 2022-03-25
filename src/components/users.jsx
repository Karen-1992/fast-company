import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(prevState => prevState.filter(user => user._id != userId));
  }

  const renderPhrase = (number) => {
    let humanHangOut;
    const numberStr = String(number);
    const lastNumber = numberStr[numberStr.length - 1];

    if (lastNumber >= 2 && lastNumber <= 4 && number < 11 || number > 14) {
      humanHangOut = 'человека тусанут';
    } else {
      humanHangOut = 'человек тусанет';
    }

    return <h1 className={`badge bg-primary`}>{`${number} ${humanHangOut} с тобой сегодня`}</h1>;
  }

  const getBadgeClasses = (bgColor) => {
    let classes = 'm-1 badge bg-';
    classes += bgColor;
    return classes;
  }

  if (users.length != 0) {
    return (
    <>
      {renderPhrase(users.length)}
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
    </>
    )
  }
  return <h1 className="badge bg-danger">Никто с тобой не тусанет</h1>
}

export default Users;