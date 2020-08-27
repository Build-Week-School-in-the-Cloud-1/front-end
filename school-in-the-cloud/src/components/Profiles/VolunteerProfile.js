import React, {useEffect } from "react";
import {useParams, NavLink } from "react-router-dom";
import completeIcon from "../../assets/complete-icon.png";
import getStartedIcon from "../../assets/get-started-icon.png";
import axios from "axios";
import LogOutButton from "./LogOutButton";


function VolunteerHome(props) {
  const { user_id } = useParams();

  const openTasks = props.tasksData.filter((task) => {
    return task.completion == false;
  });

  const closedTasks = props.tasksData.filter((task) => {
    return task.completion == true;
  });

  useEffect(() => {
    console.log(props);

    axios
      .get("https://school-in-the-cloud-bwpt15.herokuapp.com/api/tasks")
      .then((res) => {
        props.setTasksData(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <div className="volunteerhome">
      <header className="header-volunteer">
        <div classname="header-content">
          <h1>
            Hello, {props.usersData.user.fname} {props.usersData.user.lname}
          </h1>
          <h3>Bio: {props.usersData.user.bio} </h3>
          <h3>Location: {props.usersData.user.country} </h3>
        </div>
        <div className="buttons">
          <NavLink to="/">
            <LogOutButton userToken={props.usersData.token} />
          </NavLink>
        </div>
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
                <img src={completeIcon} alt="complete icon" />
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default VolunteerHome;
