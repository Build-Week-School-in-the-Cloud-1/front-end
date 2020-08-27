import React, { useState, useEffect } from "react";
import {
  useHistory,
  Route,
  Switch,
  useParams,
  useRouteMatch,
  Link,
} from "react-router-dom";
import countryList from "../Forms/countryList";
import StudentMyTeacher from "./StudentMyTeacher";
import StudentResults from "./StudentResults";
import axios from "axios";

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

  const [searchResponseData, setSearchResponseData] = useState([]);

  const testSearchResponseData = [
    {
      name: "Sample Teacher 5",
      location: "Albania",
      id: 109,
    },
    {
      name: "Sample Teacher 7",
      location: "Albania",
      id: 7,
    },
    {
      name: "Sample Teacher 71",
      location: "Albania",
      id: 71,
    },
  ];

  function submitHandler(e) {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", testSearchResponseData)
      .then((res) => {
        console.log(`Hello`);
        setSearchResponseData(res.data);
        setTimeout(() => {
          history.push(`${url}/results`);
        }, 500);
        
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
      <header className="header">
        <h1>Hello, {props.userData.fname}</h1>
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
                  return <option value={country.name} key={country.code}>{country.name}</option>;
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
            <StudentMyTeacher userData={props.userData} />
          </Route>
          <Route exact path ={`/student/${user_id}/results`}>
            <StudentResults searchResponseData={searchResponseData} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default StudentHome;
