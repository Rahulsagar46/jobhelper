import React, { useState } from 'react';
import '../styles/SignupLogin.css';

const SignupLogin = () => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="signup-login-container">
      <div className="signup-login-hero">
        <h1>Welcome to JobHelper</h1>
        <p>Find your dream job and ace your interviews!</p>
      </div>
      <div className="signup-login-tabs">
        <button
          className={`tab-btn ${!isSignup ? 'active' : ''}`}
          onClick={() => setIsSignup(false)}
        >
          Login
        </button>
        <button
          className={`tab-btn ${isSignup ? 'active' : ''}`}
          onClick={() => setIsSignup(true)}
        >
          Sign Up
        </button>
      </div>
      {isSignup ? (
        <form className="signup-login-form">
          <input type="text" placeholder="Full Name" required className="input-field" />
          <input type="email" placeholder="Email ID" required className="input-field" />
          <input type="password" placeholder="Password" required className="input-field" />
          <button type="submit" className="submit-btn">Sign Up</button>
        </form>
      ) : (
        <form className="signup-login-form">
          <input type="email" placeholder="Email ID" required className="input-field" />
          <input type="password" placeholder="Password" required className="input-field" />
          <button type="submit" className="submit-btn">Login</button>
        </form>
      )}
      <div className="oauth-section">
        <p>Or login with:</p>
        <button className="oauth-btn linkedin">LinkedIn</button>
        <button className="oauth-btn gmail">Gmail</button>
      </div>
    </div>
  );
};

export default SignupLogin;
