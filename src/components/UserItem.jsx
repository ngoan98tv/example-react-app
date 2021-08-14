import React from 'react'

function UserItem({name, avatar}) {
    return (
        <div className="useritem__wrapper">
            <img className="useritem__image" src={avatar} alt="" />
            <p className="useritem__name">{name}</p>
        </div>
    )
}

export default UserItem
