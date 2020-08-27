import React, { useState, useEffect } from "react";
import { useHistory, Switch, Route } from "react-router-dom";
import * as yup from "yup";
import { connect } from "react-redux";
import { formPost } from "../../actions/formActions";
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

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const history = useHistory();

  const testData = {
    role: "admin",
    user_id: 8,
    fname: "Test",
    tasks: [
      {
        id: "1",
        task_name: "Sample task 1",
        task_description: "Sample description 1",
        completion: "false",
        assignee: "Sample person 1",
      },
      {
        id: "2",
        task_name: "Sample task 2",
        task_description: "Sample description 2",
        completion: "true",
        assignee: "Sample person 2",
      },
    ],
  };

  function submitHandler(e) {
    e.preventDefault();
    // axios
    //   .post(
    //     "https://school-in-the-cloud-bwpt15.herokuapp.com/api/auth/login",
    //     loginFormData
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     history.push(`/${res.data.user.role}/${res.data.user.id}`);

    //     setLoginFormData({
    //       email: "",
    //       password: "",
    //     });
    //   })
    //   .catch((error) => {
    //     alert(error.message);
    //   });

    props.formPost("login", loginFormData);
    console.log(props.userData);
    window.localStorage.setItem("token", props.userData.token);
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
            autoComplete="off"
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

const mapStateToProps = state =>{
  return{
    userData: state.userData,
    isPosting: state.isPosting,
    error: state.error
  };
};

export default connect(mapStateToProps, {formPost})(Login);
