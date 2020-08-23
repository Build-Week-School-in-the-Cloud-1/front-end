import React, {useState} from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Login from './components/Forms/LoginForm';
import SignUp from './components/Forms/SignUpForm';
import AdminHome, {AdminNewTask, AdminEdit} from './components/Profiles/AdminProfile';
import StudentHome from './components/Profiles/StudentProfile'
import VolunteerHome from './components/Profiles/VolunteerProfile'
import Home from './components/Home'

function App() {

  let [userData, setUserData] = useState({})

  return (
    <div className="App">
      <Switch>
        <Route path="/signup">
          <SignUp/>
        </Route>
        <Route path = "/login">
          <Login userData={userData}/>
        </Route>
        <Route exact path="/admin/newtask" >
            <AdminNewTask userData={userData}/>
        </Route>
        <Route exact path="/admin/edittask" >
            <AdminEdit userData={userData}/>
        </Route>
        <Route exact path="/admin" >
            <AdminHome userData={userData}/>
        </Route>
        <Route path="/student" userData={userData}>
            <StudentHome/>
        </Route>
        <Route path="/volunteer" userData={userData}>
            <VolunteerHome/>
        </Route>
        <Route exact path="/">
          <Home/>
        </Route>
      </Switch>
    </div>
    
  );
}

export default App;
