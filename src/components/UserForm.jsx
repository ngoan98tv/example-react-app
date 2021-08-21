import useAxios from "axios-hooks";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserForm() {
    const { id } = useParams();
    const [{ data: userData, loading: userDataLoading, error: userDataError }] = useAxios(`users/${id}`);
    const [formData, setFormData] = useState({});

    const userDataSuccess = !userDataLoading && !userDataError;

    const [{ loading: cLoading, error: cError, response: cResponse }, createUser] = useAxios(
        {
            url: `users`,
            method: "POST",
        },
        { manual: true }
    );

    const cSuccess = cResponse && cResponse.status == 201;

    const [{ loading: uLoading, error: uError, response: uResponse }, updateUser] = useAxios(
        {
            url: `users/${id}`,
            method: "PUT",
        },
        { manual: true }
    );

    const uSuccess = uResponse && uResponse.status == 200;

    const isUpdate = !!id;
    const isReady = !isUpdate || (userDataSuccess && userData);

    const handleChange = (field) => (event) => {
        setFormData((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isUpdate) {
            updateUser({ data: formData });
        } else {
            createUser({ data: formData });
        }
    };

    useEffect(() => {
        if (!cSuccess) return;
        setFormData({});
    }, [cSuccess]);

    useEffect(() => {
        if (!isUpdate) {
            setFormData({});
        }
    }, [id]);

    useEffect(() => {
        if (!isReady || !isUpdate) return;
        const { name, avatar } = userData || {};
        setFormData({ name, avatar });
    }, [isReady]);

    return (
        <div>
            {/* Status of create */}
            {cLoading && <em>Creating user....</em>}
            {cError && <em>An error occurred, please try again</em>}
            {cSuccess && <em>User is created successfully</em>}

            {/* Status of update */}
            {uLoading && <em>Updating user....</em>}
            {uError && <em>An error occurred, please try again</em>}
            {uSuccess && <em>User is updated successfully</em>}

            {/* Status of loading data */}
            {!isReady && userDataLoading && <em>Loading data...</em>}
            {!isReady && userDataError && <em>Cannot load data</em>}
            {!isReady && userDataSuccess && !userData && (
                <em>Data is empty, nothing to update</em>
            )}

            {isReady && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="user_name">Name</label>
                        <input
                            value={formData["name"] || ""}
                            onChange={handleChange("name")}
                            type="text"
                            name="user_name"
                            id="user_name"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div>
                        <label htmlFor="user_avatar">Avatar</label>
                        <input
                            value={formData["avatar"] || ""}
                            onChange={handleChange("avatar")}
                            type="text"
                            name="user_avatar"
                            id="user_avatar"
                            placeholder="Enter your avatar url"
                        />
                    </div>
                    <button disabled={cLoading || uLoading} type="submit">
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
}

export default UserForm;
