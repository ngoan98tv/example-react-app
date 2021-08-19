import React, { useEffect, useState } from "react";
import useUserCreate from "../hooks/useUserCreate";

function UserForm() {
    const [formData, setFormData] = useState({});
    const [createUser, { loading, success, error }] = useUserCreate();

    const handleChange = (field) => (event) => {
        setFormData((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createUser(formData);
    };

    useEffect(() => {
        if (!success) return;
        setFormData({});
    }, [success])

    return (
        <div>
            {loading && <em>Creating user....</em>}
            {error && <em>An error occurred, please try again</em>}
            {success && <em>User is created successfully</em>}
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
                <button disabled={loading} type="submit">Submit</button>
            </form>
        </div>
    );
}

export default UserForm;
