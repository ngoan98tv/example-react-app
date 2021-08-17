import React from 'react'
import { Link } from 'react-router-dom'

function UserItem({ id, name, avatar }) {
    return (
        <Link to={`/detail/${id}`}>
            <div className="useritem__wrapper">
                <img className="useritem__image" src={avatar} alt="" />
                <p className="useritem__name">{name}</p>
            </div>
        </Link>
    )
}

export default UserItem
