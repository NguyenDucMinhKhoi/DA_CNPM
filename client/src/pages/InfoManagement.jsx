import React, { useState } from "react";
import "../styles/InfoManagement.scss";
import Navbar from "../components/Navbar";

const InfoManagement = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    account: "user123",
    password: "********",
    fullName: "Nguyen Van A",
    email: "nguyenvana@example.com",
    dob: "1990-01-01",
    cccd: "123456789",
    issueDate: "2010-01-01",
    placeOfIssue: "Ha Noi",
    address: "123 Nguyen Hue, District 1, Ho Chi Minh City",
    numero: "0123456789",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Here you would typically make an API call to update the user info
      console.log("Updated user info:", formData);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div>
      <Navbar />
      <div className="info-container">
        <h2>Personal Information</h2>
        <form className="info-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Account:</label>
            <input
              type="text"
              name="account"
              value={formData.account}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-row">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-row">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-row">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-row">
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-row">
            <label>CCCD:</label>
            <input
              type="text"
              name="cccd"
              value={formData.cccd}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-row">
            <label>Date of Issue:</label>
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-row">
            <label>Place of Issue:</label>
            <input
              type="text"
              name="placeOfIssue"
              value={formData.placeOfIssue}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-row">
            <label>Permanent Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="form-row">
            <label>Phone Number:</label>
            <input
              type="text"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <button type="submit" className="edit-button">
            {isEditing ? "Save" : "Edit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InfoManagement;
