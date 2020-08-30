import React, { useState } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./components/Forms/LoginForm";
import SignUp from "./components/Forms/SignUpForm";
import AdminHome from "./components/Profiles/AdminProfile";
import AdminEdit from "./components/Profiles/AdminEditTask";
import AdminNewTask from "./components/Profiles/AdminNewTask";
import StudentHome from "./components/Profiles/StudentProfile";
import VolunteerHome from "./components/Profiles/VolunteerProfile";
import VolunteerTaskComplete from "./components/Profiles/VolunteerTaskComplete";
import StudentResults from "./components/Profiles/StudentResults";
import PrivateRoute from "./utils/PrivateRoute";
import Home from "./components/Home";
import userData from "./components/userData";
import taskData from "./components/TasksData";
import teacherData from "./components/TeacherData";

// sample userData to be stored to Global props (Redux???) after successfull login in Login page
// App will pass it as props to all its childs while routing.
// Below userData is a sample of the data to be passed in props

function App(props) {
  const [tasksData, setTasksData] = useState(taskData);
  const [teachersData, setTeachersData] = useState(teacherData);

  const [studentSearchData, setStudentSearchData] = useState({
    country: "",
    availability: "",
    subject: "",
  });

  return (
    <div className="App">
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/Admin/:user_id">
          <AdminHome
            tasksData={tasksData}
            setTasksData={setTasksData}
          />
        </Route>
        <Route path="/Admin/:user_id/edit/:task_id">
          <AdminEdit
            tasksData={tasksData}
            setTasksData={setTasksData}
          />
        </Route>
        <Route exact path="/Admin/:user_id/newtask">
          <AdminNewTask />
        </Route>
        <Route path="/student/:user_id">
          <StudentHome
            teachersData={teachersData}
            studentSearchData={studentSearchData}
            setStudentSearchData={setStudentSearchData}
          />
        </Route>
        <Route path="/student/:user_id/results">
          <StudentResults studentSearchData={studentSearchData} />
        </Route>
        <Route exact path="/volunteer/:user_id">
          <VolunteerHome
            tasksData={tasksData}
            setTasksData={setTasksData}
          />
        </Route>
        <Route path="/volunteer/:user_id/complete/:task_id">
          <VolunteerTaskComplete
            tasksData={tasksData}
          />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

const mapStateToProps = state => {
  return{
    user: state.userData.user
  };
};

export default connect(mapStateToProps, {})(App);
