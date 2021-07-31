import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');

  const register = () => {
    axios.post('http://localhost:3001/signup', {
      username: usernameReg,
      password: passwordReg
    })
    .then(res => {
      console.log(res.data);
      setUsernameReg('');
      setPasswordReg('');
    })
    .catch(err => {
      console.log(err);
    });
  };
  
  return (
    <div className="App">
      <div className="registration">
        <h1>Register</h1>
        <label>Username</label>
        <input 
          type="text" 
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }} 
        />
        <label htmlFor="">Password</label>
        <input 
          type="password"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}   
        />
        <button onClick={register}>Register</button>
      </div>
      <div className="login">
        <h1>Login</h1>
        
      </div>
    </div>
  );
}

export default App;
