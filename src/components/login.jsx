import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        try {
            const response = await axios.get('http://localhost:3001/login', {
                username: username,
                password: password
            });
            if (response.data.success) {
                window.location.href = 'http://localhost:3001/';
            }
            else {
                alert('Invalid username or password');
            }
        } catch (error) {
            alert('Error logging in');
        }
    };

    return (
        <div className="App">
            <div className="login">
            <h1>Login</h1>
            <label>Username</label>
            <input 
              type="text" 
              onChange={(e) => {
                setUsername(e.target.value);
              }} 
            />
            <label htmlFor="">Password</label>
            <input 
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}   
            />
            <button onClick={login}>Login</button>
            </div>
        </div>
    );
}

export default Login;