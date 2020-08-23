import React, {useState, useEffect} from 'react';
import {useHistory, Switch, Route} from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import AdminHome from '../Profiles/AdminProfile';
import StudentHome from '../Profiles/StudentProfile'
import VolunteerHome from '../Profiles/VolunteerProfile'

const loginFormSchema = yup.object().shape(
    {
        username: yup
                .string()
                .required("Username is required"),
        password: yup
                .string()
                .required("Please enter your password")
                .matches(
                    /^.*(?=.{5,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                    "Password must contain at least 8 characters, one uppercase, one number and one special case character"
                    )
    }
)


function Login(props){

    console.log(props)

    const[loginFormData, setLoginFormData] = useState({
            username:"",
            password:""
        })

    const[buttonDisabled, setButtonDisabled] = useState('true');

    const[role, setRole] = useState("login");

    const history = useHistory();

    const testData = {role:"admin", name:"Borat"}
         

    function submitHandler(e) {
        e.preventDefault();
        axios
            .post('https://reqres.in/api/users', testData)
            .then(res => {
                console.log(res)
                props.userData = res.data;
               
                setRole(res.data.role);

                setLoginFormData(
                        {
                        username:"",
                        password:""
                        }
                    )
            })
            .catch(error => {
                alert(error.message);
            })
        }

    useEffect(()=>{
        setTimeout(() => {
            history.push(`/${role}`)
            }, 1000)
        console.log(props.userData);
    },[role])

   

    function changeHandler(e) {
            const newFormData={
                ...loginFormData,
                [e.target.name]: e.target.value
            };

            setLoginFormData(newFormData);
        }

    useEffect(() => {

        loginFormSchema.isValid(loginFormData).then(valid =>{
            setButtonDisabled(!valid)
        })

    },[loginFormData])

        
    return(

        <div>
            <form onSubmit = {submitHandler} name="LoginForm" className="form">
                <label htmlFor="username" className="username">
                    <input type="text" name="username" value={loginFormData.username} onChange = {changeHandler} placeholder="Enter username" autocomplete="off"/>
                </label>
                <label htmlFor="password" className="password">
                    <input type="password" name="password" value={loginFormData.password} onChange = {changeHandler} placeholder="Enter your password"/>
                </label>
                <button disabled = {buttonDisabled}> Login </button>
            </form>
        </div>
      
    )
}

export default Login;