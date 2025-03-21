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
                <span style={{fontSize: '120px', marginBottom: '50px', textAlign: 'center'}}>BioSphere</span>
                <h2 style={{textAlign: 'center'}}>BioSphere - A Gen AI Powered Centralized Platform for Wildlife, Biodiversity, and Conservation Projects Across India</h2>
                <ul style={{marginTop: 40, fontStyle: 'italic'}}>
                    <li style={{padding: 5}}>Integrates fragmented fata across government sites, NGOS, and research institutions</li>
                    <li style={{padding: 5}}>Provides real time coordinated data across stake holders</li>
                </ul>
                <div style={{fontSize: 25, marginTop: 35}}>Want to start a chat?</div>
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
