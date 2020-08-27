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
import VolunteerTaskComplete from "./components/Profiles/VolunteerTaskComplete"
import Home from "./components/Home";

// sample userData to be stored to Global props (Redux???) after successfull login in Login page
// App will pass it as props to all its childs while routing. 
// Below userData is a sample of the data to be passed in props
import userData from './components/userData';

function App() {

  const [userData, setUserData] = useState({
    "message": "You are logged in!",
    "token": "",
    "user": {
        "id": 78,
        "fname": "James",
        "lname": "Barker",
        "email": "jamesbarker@gmail.com",
        "username": "jamesbarker",
        "password": "$2a$14$I.oVHgWwWQQR..H6I6ZUNOULOtASGcJy41TNhUJuKp/h8hlEGkd/O",
        "country": "America",
        "role": "Admin",
        "bio": ";lskdjf;lksajdf;lkjasd;flkjasd;lkfj;asdlkjf;",
        "volunteer_time": "time",
        "student_time": "time"
    }
});

  return (
    <div className="App">
      <Switch>
        <Route path="/signup">
          <SignUp setUserData={setUserData} />
        </Route>
        <Route exact path="/login">
          <Login userData={userData} setUserData={setUserData} />
        </Route>
        <Route exact path="/Admin/:user_id">
          <AdminHome userData={userData} />
        </Route>
        <Route path="/Admin/:user_id/edit/:task_id">
          <AdminEdit userData={userData}/>
        </Route>
        <Route exact path="/Admin/:user_id/newtask">
          <AdminNewTask userData={userData} />
        </Route>
        <Route path="/student/:user_id">
          <StudentHome userData={userData}/>
        </Route>
        <Route exact path="/volunteer/:user_id" >
          <VolunteerHome userData={userData}/>
        </Route>
        <Route path="/volunteer/:user_id/complete/:task_id" >
          <VolunteerTaskComplete userData={userData}/>
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
