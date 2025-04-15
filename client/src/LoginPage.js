import React from 'react';
import "./loginpage.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const URL = process.env.REACT_APP_SERVER_URL;

const LoginPage = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [successMessage, setSuccessMessage] = useState(false);
    const [failureMessage, setFailureMessage] = useState(false);


    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post( `${URL}/login`, {username, password})
        .then(result => {
            console.log(result);
            if(result.data === "Success"){
                console.log("Login Success");
                //setMessage('Login successful!')
                setSuccessMessage(true)
                navigate('/');
            }
            else{
                //setMessage('Incorrect password! Please try again.');
                setFailureMessage(true)
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='login-container'>
            
            <form action="http://localhost:5000/login" method="POST" className='login-form' onSubmit={handleSubmit}>
                <h1 className='login-heading'>Login to your account</h1>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required onChange={(event) => setUsername(event.target.value)}/>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required onChange={(event) => setPassword(event.target.value)}/>

                <p>Forgot your password? <a href="/forgot-password">Reset it here</a></p>
                
                <button type="submit" className='login-button'>Login</button>
                <p>Don't have an account? <a href="/register">Register here</a></p>
                {successMessage && <p className='login-success'>Login successful!</p>}
                {failureMessage && <p className='login-failure'>Incorrect password! Please try again.</p>}
            </form>
            
        </div>
    );
};

export default LoginPage;