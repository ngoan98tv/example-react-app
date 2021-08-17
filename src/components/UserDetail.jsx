import React from 'react'
import { useParams } from 'react-router-dom';
import useUserById from '../hooks/useUserById';

function UserDetail() {
    const { id } = useParams();
    const [data, loading, success, error] = useUserById(id);
    const hasData = data != null;

    const renderUser = () => {
        const {avatar, createdAt, name } = data;
        return <div>
            <img src={avatar} alt="" />
            <h3>{name}</h3>
            <p>{new Date(createdAt).toLocaleString('vi-VN')}</p>
        </div>
    };

    return (
        <div>
            <h3>User detail</h3>
            <hr />
            {loading && <em>Loading...</em>}
            {error && <em>Fetch data failed</em>}
            {success && !hasData && <em>No data here</em>}
            {success && hasData && renderUser()}
        </div>
    )
}

export default UserDetail
