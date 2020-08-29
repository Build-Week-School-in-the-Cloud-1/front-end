import React, { useEffect } from "react";
import {
  Link,
  NavLink,
  useRouteMatch,
  useParams,
  useHistory,
} from "react-router-dom";
import { connect } from "react-redux";
import deleteIcon from "../../assets/delete-icon.png";
import editIcon from "../../assets/edit-icon.png";
import axios from "axios";
import LogOutButton from "./LogOutButton";

function AdminHome(props) {
  const openTasks = props.tasksData.filter((task) => {
    return task.completion === false;
  });

  const closedTasks = props.tasksData.filter((task) => {
    return task.completion === true;
  });

  const { url } = useRouteMatch();

  const { user_id } = useParams();

  const history = useHistory();

  useEffect(() => {
    axios
      .get("https://school-in-the-cloud-bwpt15.herokuapp.com/api/tasks")
      .then((res) => {
        props.setTasksData(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  function deleteTask(e) {
    e.preventDefault();
    console.log(e.target);

    const taskId = e.target.alt;

    axios
      .delete(
        `https://school-in-the-cloud-bwpt15.herokuapp.com/api/tasks/${taskId}`
      )
      .then((res) => {
        history.go(0);
      })
      .catch((error) => alert(`couldn't delete :( `));
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
          
        </div>
      </header>
      <div className="tasks">
        <section className="open">
          <h3>Open Tasks</h3>
          {/*openTasks.map((task) => {
            return (
              <div className="task">
                <h2>{task.task_name}</h2>
                <img src={deleteIcon} alt={task.id} onClick={deleteTask} />
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
                <img src={deleteIcon} alt={task.id} onClick={deleteTask} />
              </div>
            );
          })*/}
        </section>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return{
    user: state.userData.user
  };
};

export default connect(mapStateToProps, {})(AdminHome);
