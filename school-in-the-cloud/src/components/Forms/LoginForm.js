import React, { useState, useEffect } from "react";
import { useHistory, Switch, Route } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import AdminHome from "../Profiles/AdminProfile";
import StudentHome from "../Profiles/StudentProfile";
import VolunteerHome from "../Profiles/VolunteerProfile";

const loginFormSchema = yup.object().shape({
  email: yup.string().email(),
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^.*(?=.{5,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
});

function Login(props) {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState("true");

  const history = useHistory();

  function submitHandler(e) {
    e.preventDefault();
    axios
      .post(
        "https://school-in-the-cloud-bwpt15.herokuapp.com/api/auth/login",
        loginFormData
      )
      .then((res) => {
        props.setUsersData(res.data);

        history.push(`/${res.data.user.role}/${res.data.user.id}`);

        setLoginFormData({
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        alert(error);
      });
  }

  function changeHandler(e) {
    const newFormData = {
      ...loginFormData,
      [e.target.name]: e.target.value,
    };

    setLoginFormData(newFormData);
  }

  useEffect(() => {
    loginFormSchema.isValid(loginFormData).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [loginFormData]);

  return (
    <div>
      <form onSubmit={submitHandler} name="LoginForm" className="form">
        <label htmlFor="email" className="email">
          <input
            type="email"
            name="email"
            value={loginFormData.email}
            onChange={changeHandler}
            placeholder="Enter email"
            autocomplete="off"
          />
        </label>
        <label htmlFor="password" className="password">
          <input
            type="password"
            name="password"
            value={loginFormData.password}
            onChange={changeHandler}
            placeholder="Enter your password"
          />
        </label>
        <button disabled={buttonDisabled}> Login </button>
      </form>
    </div>
  );
}

export default Login;
