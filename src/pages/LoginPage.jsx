// LoginPage.js
import React from "react";
import "../login.css";

const LoginPage = () => {

    const handleLogin = () => {
        window.location.href = "http://127.0.0.1:5000/login";
    };

    return (
        <div className="login-page-box">
            <h1>App Name</h1>
            <div>One Line description</div>
            <div>What all it can do?</div>
            <div>Points</div>
            <div>Want to start a chat? Sign in from below</div>
            <div></div>
            <button className="sign-in-google-btn" onClick={handleLogin}>
                <img className="google-icon" src="https://developers.google.com/identity/images/g-logo.png" alt="Google Icon" />
                Sign in with Google
            </button>
        </div>
    );
};

export default LoginPage;
