import useAxios from 'axios-hooks';
import React, { useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';

function UserDetail() {
    const { id } = useParams();
    const history = useHistory();
    const [{ data, loading, error }] = useAxios(`users/${id}`);
    const [{ loading: dLoading, error: dError, response: dResponse }, deleteUser] = useAxios(
        {
            url: `users/${id}`,
            method: "DELETE",
        },
        { manual: true }
    );

    const dSuccess = dResponse && dResponse.status == 200;

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

    useEffect(() => {
        if (dSuccess) {
            history.push('/');
            alert("User is deleted");
        }
    }, [dSuccess])

    return (
        <div>
            <h3>User detail</h3>
            <hr />
            {loading && <em>Loading...</em>}
            {error && <em>Fetch data failed</em>}
            {success && !hasData && <em>No data here</em>}
            {success && hasData && renderUser()}

            {dLoading && <em>Deleting this user...</em>}
            {dError && <em>Delete this user failed</em>}
            {dSuccess && <em>User is deleted, <Link to={`/`}>go home</Link></em>}

            <div>
                <Link to={`/update/${id}`}>Update</Link>
                <button onClick={() => deleteUser()}>Delete</button>
                <button onClick={deleteUser}>Delete</button>
            </div>
        </div>
    )
}

export default UserDetail
