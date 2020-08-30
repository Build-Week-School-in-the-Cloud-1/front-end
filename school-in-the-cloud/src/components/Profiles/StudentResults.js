import React from "react";
import { connect } from "react-redux";
import profilePlaceholderIcon from "../../assets/profile-placeholder-icon.png";

function StudentResults(props) {
  const matchingResponseData = props.teachers
              .filter((result) => result.country == props.studentSearchData.country )
              .filter((result)=> result.role == "Volunteer");

  console.log("teachers", props.teachers);

  return (
    <section className="results">
      {matchingResponseData.map((teacher) => {
        return (
          <div className="teacher" key={teacher.id}>
          <img src={profilePlaceholderIcon} alt="placeholder img"/>
            <h3>
              Name: {teacher.fname} {teacher.lname}
            </h3>
            <h4>Location: {teacher.country}</h4>
            <h4>Bio: {teacher.bio} </h4>
            
          </div>
        );
      })}
    </section>
  );
}

const mapStateToProps = state => {
  return{
    teachers: state.results
  };
};

export default connect(mapStateToProps, {})(StudentResults);
