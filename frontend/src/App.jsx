import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) return <div>Loading...</div>;
    return user ? children : <Navigate to="/login" />;
};

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    if (!user) return null;
    
    return (
        <nav className="glass nav">
            <h2>TaskMaster <span className="text-sm badge badge-Todo">{user.role}</span></h2>
            <div className="nav-links">
                <Link to="/">Dashboard</Link>
                <Link to="/projects">Projects</Link>
                <button onClick={logout} className="btn-danger">Logout</button>
            </div>
        </nav>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="container">
                    <Navbar />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                        <Route path="/projects" element={<PrivateRoute><Projects /></PrivateRoute>} />
                        <Route path="/projects/:id" element={<PrivateRoute><ProjectDetail /></PrivateRoute>} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
