import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'Member' });
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData.username, formData.email, formData.password, formData.role);
            navigate('/');
        } catch (error) {
            alert('Registration failed. Username might be taken.');
        }
    };

    return (
        <div className="flex items-center justify-center" style={{ minHeight: '80vh' }}>
            <div className="glass glass-panel" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} required />
                    <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                    <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                    <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                        <option value="Member">Member</option>
                        <option value="Admin">Admin</option>
                    </select>
                    <button type="submit" style={{ width: '100%' }}>Register</button>
                </form>
                <p className="text-center mt-4">
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)' }}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
