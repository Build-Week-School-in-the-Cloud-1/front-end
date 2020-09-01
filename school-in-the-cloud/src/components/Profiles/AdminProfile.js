import React, { useState, useEffect } from "react";
import {
  Link,
  NavLink,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { connect } from "react-redux";
import { dataFetch, delData } from "../../actions/taskActions";
import deleteIcon from "../../assets/delete-icon.png";
import editIcon from "../../assets/edit-icon.png";
import LogOutButton from "./LogOutButton";

function AdminHome(props) {
  const openTasks = props.tasks.filter((task) => {
    return task.completion === false;
  });

  const closedTasks = props.tasks.filter((task) => {
    return task.completion === true;
  });
  const [deleteFlag, setDeleteFlag] = useState(false);

  const { url } = useRouteMatch();

  const { user_id } = useParams();

  useEffect(() => {
    props.dataFetch();
    setDeleteFlag(false);
  }, [deleteFlag]);

  function deleteTask(e) {
    e.preventDefault();
    const taskId = e.target.alt;
    props.delData(taskId);
    setDeleteFlag(true);
  }

  return (
    <div className="adminhome">
      <header className="header-admin">
        <div className="header-content">
          <h1>
            Hello, {props.user.fname} {props.user.lname}
          </h1>
          <h3>Bio: {props.user.bio} </h3>
          <h3>Location: {props.user.country} </h3>
        </div>

        <div className="buttons">
          <NavLink to={`${url}/newtask`}>
            <button className="newTaskButton">Create New Task</button>
          </NavLink>
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
                <span onClick={deleteTask}>
                <img src={deleteIcon} alt={task.id} />
                </span>
                <Link to={`/admin/${user_id}/edit/${task.id}`}>
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
              <div className="task" key={task.id}>
                <h2>{task.task_name}</h2>
                <span onClick={deleteTask}>
                  <img src={deleteIcon} alt={task.id} />
                </span>
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

export default connect(mapStateToProps, {dataFetch, delData})(AdminHome);
