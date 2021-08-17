import React from 'react'
import { useParams } from 'react-router-dom';

function UserDetail() {
    const { id } = useParams();

    return (
        <div>
            <h3>User detail</h3>
            <hr />
            id: {id}
        </div>
    )
}

export default UserDetail
