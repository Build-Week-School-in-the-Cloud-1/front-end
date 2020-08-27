import React, { useState } from "react";
import {
  useHistory,
  Route,
  Switch,
  useParams,
  NavLink
} from "react-router-dom";
import countryList from "../Forms/countryList";
import StudentMyTeacher from "./StudentMyTeacher";
import StudentResults from "./StudentResults";
import axios from "axios";
import LogOutButton from "./LogOutButton";

function StudentHome(props) {
  const { user_id } = useParams();
  //const { url } = useRouteMatch();
  const history = useHistory();

  const url = `/student/${user_id}`;

  const [studentSearchData, setStudentSearchData] = useState({
    country: "",
    availability: "",
    subject: "",
  });

  const [studentSearchResponse, setStudentSearchResponse] = useState([{
    id: "",
    fname: "",
    lname: "",
    email: "",
    username: "",
    password: "",
    country: "",
    role: "",
    bio: "",
    volunteer_time: "",
    student_time: "",
  }])


  function submitHandler(e) {
    e.preventDefault();
    axios
      .get("https://school-in-the-cloud-bwpt15.herokuapp.com/api/admin/users")
      .then((res) => {
        setStudentSearchResponse(res.data);
        history.push(`${url}/results`);
      })
      .catch((err) => {
        alert(err);
      });
  }

  


  function changeHandler(e) {
    const newSearchData = {
      ...studentSearchData,
      [e.target.name]: e.target.value,
    };
    setStudentSearchData(newSearchData);
  }

  return (
    <div className="studenthome">
      <header className="header-student">
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
      <div className="studentHomeComponents">
        <section className="search">
          <h2>Find Teachers</h2>

          <form onSubmit={submitHandler}>
            <label htmlFor="country">
              <select
                name="country"
                className="country"
                onChange={changeHandler}
              >
                <option value="">Country</option>
                {countryList.map((country, index) => {
                  return (
                    <option value={country.name} key={country.code}>
                      {country.name}
                    </option>
                  );
                })}
              </select>
            </label>
            <label htmlFor="availability">
              <select
                name="availability"
                id="availability"
                onChange={changeHandler}
              >
                <option value="">Availability</option>
                <option value="morning">{`Morning PST (9am to 12pm)`} </option>
                <option value="afternoon">{`Afternoon PST (12pm to 5pm)`}</option>
                <option value="evening">{`Evening PST (5pm to 9pm)`}</option>
              </select>
            </label>
            <label htmlFor="subject">
              <select name="subject" id="subject" onChange={changeHandler}>
                <option value="">Subject</option>
                <option value="Math">Math</option>
                <option value="English">English</option>
                <option value="Biology">Biology</option>
                <option value="Computer Science">Computer Science</option>
              </select>
            </label>
            <button>Find</button>
          </form>
        </section>

        <Switch>
          <Route exact path={`/student/${user_id}`}>
            <StudentMyTeacher teachersData={props.teachersData} />
          </Route>
          <Route exact path={`/student/${user_id}/results`}>
            <StudentResults studentSearchData={studentSearchData} studentSearchResponse ={studentSearchResponse} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default StudentHome;
