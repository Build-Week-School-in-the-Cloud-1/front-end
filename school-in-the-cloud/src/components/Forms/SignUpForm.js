import React, { useState, useEffect, Component } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { useHistory } from "react-router-dom";
import countryList from "./countryList";
import axios from "axios";
import * as yup from "yup";

const signUpFormSchema = yup.object().shape({
  fname: yup.string().required("First Name is required"),
  lname: yup.string().required("Last Name is required"),
  email: yup.string().email(),
  username: yup.string().required("User Name is required"),
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^.*(?=.{5,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
  country: yup.string().required("Country is required"),
  role: yup.string().required("Role is required"),
});

function SignUp(props) {

  //console.log(props);

  const [signUpFormData, setSignUpFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    username: "",
    password: "",
    country: "",
    role: "",
    bio: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const history = useHistory();

  function submitHandler(e) {
    e.preventDefault();

    axios
      .post(
        "https://school-in-the-cloud-bwpt15.herokuapp.com/api/auth/register",
        signUpFormData
      )
      .then((res) => {

        console.log(res);
        
        //props.setUsersData(res.data);

        setSignUpFormData({
          fname: "",
          lname: "",
          email: "",
          username: "",
          password: "",
          country: "",
          role: "",
          bio: "",
        });

        // history.push(`/${res.data.added[0].role}/${res.data.added[0].id}`);
        history.push(`/login`);

        
      })
      .catch((error) => {
        alert(error);
      });
  }

  function changeHandler(e) {
    const newFormData = {
      ...signUpFormData,
      [e.target.name]: e.target.value,
    };

    setSignUpFormData(newFormData);
  }

  useEffect(() => {
    signUpFormSchema.isValid(signUpFormData).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [signUpFormData]);

  return (
    <form action="" className="form" onSubmit={submitHandler}>
      <label htmlFor="fname">
        <input
          type="text"
          name="fname"
          onChange={changeHandler}
          value={signUpFormData.fname}
          placeholder="Enter Your First Name"
          autocomplete="off"
        />
      </label>
      <label htmlFor="lname">
        <input
          type="text"
          name="lname"
          onChange={changeHandler}
          value={signUpFormData.lname}
          placeholder="Enter Your Last Name"
          autocomplete="off"
        />
      </label>
      <label htmlFor="username">
        <input
          type="text"
          name="username"
          onChange={changeHandler}
          value={signUpFormData.username}
          placeholder="Enter Your User Name"
          autocomplete="off"
        />
      </label>
      <label htmlFor="email">
        <input
          type="email"
          name="email"
          onChange={changeHandler}
          value={signUpFormData.email}
          placeholder="Enter Your Email"
          autocomplete="off"
        />
      </label>
      <label htmlFor="password">
        <input
          type="password"
          name="password"
          onChange={changeHandler}
          value={signUpFormData.password}
          placeholder="Enter Your Password"
          autocomplete="off"
        />
      </label>
      <select
        name="role"
        id="role"
        onChange={changeHandler}
        value={signUpFormData.role}
      >
        <option value="">Select your role below</option>
        <option value="Admin"> Admin </option>
        <option value="Student"> Student </option>
        <option value="Volunteer"> Volunteer </option>
      </select>{" "}
      <br />
      <select
        name="country"
        className="country"
        onChange={changeHandler}
        value={signUpFormData.country}
      >
        <option value="">Select your country below</option>
        {countryList.map((country) => {
          return <option value={country.name}>{country.name}</option>;
        })}
      </select>
      <textarea
        name="bio"
        value={signUpFormData.bio}
        id=""
        cols="30"
        rows="10"
        placeholder="Enter your bio here"
        onChange={changeHandler}
      />
      <br />
      <button disabled={buttonDisabled}>Sign Up</button>
    </form>
  );
}

export default SignUp;
