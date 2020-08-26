import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";

function AdminEdit(props) {
  const { user_id,task_id } = useParams();

  const editTask = props.userData.tasks.find((task) => task.id == task_id);

  const [editTaskForm, setEditTaskForm] = useState({
    id: editTask.id,
    task_name: editTask.task_name,
    task_description: editTask.task_description,
    assignee: editTask.assignee,
    completion: "false",
  });

  const history = useHistory();

  function submitHandler(e) {
    e.preventDefault();
    axios
      .put(
        `https://school-in-the-cloud-bwpt15.herokuapp.com/api/auth/${task_id}`,
        editTaskForm
      )
      .then((res) => {
        // we should update the global UserData and go back to Admin home
        // Admin home will re-render tasks with new data
        history.push(`/admin/${user_id}`);
      });
  }

  function changeHandler(e) {
    const newEditTaskFormData = {
      ...editTaskForm,
      [e.target.name]: [e.target.value],
    };
    setEditTaskForm(newEditTaskFormData);
  }

  return (
    <form action="" onSubmit={submitHandler}>
      <label htmlFor="task_name">
        <input
          type="text"
          name="task_name"
          value={editTaskForm.task_name}
          onChange={changeHandler}
        />
      </label>
      <label htmlFor="task_assignee">
        <input
          type="text"
          name="assignee"
          value={editTaskForm.assignee}
          onChange={changeHandler}
        />
      </label>
      <label htmlFor="task_description">
        <textarea
          className="textarea"
          name="task_description"
          value={editTaskForm.task_description}
          onChange={changeHandler}
        />
      </label>
      <button>Submit</button>
    </form>
  );
}

export default AdminEdit;
