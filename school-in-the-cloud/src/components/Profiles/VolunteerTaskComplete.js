import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { dataPut, completeFetch } from "../../actions/taskActions";
import axios from "axios";

function VolunteerTaskComplete(props) {
  console.log(props);

  const { task_id } = useParams();

  const completeTask = props.tasks.find((task) => task.id == task_id);

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
    props.completeFetch();
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
    props.dataPut(task_id, completeTask);
  }

  return (
    <form action="" onSubmit={submitHandler}>
      <h4>Task Name</h4>
      <label htmlFor="task_name">
        <input
          type="text"
          name="task_name"
          value={completeTaskForm.task_name}
        />
      </label>
      <label htmlFor="task_assignedBy">
        <h4>Assigned By</h4>
        <input
          type="text"
          name="assignedBy"
          value={`${assignedBy.fname} ${assignedBy.lname}`}
        />
      </label>
      <label htmlFor="task_description">
        <textarea
          className="textarea"
          name="task_description"
          value={completeTaskForm.task_description}
        />
      </label>
      <button onClick={changeHandler}>Complete Task</button>
    </form>
  );
}

const mapStateToProps = state => {
  return{
    tasks: state.taskReducer.tasks
  };
};

export default connect(mapStateToProps, {dataPut, completeFetch})(VolunteerTaskComplete);
