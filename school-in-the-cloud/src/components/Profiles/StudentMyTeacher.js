import React from "react";

function StudentMyTeacher(props){

    
    return(
        <section className="teachers">
          <h2>My Teachers</h2>
          {props.teachersData.map(teacher => {
              return (
                <div className="teacher" key={teacher.id}>
                    <img src={teacher.img_url} alt="teacher image"/>
                    <h3>Name: {teacher.name}</h3>
                    <h4>Location: {teacher.location}</h4>
                    <h4>Bio: {teacher.bio}</h4>
                </div>
              )
          })}

    
        </section>
    )
}

export default StudentMyTeacher;

