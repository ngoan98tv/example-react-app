import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useUserById from "../hooks/useUserById";
import useUserCreate from "../hooks/useUserCreate";
import useUserUpdate from "../hooks/useUserUpdate";

function UserForm() {
    const { id } = useParams();
    const [userData, userDataLoading, userDataSuccess, userDataError ] = useUserById(id);
    const [formData, setFormData] = useState({});
    const [createUser, { loading: cLoading, success: cSuccess, error: cError }] = useUserCreate();
    const [updateUser, { loading: uLoading, success: uSuccess, error: uError }] = useUserUpdate();

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
            updateUser(id, formData);
        } else {
            createUser(formData);
        }
    };

    useEffect(() => {
        if (!cSuccess) return;
        setFormData({});
    }, [cSuccess])

    useEffect(() => {
        if (!isUpdate) {
            setFormData({});
        };
    }, [id])

    useEffect(() => {
        if (!isReady || !isUpdate) return;
        const {name, avatar} = userData || {};
        setFormData({name, avatar});
    }, [isReady])

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
            {!isReady && userDataSuccess && !userData && <em>Data is empty, nothing to update</em>}

            {isReady && <form onSubmit={handleSubmit}>
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
                <button disabled={cLoading || uLoading} type="submit">Submit</button>
            </form>}
            
        </div>
    );
}

export default UserForm;
