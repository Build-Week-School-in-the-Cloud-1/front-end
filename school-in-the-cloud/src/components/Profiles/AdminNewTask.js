import React, { useState, useEffect } from "react";
import {
  useHistory,
  Link,
  NavLink,
  Route,
  useRouteMatch,
  useParams,
} from "react-router-dom";

import axios from 'axios';

import * as yup from "yup";

function AdminNewTask(props) {

    const history = useHistory();
  
    const [newTaskFormData, setNewTaskFormData] = useState({
      id:"",
      task_name: "",
      task_description: "",
      asignee: "",
      completion: "false",
    });
  
    function changeHandler(e) {
      const newNewTaskFormData = {
        ...newTaskFormData,
        [e.target.name]: e.target.value,
      };
  
      setNewTaskFormData(newNewTaskFormData);
    }
  
    const testData = {
      id: "101",
      task_name: "Sample Task",
      task_description: "Sample Tasks here",
      task_assignee: "Sample person",
      completion: "false",
      userId:"10"
    };
  
    function submitHandler(e) {
      e.preventDefault();
      axios.post("https://reqres.in/api/users", testData)
      .then((res) => {
        
        //reponse 
        setTimeout(()=>{
            //update gloabl userData object and go back to Admin home
            // this should re-render Admin home with the newest task list
            history.goBack()
        }, 500)
      });
    }
  
    return (
      <form action="" onSubmit={submitHandler}>
        <label htmlFor="task_name">
          <input
            type="text"
            name="task_name"
            placeholder="Enter Task title"
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="task_assignee">
          <input
            type="text"
            name="assignee"
            placeholder="Enter assignee here"
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="task_description">
          <textarea
            className="textarea"
            name="task_description"
            placeholder="Enter tasks here"
            onChange={changeHandler}
          />
        </label>
        <button>Create New Task</button>
      </form>
    );
  }

  export default AdminNewTask;