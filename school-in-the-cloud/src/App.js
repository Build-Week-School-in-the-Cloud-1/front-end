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
import StudentMyTeacher from "./components/Profiles/StudentMyTeacher";
import PrivateRoute from "./utils/PrivateRoute";
import Home from "./components/Home";


// sample userData to be stored to Global props (Redux???) after successfull login in Login page
// App will pass it as props to all its childs while routing.
// Below userData is a sample of the data to be passed in props

function App(props) {

  return (
    <div className="App">
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        
        <PrivateRoute path="/Admin/:user_id/newtask" component={AdminNewTask} />
        <PrivateRoute path="/Admin/:user_id" component={AdminHome} />
        <PrivateRoute path="/Admin/edit/:task_id" component={AdminEdit} />
        <PrivateRoute path="/student/:user_id/results" component={StudentResults} />
        <PrivateRoute path="/student/:user_id" component={StudentHome} />
        <PrivateRoute path="/volunteer/:user_id/complete/:task_id" component={VolunteerTaskComplete} />
        <PrivateRoute path="/volunteer/:user_id" component={VolunteerHome} />

        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

const mapStateToProps = state => {
  return{
    user: state.formReducer.userData.user
  };
};

export default connect(mapStateToProps, {})(App);
