import useAxios from 'axios-hooks';
import React from 'react'
import { Link, useParams } from 'react-router-dom';

function UserDetail() {
    const { id } = useParams();
    const [{ data, loading, error }] = useAxios(`users/${id}`);

    const hasData = data != null;
    const success = !loading && !error;

    const renderUser = () => {
        const { avatar, createdAt, name } = data;
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
            <Link to={`/update/${id}`}>Update</Link>
        </div>
    )
}

export default UserDetail
