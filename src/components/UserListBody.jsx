import useAxios from "axios-hooks";
import React, { useState } from "react";
import UserItem from "./UserItem";

function UserListBody() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [{ data: users, loading: isLoading, error: failed }] = useAxios({
        url: "users",
        params: {
            page,
            limit: 5,
            search,
        }
    });

    const hasData = users != null && users.length > 0;

    const renderUser = () =>
        users.map(({ name, id, avatar }) => (
            <UserItem key={id} id={id} name={name} avatar={avatar} />
        ));

    const handlePrev = (e) => {
        if (page === 1) return;
        setPage(page - 1);
    }

    const handleNext = () => {
        if (!hasData) return;
        setPage(page + 1);
    }

    const handleSearchChange = (e) => {
        setPage(1);
        setSearch(e.target.value);
    }

    return (
        <>
            <div>
                <input type="text" value={search} onChange={handleSearchChange} />
            </div>
            {isLoading && <em className="users__loading">Loading...</em>}
            {failed && <em>Fetch data failed</em>}
            {!hasData && <em>No data here</em>}
            {hasData && renderUser()}
            <div>
                <button onClick={handlePrev}>prev</button>
                {page}
                <button onClick={handleNext}>next</button>
            </div>
        </>
    );
}

export default UserListBody;
