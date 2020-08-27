import React, { useState, useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";

function Home(props) {
  return (
    <div className="home">
      <header className="header homepage">
        <h1>WELCOME TO THE SCHOOL IN THE CLOUD</h1>
        <div className="buttons-home">
          <NavLink exact to="/login">
            <button className="button login">Login</button>
          </NavLink>
          <NavLink exact to="/signup">
            <button className="button signup">Sign Up</button>
          </NavLink>
        </div>
      </header>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/gLdXxFS8BV4"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    
    </div>
  );
}

export default Home;
