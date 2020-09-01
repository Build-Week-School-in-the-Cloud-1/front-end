import React, { useState} from "react";
import { useParams, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { dataPost } from "../../actions/taskActions";

import axios from "axios";


function AdminNewTask(props) {
  const { user_id } = useParams();

  const [newTaskFormData, setNewTaskFormData] = useState({
    task_name: "",
    task_description: "",
    completion: false,
  });

  const [posted, setPosted] = useState(false);

  function changeHandler(e) {
    const newNewTaskFormData = {
      ...newTaskFormData,
      [e.target.name]: e.target.value,
    };

    setNewTaskFormData(newNewTaskFormData);
  }

  async function submitHandler(e) {
    e.preventDefault();
    // axios
    //   .post(
    //     " https://school-in-the-cloud-bwpt15.herokuapp.com/api/tasks",
    //     newTaskFormData
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     const newAssigneeData = { user_id: user_id, task_id: res.data.id };

    //     axios
    //       .post(
    //         `https://school-in-the-cloud-bwpt15.herokuapp.com/api/admin`,
    //         newAssigneeData
    //       )
    //       .then((res) => console.log(res))
    //       .catch((err) => {
    //         alert("Asignment failed");
    //       });

    //     history.goBack();
    //   })
    //   .catch((err) => alert("Task creation failed"));

    await props.dataPost(newTaskFormData, user_id);
    setPosted(true);
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
          placeholder="Enter Task title"
          onChange={changeHandler}
        />
      </label>
      <label htmlFor="task_assignee">
        <input
          type="text"
          name="assignee"
          placeholder="Enter assignee here"
          // onChange={changeHandler}
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

const mapStateToProps = state => {
  return{

  };
};

export default connect(mapStateToProps, {dataPost})(AdminNewTask);
