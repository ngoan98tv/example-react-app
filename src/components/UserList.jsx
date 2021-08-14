import React from 'react'
import UserItem from './UserItem'

function UserList() {
    return (
        <div>
            <h2>User List</h2>
            <UserItem name="User name" avatar="https://picsum.photos/200" />
        </div>
    )
}

export default UserList
