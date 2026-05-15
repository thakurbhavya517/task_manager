import React, { useState, useEffect } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('dashboard/');
                setStats(response.data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            }
        };
        fetchStats();
    }, []);

    if (!stats) return <div>Loading dashboard...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2>Dashboard Overview</h2>
                <Link to="/projects"><button>View Projects</button></Link>
            </div>
            
            <div className="grid">
                <div className="glass glass-panel text-center">
                    <h3>Total Projects</h3>
                    <h1 style={{ fontSize: '3rem', color: 'var(--primary)' }}>{stats.total_projects}</h1>
                </div>
                <div className="glass glass-panel text-center">
                    <h3>Total Tasks</h3>
                    <h1 style={{ fontSize: '3rem', color: 'var(--success)' }}>{stats.total_tasks}</h1>
                </div>
                <div className="glass glass-panel text-center" style={{ borderColor: stats.overdue_tasks > 0 ? 'var(--danger)' : '' }}>
                    <h3 style={{ color: stats.overdue_tasks > 0 ? 'var(--danger)' : '' }}>Overdue Tasks</h3>
                    <h1 style={{ fontSize: '3rem', color: stats.overdue_tasks > 0 ? 'var(--danger)' : 'var(--text-main)' }}>{stats.overdue_tasks}</h1>
                </div>
            </div>

            <h3 className="mt-4 mb-4">Tasks by Status</h3>
            <div className="grid">
                {Object.entries(stats.tasks_by_status).map(([status, count]) => (
                    <div key={status} className="glass glass-panel flex justify-between items-center">
                        <span className={`badge badge-${status.replace(' ', '-')}`}>{status}</span>
                        <h2>{count}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
