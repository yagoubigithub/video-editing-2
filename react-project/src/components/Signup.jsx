import { useState } from "react";


import { authenticate, signup } from "./../auth";
import {  Redirect } from "react-router-dom";

import Alert from '@mui/material/Alert';


const Signup = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    gender: "",
    success: false,
    error: false,
  });

  const { username, email, password, phone, address, gender, error, success } =
    values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
    
  };

  const clickSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, error: false });

    signup({ username, email, password, phone, address, gender }).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          authenticate(data, ()=>{
            setValues({
                ...values,
                success: true,
              });
          })
        }
      }
    );
  };

  const SignupForm = () => (
    <form className="newUserForm">
      <div className="newUserItem">
        <label>Username</label>
        <input
          type="text"
          placeholder="john"
          value={username}
          onChange={handleChange("username")}
        />
      </div>

      <div className="newUserItem">
        <label>Email</label>
        <input
          type="email"
          placeholder="john@gmail.com"
          value={email}
          onChange={handleChange("email")}
        />
      </div>
      <div className="newUserItem">
        <label>Password</label>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={handleChange("password")}
        />
      </div>
      <div className="newUserItem">
        <label>Phone</label>
        <input
          type="text"
          placeholder="+1 123 456 78"
          value={phone}
          onChange={handleChange("phone")}
        />
      </div>
      <div className="newUserItem">
        <label>Address</label>
        <input
          type="text"
          placeholder="New York | USA"
          value={address}
          onChange={handleChange("address")}
        />
      </div>
      <div className="newUserItem">
        <label>Gender</label>
        <div className="newUserGender">
          <input
            type="radio"
            name="gender"
            id="male"
            value={"male"}
            onChange={handleChange("gender")}
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            name="gender"
            id="female"
            value="female"
            onChange={handleChange("gender")}
          />
          <label htmlFor="female">Female</label>
       
        </div>
      </div>

      <button className="newUserButton" onClick={clickSubmit}>
        Create
      </button>
    </form>
  );

  const showError = () => (
    <Alert severity="error"
   
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </Alert>
  );

  const showSuccess = () => (
    <>
       { success  && <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
    <Redirect to="/dashboard"  />
    </div>}
    </>
   
  );
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      {showSuccess()}
      {showError()}
      {SignupForm()}
    </div>
  );
};

export default Signup;