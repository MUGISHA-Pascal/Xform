import React from "react";

const GeneralInfoForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="general-info">
      <h2>General Information</h2>
      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />
      <input
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
      />
      <input
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
      />
      <input
        name="position"
        placeholder="Position"
        value={formData.position}
        onChange={handleChange}
      />
      <input
        name="company"
        placeholder="Company"
        value={formData.company}
        onChange={handleChange}
      />
      <input
        name="businessArena"
        placeholder="Business Arena"
        value={formData.businessArena}
        onChange={handleChange}
      />
      <input
        name="employees"
        placeholder="Employees"
        value={formData.employees}
        onChange={handleChange}
      />
    </div>
  );
};

export default GeneralInfoForm;
