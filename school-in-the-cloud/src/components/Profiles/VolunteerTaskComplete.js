import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

function VolunteerTaskComplete(props) {
  console.log(props);

  const { task_id } = useParams();

  const completeTask = props.tasksData.find((task) => task.id == task_id);

  const [completeTaskForm, setCompleteTaskForm] = useState({
    task_name: completeTask.task_name,
    task_description: completeTask.task_description,
    completion: false,
  });

  let adminUserID;

  const [assignedBy, setAssignedBy] = useState({
    fname: "",
    lname: "",
  });

  const history = useHistory();

  useEffect(() => {
    axios
      .get("https://school-in-the-cloud-bwpt15.herokuapp.com/api/admin")
      .then((res) => {
        console.log(res);
        const matchingTaskId = res.data.find((task) => task.task_id == task_id);
        adminUserID = matchingTaskId.user_id;
        console.log(adminUserID);

        axios
          .get(
            "https://school-in-the-cloud-bwpt15.herokuapp.com/api/admin/users"
          )
          .then((res) => {
            console.log(res);
            const matchingAdminData = res.data.find(
              (user) => user.id == adminUserID
            );
            console.log(matchingAdminData);
            
            setAssignedBy({
              fname: matchingAdminData.fname,
              lname: matchingAdminData.fname,
            });
          });
      })
      .catch((err) => alert("Couldn't find assignee"));
  }, []);

  function changeHandler(e) {
    const newCompleteTaskFormData = {
      ...completeTaskForm,
      completion: true,
    };
    setCompleteTaskForm(newCompleteTaskFormData);
  }

  function submitHandler(e) {
    e.preventDefault();
    axios
      .put(
        `https://school-in-the-cloud-bwpt15.herokuapp.com/api/tasks/${task_id}`,
        completeTaskForm
      )
      .then((res) => {
        console.log(res);
        history.goBack();
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <form action="" onSubmit={submitHandler}>
      <h4>Task Name</h4>
      <label htmlFor="task_name">
        <input
          type="text"
          name="task_name"
          value={completeTaskForm.task_name}
          //   onChange={changeHandler}
        />
      </label>
      <label htmlFor="task_assignedBy">
        <h4>Assigned By</h4>
        <input
          type="text"
          name="assignedBy"
          value={`${assignedBy.fname} ${assignedBy.lname}` }
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
