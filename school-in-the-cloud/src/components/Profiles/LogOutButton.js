import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'

function LogOutButton(props) {

    function logOut(e) {
        // didn't know exactly how to handle to delete the token
    }

    return(
    
        <button onClick={logOut} className="button logout">Log Out</button>
              
    )
}

export default LogOutButton;