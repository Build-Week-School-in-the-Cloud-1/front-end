import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { connect } from "react-redux";
import { formPost } from "../../actions/formActions";
import { Redirect } from "react-router-dom";


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

  async function submitHandler(e) {
    e.preventDefault();
    props.formPost("auth/login", loginFormData);
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

  if(window.localStorage.getItem("token") && window.localStorage.getItem("token").length > 1){
    const route = `/${props.userData.user.role}/${props.userData.user.id}`;
    return <Redirect to={route} />
  }

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
    userData: state.formReducer.userData,
    isPosting: state.formReducer.isPosting,
    error: state.formReducer.error
  };
};

export default connect(mapStateToProps, {formPost})(Login);
