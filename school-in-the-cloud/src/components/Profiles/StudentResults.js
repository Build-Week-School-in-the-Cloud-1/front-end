import React, { useState, useEffect } from "react";
import { useHistory, Route, Switch, useParams } from "react-router-dom";

function StudentResults(props){
    console.log(props.searchResponseData.map)
    return(
        <section className="results">
          
          {props.searchResponseData.map(teacher => {
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

export default StudentResults;