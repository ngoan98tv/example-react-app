import useAxios from "axios-hooks";
import React from "react";
import UserItem from "./UserItem";

function UserListBody() {
    const [{ data: users, loading: isLoading, error: failed }] = useAxios("users");

    const hasData = users != null && users.length > 0;

    const renderUser = () =>
        users.map(({ name, id, avatar }) => (
            <UserItem key={id} id={id} name={name} avatar={avatar} />
        ));

    if (isLoading) return <em className="users__loading">Loading...</em>;
    if (failed) return <em>Fetch data failed</em>

    return (
        <>
            {!hasData && <em>No data here</em>}
            {hasData && renderUser()}
        </>
    );
}

export default UserListBody;
