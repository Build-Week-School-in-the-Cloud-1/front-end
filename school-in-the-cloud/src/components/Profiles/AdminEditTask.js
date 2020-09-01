import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { dataFetch, dataPut } from "../../actions/taskActions";
import axios from "axios";
import AssignmentTaskData from "../AssignmentTaskData";

function AdminEdit(props) {
  const { task_id, user_id } = useParams();

  const editTask = props.tasks.find((task) => task.id == task_id);

  const [editTaskForm, setEditTaskForm] = useState({
    "task_name": `${editTask.task_name}`,
    "task_description":`${editTask.task_description}` ,
    "completion": false,
  });

  const [posted, setPosted] = useState(false);

  const [assigneeData, setAssignee] = useState({
    assignee: AssignmentTaskData.assignee,
  });

  useEffect(() => {
    

    // axios
    //   .get("https://school-in-the-cloud-bwpt15.herokuapp.com/api/tasks")
    //   .then((res) => {
    //     props.setTasksData(res.data);
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });

    props.dataFetch();

  }, []);

  async function submitHandler(e) {
    e.preventDefault();
    // axios
    //   .put(
    //     `https://school-in-the-cloud-bwpt15.herokuapp.com/api/tasks/${task_id}`,
    //     editTaskForm
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     axios.put()
    //     history.goBack();

    //   })
    //   .catch((err) =>
    //     alert("Not able to update the task go back and try again")
    //   );
    await props.dataPut(task_id, editTaskForm);
    setPosted(true);
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

  if(posted){
    return <Redirect to={`/Admin/${user_id}`} />
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

const mapStateToProps = state => {
  return{
    tasks: state.taskReducer.tasks
  }
};

export default connect(mapStateToProps, {dataFetch, dataPut})(AdminEdit);
