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
import Home from "./components/Home";

// sample userData to be stored to Global props (Redux???) after successfull login in Login page
// App will pass it as props to all its childs while routing. 
// Below userData is a sample of the data to be passed in props
import userData from './components/userData';

function App() {

  

  return (
    <div className="App">
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/login">
          <Login userData={userData} />
        </Route>
        <Route exact path="/admin">
          <AdminHome userData={userData} />
        </Route>
        <Route path="/admin/edit/:task_id">
          <AdminEdit userData={userData}/>
        </Route>
        <Route exact path="/admin/newtask">
          <AdminNewTask userData={userData} />
        </Route>
        <Route path="/student" userData={userData}>
          <StudentHome />
        </Route>
        <Route path="/volunteer" userData={userData}>
          <VolunteerHome />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
