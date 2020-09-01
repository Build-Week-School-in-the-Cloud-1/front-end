import React, {useEffect } from "react";
import {useParams, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { dataFetch } from "../../actions/taskActions";
import completeIcon from "../../assets/complete-icon.png";
import getStartedIcon from "../../assets/get-started-icon.png";
import tasksData from "../TasksData";
import LogOutButton from "./LogOutButton";


function VolunteerHome(props) {
  const { user_id } = useParams();

  const openTasks = props.tasks.filter((task) => {
    return task.completion == false;
  });

  const closedTasks = props.tasks.filter((task) => {
    return task.completion == true;
  });

  useEffect(() => {
    props.dataFetch();
  }, []);

  return (
    <div className="volunteerhome">
      <header className="header-volunteer">
        <div className="header-content">
          <h1>
            Hello, {props.user.fname} {props.user.lname}
          </h1>
          <h3>Bio: {props.user.bio} </h3>
          <h3>Location: {props.user.country} </h3>
        </div>
        <div className="buttons">
          <NavLink to="/">
            <LogOutButton />
          </NavLink>
        </div>
      </header>
      <div className="tasks">
        <section className="open">
          <h3>Open Tasks</h3>
          {openTasks.map((task) => {
            return (
              <div className="task" key={task.id}>
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
              <div className="task" key={task.id}>
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

const mapStateToProps = state => {
  return{
    user: state.formReducer.userData.user,
    tasks: state.taskReducer.tasks
  };
};

export default connect(mapStateToProps, {dataFetch})(VolunteerHome);
