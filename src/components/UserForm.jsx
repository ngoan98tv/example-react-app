import React, { useState } from "react";

function UserForm() {
  const [formData, setFormData] = useState({});

  // T0  formData = {}
  // T1  name=abc -> handleChange('name') -> prev={} new={ name: 'abc' }
  // T2 prev={ name: 'abc' }

  // prev = { name: abc, avatar: abc }
  // new  = { avatar: abc, name: xyz }

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <div>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserForm;
