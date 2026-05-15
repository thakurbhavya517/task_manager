import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await api.get('projects/');
            setProjects(response.data);
        } catch (error) {
            console.error("Failed to fetch projects", error);
        }
    };

    const createProject = async () => {
        const name = prompt("Project Name:");
        if (name) {
            try {
                await api.post('projects/', { name, description: '' });
                fetchProjects();
            } catch (error) {
                alert("Failed to create project");
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2>Projects</h2>
                {user?.role === 'Admin' && <button onClick={createProject}>+ New Project</button>}
            </div>
            
            <div className="grid">
                {projects.map(project => (
                    <Link to={`/projects/${project.id}`} key={project.id} style={{ textDecoration: 'none' }}>
                        <div className="glass glass-panel hover-effect">
                            <h3>{project.name}</h3>
                            <p className="mt-4 text-sm">Created: {new Date(project.created_at).toLocaleDateString()}</p>
                            <p className="text-sm">Owner: {project.owner_details?.username}</p>
                        </div>
                    </Link>
                ))}
            </div>
            {projects.length === 0 && <p className="text-center mt-4">No projects found.</p>}
        </div>
    );
};

export default Projects;
