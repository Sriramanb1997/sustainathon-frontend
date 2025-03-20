// LoginPage.js
import React from "react";
import "../login.css";
import biosphere from "../assets/BioSphere.jpg";
const LoginPage = () => {

    const handleLogin = () => {
        window.location.href = "http://127.0.0.1:5000/login";
    };

    return (

        <div className="login-page">
            <div className="image-section">
                <img src={biosphere} alt="Static" className="static-image" />
            </div>
            <div className="signin-section">
                <span style={{fontSize: '120px', marginBottom: '50px'}}>BioSphere</span>
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
        </div>
        // <div>
        // <div><img src={biosphere}/></div>
        // <div className="login-page-box">
        //     <h1>App Name</h1>
        //     <div>One Line description</div>
        //     <div>What all it can do?</div>
        //     <div>Points</div>
        //     <div>Want to start a chat? Sign in from below</div>
        //     <div></div>
        //     <button className="sign-in-google-btn" onClick={handleLogin}>
        //         <img className="google-icon" src="https://developers.google.com/identity/images/g-logo.png" alt="Google Icon" />
        //         Sign in with Google
        //     </button>
        // </div>
        // </div>
    );
};

export default LoginPage;
