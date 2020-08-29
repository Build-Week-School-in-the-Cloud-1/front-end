import React from "react";
import profilePlaceholderIcon from "../../assets/profile-placeholder-icon.png";

function StudentResults(props) {
  const matchingResponseData = props.studentSearchResponse
              .filter((result) => result.country == props.studentSearchData.country )
              .filter((result)=> result.role == "Volunteer");

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

export default StudentResults;
