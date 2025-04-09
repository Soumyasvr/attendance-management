import React from 'react';
import "./registerPage.css"
const RegisterPage = () => {
    return (
        <div className="register-container">
            
            <form action="http://localhost:5000/register" method="POST" className='register-form'>
                <h1>Create a new account</h1>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />

                <button type="submit">Register</button>
                <p>Already have an account? <a href="/login">Login here</a></p>
            </form>
            
        </div>
    );
};

export default RegisterPage;