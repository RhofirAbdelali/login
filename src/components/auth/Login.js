import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import AuthService from '../services/AuthService';
import './Login.css'; // Fichier CSS pour le style

const Login = () => {
    const Auth = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userDetails = await AuthService.login({ Email: email, motdepasse: password });
            Auth.userLogin(userDetails);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-page">
        <div className="login-container">
            <div className="login-card">
                <div className="login-image">
                    <img src="https://byte-co.fr/wp-content/uploads/2024/11/undraw_Developer_activity_re_39tg.png" alt="Welcome" />
                </div>
                <form onSubmit={handleLogin} className="login-form">
                    <h2>WELCOME</h2>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">LOGIN</button>
                    {error && <div className="error-message">{error}</div>}
                </form>
            </div>
        </div>
        </div>
    );
};

export default Login;