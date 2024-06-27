import React, { useState } from "react";
import axios from "axios";
import GeneralInfoForm from "./components/GeneralInfoForm";
import ContactDetailsForm from "./components/ContactDetailsForm";
import UsersList from "./components/UsersList";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    position: "",
    company: "",
    businessArena: "",
    employees: "",
    street: "",
    additionalInfo: "",
    zipCode: "",
    place: "",
    country: "",
    phoneNumber: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users",
        formData
      );
      console.log("User created:", response.data);
    } catch (error) {
      console.error("There was an error creating the user!", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <GeneralInfoForm formData={formData} setFormData={setFormData} />
        <ContactDetailsForm formData={formData} setFormData={setFormData} />
        <div className="submit-section">
          <input type="checkbox" name="terms" /> I do accept the Terms and
          Conditions of your site.
          <button type="submit">Register Badge</button>
        </div>
      </form>
      <UsersList />
    </div>
  );
};

export default App;
