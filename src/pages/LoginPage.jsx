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
                <div className="signin-content">
                    <h1>BioSphere</h1>
                    <h2>BioSphere - A Gen AI Powered Centralized Platform for Wildlife, Biodiversity, and Conservation Projects Across India</h2>
                    <ul>
                        <li>Integrates fragmented data across government sites, NGOs, and research institutions</li>
                        <li>Provides real-time coordinated data across stake holders</li>
                    </ul>
                    <div className="description-text">Want to start a chat?</div>
                    <button className="sign-in-google-btn" onClick={handleLogin}>
                        <img 
                            className="google-icon" 
                            src="https://developers.google.com/identity/images/g-logo.png" 
                            alt="Google Icon"
                        />
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
