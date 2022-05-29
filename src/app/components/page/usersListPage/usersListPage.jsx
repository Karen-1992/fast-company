import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import api from "../../../api";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import Loader from "../../common/loader";
import _ from "lodash";
import { useUser } from "../../../hooks/useUsers";

const UsersListPage = () => {
    const pageSize = 4;
    const [searchQuerry, setSearchQuerry] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const { users } = useUser();
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuerry]);
    const handleToggleBookMark = (id) => {
        const userIndex = users.findIndex((user) => user._id === id);
        const newUsers = [...users];
        newUsers[userIndex].bookmark = !newUsers[userIndex].bookmark;
        console.log(newUsers);
        // setUsers(newUsers);
    };
    const clearFilter = () => setSelectedProf();
    const handleSearchQuerry = ({ target }) => {
        clearFilter();
        setSearchQuerry(target.value);
    };
    const handleDelete = (userId) => {
        console.log(userId);
        // setUsers(users.filter((user) => user._id !== userId));
    };
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        if (searchQuerry !== "") setSearchQuerry("");
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSearchQuerry("");
        setSortBy(item);
    };
    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
            : searchQuerry
                ? users.filter((user) =>
                    user.name
                        .toLowerCase()
                        .includes(searchQuerry.trim().toLowerCase())
                )
                : users;

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        if (userCrop.length === 0 && currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }

        return (
            <div className="d-flex">
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    {professions && (
                        <>
                            <GroupList
                                selectedItem={selectedProf}
                                items={professions}
                                onItemSelect={handleProfessionSelect}
                            />
                            <button
                                className="btn btn-secondary mt-2"
                                onClick={clearFilter}
                            >
                                Очистить
                            </button>
                        </>
                    )}
                </div>
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <input
                        type="text"
                        id="text"
                        name="searchQuerry"
                        placeholder="Search..."
                        value={searchQuerry}
                        onChange={handleSearchQuerry}
                    />
                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return <Loader />;
};

UsersListPage.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object.isRequired),
    appi: PropTypes.arrayOf(PropTypes.object.isRequired)
};

export default UsersListPage;
