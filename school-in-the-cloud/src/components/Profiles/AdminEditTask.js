import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import AssignmentTaskData from "../AssignmentTaskData";

function AdminEdit(props) {
  console.log(props);

  const { task_id } = useParams();

  const editTask = props.tasksData.find((task) => task.id == task_id);
  console.log(editTask.task_description);

  const [editTaskForm, setEditTaskForm] = useState({
    "task_name": `${editTask.task_name}`,
    "task_description":`${editTask.task_description}` ,
    "completion": false,
  });

  const [assigneeData, setAssignee] = useState({
    assignee: AssignmentTaskData.assignee,
  });

  console.log(editTaskForm);

  const history = useHistory();

  useEffect(() => {
    

    axios
      .get("https://school-in-the-cloud-bwpt15.herokuapp.com/api/tasks")
      .then((res) => {
        props.setTasksData(res.data);
      })
      .catch((err) => {
        alert(err);
      });

    
  }, []);

  function submitHandler(e) {
    e.preventDefault();
    axios
      .put(
        `https://school-in-the-cloud-bwpt15.herokuapp.com/api/tasks/${task_id}`,
        editTaskForm
      )
      .then((res) => {
        console.log(res);
        axios.put()
        history.goBack();

      })
      .catch((err) =>
        alert("Not able to update the task go back and try again")
      );
  }

  function changeHandler(e) {
    const newEditTaskFormData = {
      ...editTaskForm,
      [e.target.name]: e.target.value,
    };
    setEditTaskForm(newEditTaskFormData);
  }

  function assignmentChange(e){
    const newAssignee = {
      ...assigneeData,
      [e.target.name]: e.target.value
    }
    setAssignee(newAssignee);
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
          value={assigneeData.assignee}
          onChange={assignmentChange}
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
