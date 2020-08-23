import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

function VolunteerHome(props) {

    return(
        <div className="volunteerhome">
            <header>
                <h1>Hello {props.userData.name}</h1>
            </header>
        </div>
    )

}

export default VolunteerHome;