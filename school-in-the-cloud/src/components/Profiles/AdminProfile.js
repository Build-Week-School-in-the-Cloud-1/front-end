import React, {useState, useEffect} from 'react';
import {useHistory, NavLink, Route, useRouteMatch, useParams} from 'react-router-dom';
import deleteIcon from '../../assets/delete-icon.png';
import editIcon from '../../assets/edit-icon.png'


function AdminHome(props) {
    console.log(props)

    // const openTasks = props.data.tasks.filter(task => {
    //     return task.completion === "false"
    // })

    // const closedTasks = props.data.tasks.filter(task => {
    //     return task.completion === "true"
    // })

     const [taskData, setTaskData] = useState({});
    
    return(
        <div className="adminhome">
            <header className="header">
                <h1>Hello  </h1>
                <NavLink to="admin/newtask">
                    <button className="newTaskButton">Create New Task</button>
                </NavLink>
            </header>
            <div className="tasks">
                <section className="open">
                    <h3>Open Tasks</h3>
                    <div className="task">
                        <h2> Task 1 </h2>
                        <img src={deleteIcon} alt="delete icon"/>
                        <img src={editIcon} alt="edit icon"/>
                    </div>
                    <div className="task">
                        <h2> Task 2 </h2>
                        <img src={deleteIcon} alt="delete icon"/>
                        <img src={editIcon} alt="edit icon"/>
                    </div>


                    {/* 
                    
                    
                    {props.data.openTasks.map(task=>{

                        return (
                            <div key={task.id} className="task">
                                {task.title}
                                <img src={deleteIcon alt=""/>
                                <img src={editIcon} alt=""/>
                            </div>
                        )
                        
                    })} */}
                </section>
                <section className="closed">
                    <h3>Closed Tasks</h3>
                    <div className="task">
                        <h2> Task 3 </h2>
                        <img src={deleteIcon} alt="delete icon"/> 
                    </div>
                    <div className="task">
                        <h2> Task 4 </h2>
                        <img src={deleteIcon} alt="delete icon"/>
                        
                    </div>
                    {/* 
                    
                    
                    {props.data.closedTasks.map(task=>{

                        return (
                            <div key={task.id} className="task">
                                {task.title}
                                <img src={deleteIcon} alt="delete-icon"/>
                            </div>
                        )
                        
                    })} */}
                </section>
            </div>
        </div>
    )

}

export function AdminNewTask(props){

    const[newTaskData, setNewTaskData] = useState({
        task_name:"",
        task_description:"",
        completion: false
    })



    return(
        <form action="">
            <label htmlFor="task_name">
                <input type="text" name="task_name" placeholder="Enter Task title" />
            </label>
            <label htmlFor="task_assignee">
                <input type="text" name="task_assignee" placeholder = "Enter assignee here" />
            </label>
            <label htmlFor="task_description">
                <input type="textarea" name="task_description" placeholder = "Enter tasks here"/>
            </label>
            <button>Create New Task</button>
        </form>
    )
}

export function AdminEdit(props){

    return(

        <form action="">

        <form action="">
            <label htmlFor="task_name">
                <input type="text" name="task_name" /*value={props.data.opentasks[id].task_name}*//>
            </label>
            <label htmlFor="task_name">
                <input type="text" name="task_assignee" placeholder = "Enter assignee here" />
            </label>
            <label htmlFor="task_name">
                <input type="textarea" name="task_description" placeholder = "Enter tasks here"/>
            </label>
        </form>

        </form>

    )
}



export default AdminHome;