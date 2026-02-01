import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import { loginUser, registerUser } from '../services/authApi';
import './Login.css';

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
        name: '',
        phone: '',
        bloodGroup: 'O+',
        vehicleNumber: '',
        identityProof: '',
        allergies: ''
    });

    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        // Mock processing delay
        setTimeout(() => {
            if (isRegister) {
                // Register logic
                login({
                    username: formData.identifier,
                    role: 'USER',
                    name: formData.name || formData.identifier.split('@')[0],
                    phone: formData.phone,
                    bloodGroup: formData.bloodGroup,
                    vehicleNumber: formData.vehicleNumber,
                    identityProof: formData.identityProof,
                    allergies: formData.allergies
                });
                const from = location.state?.from?.pathname || '/';
                navigate(from, { replace: true });
            } else {
                // Login logic
                if (formData.password.trim().toLowerCase() === 'password') {
                    login({
                        username: formData.identifier,
                        role: 'ADMIN',
                        name: formData.identifier.split('@')[0]
                    });
                    const from = location.state?.from?.pathname || '/';
                    navigate(from, { replace: true });
                } else {
                    setError('Invalid credentials. Hint: use any username and "password"');
                    setIsSubmitting(false);
                }
            }
        }, 1000);
    };

    const toggleMode = () => {
        setIsRegister(!isRegister);
        setError('');
    };

    return (
        <div className="login-page">
            <div className="login-overlay"></div>
            <div className="login-container">
                <div className={`login-card ${isRegister ? 'register-mode' : ''}`}>
                    <div className="login-header">
                        <span className="logo-icon">{isRegister ? '📝' : '🚨'}</span>
                        <h1>{isRegister ? 'Join Res\'Q\'' : 'Welcome Back'}</h1>
                        <p>{isRegister ? 'Create your medical emergency profile' : 'Access the emergency network'}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        {error && <div className="error-message">{error}</div>}

                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label>Email or Username</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">👤</span>
                                    <input
                                        type="text"
                                        placeholder="e.g. admin"
                                        value={formData.identifier}
                                        onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            {isRegister && (
                                <>
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <div className="input-wrapper">
                                            <span className="input-icon">�</span>
                                            <input
                                                type="text"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Contact Phone</label>
                                        <div className="input-wrapper">
                                            <span className="input-icon">📞</span>
                                            <input
                                                type="tel"
                                                placeholder="+91 98765 43210"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Blood Group</label>
                                        <div className="input-wrapper">
                                            <span className="input-icon">🩸</span>
                                            <select
                                                value={formData.bloodGroup}
                                                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                                            >
                                                <option value="A+">A+</option>
                                                <option value="A-">A-</option>
                                                <option value="B+">B+</option>
                                                <option value="B-">B-</option>
                                                <option value="AB+">AB+</option>
                                                <option value="AB-">AB-</option>
                                                <option value="O+">O+</option>
                                                <option value="O-">O-</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Vehicle Number</label>
                                        <div className="input-wrapper">
                                            <span className="input-icon">�</span>
                                            <input
                                                type="text"
                                                placeholder="TS 09 EA 1234"
                                                value={formData.vehicleNumber}
                                                onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Identity Proof (ID #)</label>
                                        <div className="input-wrapper">
                                            <span className="input-icon">🆔</span>
                                            <input
                                                type="text"
                                                placeholder="Aadhar / DL / Voter ID"
                                                value={formData.identityProof}
                                                onChange={(e) => setFormData({ ...formData, identityProof: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Allergies</label>
                                        <div className="input-wrapper">
                                            <span className="input-icon">⚠️</span>
                                            <input
                                                type="text"
                                                placeholder="e.g. Peanuts, Aspirin"
                                                value={formData.allergies}
                                                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="form-group full-width">
                                <label>Password</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">🔒</span>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-options">
                            <label className="checkbox-container">
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                                Remember me
                            </label>
                            {!isRegister && <a href="#forgot" className="forgot-link">Forgot password?</a>}
                        </div>

                        <button type="submit" className="login-btn" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <span className="spinner"></span>
                            ) : (
                                isRegister ? 'CREATE ACCOUNT' : 'SIGN IN TO NETWORK'
                            )}
                        </button>
                    </form>

                    <div className="login-footer">
                        <p>
                            {isRegister ? 'Already have an account?' : 'Don\'t have an account?'}
                            <button onClick={toggleMode} className="toggle-btn">
                                {isRegister ? 'Sign In' : 'Register for access'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
