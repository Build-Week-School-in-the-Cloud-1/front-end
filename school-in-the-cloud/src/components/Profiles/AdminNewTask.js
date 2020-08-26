import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import axios from "axios";

import * as yup from "yup";

function AdminNewTask(props) {
  const { user_id } = useParams();
  const history = useHistory();

  const [newTaskFormData, setNewTaskFormData] = useState({
    task_name: "",
    task_description: "",
    assignee: "",
    userId: "",
    completion: "false",
  });

  function changeHandler(e) {
    const newNewTaskFormData = {
      ...newTaskFormData,
      [e.target.name]: e.target.value,
      userId: user_id,
    };

    setNewTaskFormData(newNewTaskFormData);
  }

  // const testData = {
  //   task_name: "Sample Task",
  //   task_description: "Sample Tasks here",
  //   assignee: "Sample person",
  //   completion: "false",
  //   userId:"10"
  // };

  function submitHandler(e) {
    e.preventDefault();
    axios
      .post(
        " https://school-in-the-cloud-bwpt15.herokuapp.com/api/tasks",
        newTaskFormData
      )
      .then((res) => {
        //update gloabl userData object and go back to Admin home
        // this should re-render Admin home with the newest task list
        history.push(`/admin/${user_id}`);
      })
      .catch((error) => {
        alert(error.response.data.message);
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
