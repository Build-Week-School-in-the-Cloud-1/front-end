import React, { useState, useEffect } from "react";
import {
  Link,
  NavLink,
  useRouteMatch,
  Switch,
  useParams,
  useHistory,
} from "react-router-dom";
import deleteIcon from "../../assets/delete-icon.png";
import editIcon from "../../assets/edit-icon.png";
import axios from "axios";

function AdminHome(props) {
  // const openTasks = props.userData.tasks.filter((task) => {
  //   return task.completion === "false";
  // });

  // const closedTasks = props.userData.tasks.filter((task) => {
  //   return task.completion === "true";
  // });

  // task array is not held within user object, need to refactor for separate call to task table.

  

  const { url } = useRouteMatch();

  const { user_id } = useParams();

  const history = useHistory();

  function deleteTask(e) {
    e.preventDefault();
    console.log(e.target);

    const taskId = e.target.alt;

    axios
      .delete(
        `https://school-in-the-cloud-bwpt15.herokuapp.com/api/tasks/${taskId}`
      )
      .then((res) => {
        // re-render Admin page with updated user data.
        //Deleted task shouldn't be in the tasks array
        history.push(`/admin/${user_id}`);
      })
      .catch((error) => alert(error.response.data.message));
  }

  return (
    <div className="adminhome">
      <header className="header">
        <h1>Hello, {props.userData.fname} </h1>
        <NavLink to={`${url}/newtask`}>
          <button className="newTaskButton">Create New Task</button>
        </NavLink>
      </header>
      <div className="tasks">
        <section className="open">
          <h3>Open Tasks</h3>
          {/*openTasks.map((task) => {
            return (
              <div className="task">
                <h2>{task.task_name}</h2>
                <img
                  src={deleteIcon}
                  alt={task.id}
                  onClick={deleteTask}
                />
                <Link to={`/admin/${user_id}/edit/${task.id}`}>
                  <img src={editIcon} alt="edit icon" />
                </Link>
              </div>
            );
          })*/}
        </section>
        <section className="closed">
          <h3>Closed Tasks</h3>

          {/*closedTasks.map((task) => {
            return (
              <div className="task">
                <h2>{task.task_name}</h2>
                <img
                  src={deleteIcon}
                  alt={task.id}
                  onClick={deleteTask}
                //   value={task.id}
                />
              </div>
            );
          })*/}
        </section>
      </div>
    </div>
  );
}

export default AdminHome;
