import React from "react";

const ContactDetailsForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="contact-details">
      <h2>Contact Details</h2>
      <input
        name="street"
        placeholder="Street + Nr"
        value={formData.street}
        onChange={handleChange}
      />
      <input
        name="additionalInfo"
        placeholder="Additional Information"
        value={formData.additionalInfo}
        onChange={handleChange}
      />
      <input
        name="zipCode"
        placeholder="Zip Code"
        value={formData.zipCode}
        onChange={handleChange}
      />
      <input
        name="place"
        placeholder="Place"
        value={formData.place}
        onChange={handleChange}
      />
      <input
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
      />
      <input
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
      />
    </div>
  );
};

export default ContactDetailsForm;
