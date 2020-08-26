import React, { useState, useEffect } from "react";
import { useHistory, useParams, NavLink } from "react-router-dom";
import completeIcon from "../../assets/complete-icon.png";
import getStartedIcon from "../../assets/get-started-icon.png";

function VolunteerHome(props) {
  const openTasks = props.userData.tasks.filter((task) => {
    return task.completion === "false";
  });

  const closedTasks = props.userData.tasks.filter((task) => {
    return task.completion === "true";
  });

  const { user_id } = useParams();

  return (
    <div className="volunteerhome">
      <header className="header">
        <h1>Hello, {props.userData.fname} </h1>
      </header>
      <div className="tasks">
        <section className="open">
          <h3>Open Tasks</h3>
          {openTasks.map((task) => {
            return (
              <div className="task">
                <h2>{task.task_name}</h2>
                Click to mark complete
                <NavLink to={`/volunteer/${user_id}/complete/${task.id}`}>
                  <img src={getStartedIcon} alt="start icon" />
                </NavLink>
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
                <img src={completeIcon} alt="complete icon"/>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default VolunteerHome;
