import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Login from './components/Forms/LoginForm'

function App() {
  return (
    <div className="App">
      <Login/>
    </div>
  );
}

export default App;
