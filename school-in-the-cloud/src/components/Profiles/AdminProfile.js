import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import deleteIcon from "../../assets/delete-icon.png";
import editIcon from "../../assets/edit-icon.png";

function AdminHome(props) {
  const openTasks = props.userData.tasks.filter((task) => {
    return task.completion === "false";
  });

  console.log(openTasks);

  const closedTasks = props.userData.tasks.filter((task) => {
    return task.completion === "true";
  });

  return (
    <div className="adminhome">
      <header className="header">
        <h1>Hello, {props.userData.fname} </h1>
        <NavLink to="/admin/newtask">
          <button className="newTaskButton">Create New Task</button>
        </NavLink>
      </header>
      <div className="tasks">
        <section className="open">
          <h3>Open Tasks</h3>
          {openTasks.map((task) => {
            return (
              <div className="task">
                <h2>{task.task_name}</h2>
                <img src={deleteIcon} alt="delete icon" />
                <Link to={`/admin/edit/${task.id}`}>
                  <img src={editIcon} alt="edit icon" />
                </Link>
              </div>
            );
          })}
        </section>
        <section className="closed">
          <h3>Closed Tasks</h3>

          {closedTasks.map((task) => {
            return (
              <div className="task">
                <h2>{task.task_name}</h2>
                <img src={deleteIcon} alt="delete-icon" />
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default AdminHome;
