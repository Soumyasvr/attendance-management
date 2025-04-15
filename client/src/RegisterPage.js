import React from 'react';
import "./registerPage.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const URL = process.env.REACT_APP_SERVER_URL;

const RegisterPage = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState(false);
    const [message, setMessage] = React.useState(false);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post(`${URL}/register`, { username, password })
        .then(result => {
            console.log(result);
            if(result.data === "Already registered"){
                //alert("You are already registered! Please Login to proceed.");
                setSuccessMessage(true);
                setTimeout(() => {
                    navigate('/login');
                  }, 2000);
                  
                
            } else {
                //alert("Registered successfully! Please Login to proceed.");
                setMessage(true);
                setTimeout(() => {
                    navigate('/login');
                  }, 2000);
            }
        })
        .catch(err => {
            console.log("Error while registering:", err);
            alert("Something went wrong during registration.");
        });
    }

    return (
        <div className="register-container">
            <form className='register-form' onSubmit={handleSubmit}>
                <h1>Create a new account</h1>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" required onChange={(e) => setUsername(e.target.value)} />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" required onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Register</button>
                <p>Already have an account? <a href="/login">Login here</a></p>
                {successMessage && <p className='registered'>You are already registered! Please Login to proceed.</p>}
                {message && <p className='register-success'>Registered successfully! Please Login to proceed.</p>}
            </form>
        </div>
    );
};

export default RegisterPage;
