import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape(
    {
        email: yup
                .string()
                .email()
                .required("Email is required"),
        password: yup
                .string()
                .required("Please enter your password")
                .matches(
                    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                    "Password must contain at least 8 characters, one uppercase, one number and one special case character"
                    )
    }
)


function Login(props){

        const[formData, setFormData] = useState({
            email:"",
            password:""
        })

        const[buttonDisabled, setButtonDisabled] = useState("true");

        const[profile, setProfile] = useState({})
        
        function submitHandler(e) {
            e.preventDefault();
            axios
                .post('https://school-in-the-cloud-bwpt15.herokuapp.com/api/auth/login', formData)
                .then(res => {
                    //identify role and get according profile
                })
                .catch(error => {
                    alert(error);
                })
            }

    function changeHandler(e) {
            const newFormData={
                ...formData,
                [e.target.name]: e.target.value
            };

            setFormData(newFormData);
        }

    useEffect(() => {

        formSchema.isValid(formData).then(valid =>{
            setButtonDisabled(!valid)
        })

    },[formData])
        
    return(
        <form onSubmit = {submitHandler} name="LoginForm">
            <label htmlFor="email" className="email">
                <input type="email" name="email" value={formData.email} onChange = {changeHandler} placeholder="Enter your email"/>
            </label>
            <label htmlFor="password" className="password">
                <input type="password" name="password" value={formData.password} onChange = {changeHandler} placeholder="Enter your password"/>
            </label>
            <button disabled = {buttonDisabled}>Login</button>
        </form>
    )
}

export default Login;