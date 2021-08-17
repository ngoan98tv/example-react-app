import React from 'react'
import useUsers from '../hooks/useUsers'
import UserItem from './UserItem'

function UserList() {
    const [users, isLoading, success, failed] = useUsers();
    const hasData = users != null && users.length > 0;

    const renderUser = () => (
        users.map(({ name, id, avatar }) => (
            <UserItem key={id} name={name} avatar={avatar} />
        ))
    )

    return (
        <div>
            <h2>User List</h2>
            <hr />
            {isLoading && <em className="users__loading">Loading...</em>}
            {failed && <em>Fetch data failed</em>}
            {success && !hasData && <em>No data here</em>}
            {success && hasData && renderUser()}
        </div>
    )
}

export default UserList
