import React from 'react';
import "./loginpage.css"
const LoginPage = () => {
    return (
        <div className='login-container'>
            
            <form action="http://localhost:5000/login" method="POST" className='login-form'>
                <h1 className='login-heading'>Login to your account</h1>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />

                <p>Forgot your password? <a href="/forgot-password">Reset it here</a></p>
                
                <button type="submit" className='login-button'>Login</button>
                <p>Don't have an account? <a href="/register">Register here</a></p>

            </form>
            
        </div>
    );
};

export default LoginPage;