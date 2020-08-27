import React, { useState, useEffect } from "react";
import { useHistory, Route, Switch, useParams } from "react-router-dom";

function StudentMyTeacher(props){
    
    return(
        <section className="teachers">
          
          {props.userData.teachers.map(teacher => {
              return (
                <div className="teacher" key={teacher.id}>
                    <h3>Name: {teacher.name}</h3>
                    <p>Location: {teacher.location}</p>
                </div>
              )
          })}

    
        </section>
    )
}

export default StudentMyTeacher;

