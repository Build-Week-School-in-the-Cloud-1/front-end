import React, { useState } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Forms/LoginForm";
import SignUp from "./components/Forms/SignUpForm";
import AdminHome from "./components/Profiles/AdminProfile";
import AdminEdit from "./components/Profiles/AdminEditTask";
import AdminNewTask from "./components/Profiles/AdminNewTask";
import StudentHome from "./components/Profiles/StudentProfile";
import VolunteerHome from "./components/Profiles/VolunteerProfile";
import VolunteerTaskComplete from "./components/Profiles/VolunteerTaskComplete";
import Home from "./components/Home";
import userData from "./components/userData";
import taskData from "./components/TasksData";
import teacherData from "./components/TeacherData";
import taskAssignmentData from "./components/AssignmentTaskData";

// sample userData to be stored to Global props (Redux???) after successfull login in Login page
// App will pass it as props to all its childs while routing.
// Below userData is a sample of the data to be passed in props

function App() {
  const [usersData, setUsersData] = useState(userData);
  const [tasksData, setTasksData] = useState(taskData);
  const [teachersData, setTeachersData] = useState(teacherData);
  const [tasksAssignmentData, setTasksAssignmentData] = useState(taskAssignmentData);

  return (
    <div className="App">
      <Switch>
        <Route path="/signup">
          <SignUp
            usersData={usersData}
            tasksData={tasksData}
            teachersData={teachersData}
            setUsersData={setUsersData}
            setTasksData={setTasksData}
            setTeachersData={setTeachersData}
          />
        </Route>
        <Route exact path="/login">
          <Login
            usersData={usersData}
            tasksData={tasksData}
            teachersData={teachersData}
            setUsersData={setUsersData}
            setTasksData={setTasksData}
            setTeachersData={setTeachersData}
          />
        </Route>
        <Route exact path="/Admin/:user_id">
          <AdminHome
            usersData={usersData}
            tasksData={tasksData}
            setUsersData={setUsersData}
            setTasksData={setTasksData}
          />
        </Route>
        <Route path="/Admin/:user_id/edit/:task_id">
          <AdminEdit
            usersData={usersData}
            tasksData={tasksData}
            tasksAssignmentData={tasksAssignmentData}
            setUsersData={setUsersData}
            setTasksData={setTasksData}
            setTasksAssignmentData={setTasksAssignmentData}
          />
        </Route>
        <Route exact path="/Admin/:user_id/newtask">
          <AdminNewTask
            usersData={usersData}
            tasksData={tasksData}
            tasksAssignmentData={tasksAssignmentData}
            setUsersData={setUsersData}
            setTasksData={setTasksData}
            setTasksAssignmentData={setTasksAssignmentData}
          />
        </Route>
        <Route path="/student/:user_id">
          <StudentHome
            usersData={usersData}
            setUsersData={setUsersData}
            teachersData={teachersData}
            setTeachersData={setTeachersData}
          />
        </Route>
        <Route exact path="/volunteer/:user_id">
          <VolunteerHome
            usersData={usersData}
            setUsersData={setUsersData}
            tasksData={tasksData}
            setTasksData={setTasksData}
            tasksAssignmentData={tasksAssignmentData}
            setTasksAssignmentData={setTasksAssignmentData}
          />
        </Route>
        <Route path="/volunteer/:user_id/complete/:task_id">
          <VolunteerTaskComplete
            usersData={usersData}
            setUsersData={setUsersData}
            tasksData={tasksData}
            setTasksData={setTasksData}
            tasksAssignmentData={tasksAssignmentData}
            setTasksAssignmentData={setTasksAssignmentData}
          />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
