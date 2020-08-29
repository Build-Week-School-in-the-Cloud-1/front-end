import React from "react";
import {  NavLink} from "react-router-dom";
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
        width="70%"
        height="50%"
        src="https://www.youtube.com/embed/gLdXxFS8BV4"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="content">
        <section className="middle-content">
          <h2>Our Mission</h2>
          <h3>
            Our mission is to prepare them so that they can support those who
            need it in the best possible way.
          </h3>
        </section>
        <section className="bottom-content">
          <h3>
            <p>We prepare and teach students to reach their goals</p>
            <a
              href="https://schoolinthecloud-welcome.netlify.app/"
              target="_blank"
            >
              Learn More About US
            </a>
          </h3>
        </section>
      </div>
      <footer className="footer">
        <p>Made with ❤️ © 2020 School in the Cloud in 🇺🇸</p>
      </footer>
    </div>
  );
}

export default Home;
