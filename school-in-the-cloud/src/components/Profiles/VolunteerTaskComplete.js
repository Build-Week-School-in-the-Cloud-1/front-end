import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

function VolunteerTaskComplete(props) {
  const { task_id } = useParams();

  const completeTask = props.userData.tasks.find((task) => task.id == task_id);

  const [completeTaskForm, setCompleteTaskForm] = useState({
    id: completeTask.id,
    task_name: completeTask.task_name,
    task_description: completeTask.task_description,
    assignedBy: completeTask.assignedBy,
    completion: "false",
  });

  const history = useHistory();

  function submitHandler(e) {
    e.preventDefault();
    axios
      .put(
        `https://school-in-the-cloud-bwpt15.herokuapp.com/api/auth/${task_id}`,
        completeTask
      )
      .then((res) => {
        // we should update the global UserData and go back to Admin home
        // Admin home will re-render tasks with new data
        history.goBack();
      });
  }

  function changeHandler(e) {
    const newCompleteTaskFormData = {
      ...completeTaskForm,
      completion: "true",
    };
    setCompleteTaskForm(newCompleteTaskFormData);
  }

  return (
    <form action="" onSubmit={submitHandler}>
      <label htmlFor="task_name">
        <input
          type="text"
          name="task_name"
          value={completeTaskForm.task_name}
          //   onChange={changeHandler}
        />
      </label>
      <label htmlFor="task_assignee">
        <input
          type="text"
          name="assignee"
          value={completeTaskForm.assignedBy}
          //   onChange={changeHandler}
        />
      </label>
      <label htmlFor="task_description">
        <textarea
          className="textarea"
          name="task_description"
          value={completeTaskForm.task_description}
          //   onChange={changeHandler}
        />
      </label>
      <button onClick={changeHandler}>Complete Task</button>
    </form>
  );
}

export default VolunteerTaskComplete;
