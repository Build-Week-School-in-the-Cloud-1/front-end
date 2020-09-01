import React, { useState } from "react";
import {
  useHistory,
  Route,
  Switch,
  useParams,
  NavLink,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import { dataFetch } from "../../actions/formActions";
import countryList from "../Forms/countryList";
import StudentMyTeacher from "./StudentMyTeacher";
import teacherData from "../TeacherData";
import LogOutButton from "./LogOutButton";

function StudentHome(props) {
  const { user_id } = useParams();
  //const { url } = useRouteMatch();
  const history = useHistory();

  const url = `/student/${user_id}`;

  

  function submitHandler(e) {
    e.preventDefault();
    // axios
    //   .get("https://school-in-the-cloud-bwpt15.herokuapp.com/api/admin/users")
    //   .then((res) => {
    //     setStudentSearchResponse(res.data);
    //     history.push(`${url}/results`);
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });
    console.log("before", props.user);
    props.dataFetch("admin/users");
    console.log("after", props.user);
  }

  function changeHandler(e) {
    const newSearchData = {
      ...props.studentSearchData,
      [e.target.name]: e.target.value,
    };
    props.setStudentSearchData(props.newSearchData);
  }

  if(!props.isFetching && props.teachers.length > 0){
    const route = `/student/${props.user.id}/results`;
    return <Redirect to={route} />
  }

  return (
    <div className="studenthome">
      <header className="header-student">
      <div className="header-content">
          <h1>
            Hello, {props.user.fname} {props.user.lname}
          </h1>
          <h3>Bio: {props.user.bio} </h3>
          <h3>Location: {props.user.country} </h3>
        </div>

        <div className="buttons">
          <NavLink to="/">
            <LogOutButton />
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
          <StudentMyTeacher teachersData={teacherData} />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return{
    user: state.formReducer.userData.user,
    isFetching: state.formReducer.isFetching,
    teachers: state.formReducer.results
  };
};

export default connect(mapStateToProps, {dataFetch})(StudentHome);
