import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import Popup from '../components/Popup';

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchProject();
        fetchTasks();
    }, [id]);

    const fetchProject = async () => {
        try {
            const response = await api.get(`projects/${id}/`);
            setProject(response.data);
        } catch (error) {
            console.error("Failed to fetch project");
        }
    };

    const fetchTasks = async () => {
        try {
            const response = await api.get('tasks/');
            const projectTasks = response.data.filter(t => t.project === parseInt(id));
            setTasks(projectTasks);
        } catch (error) {
            console.error("Failed to fetch tasks");
        }
    };

    const createTask = async () => {
        const title = prompt("Task Title:");
        if (title) {
            try {
                await api.post('tasks/', { title, project: id, status: 'Todo', priority: 'Medium' });
                fetchTasks();
            } catch (error) {
                alert("Failed to create task");
            }
        }
    };

    const updateTaskStatus = async (taskId, newStatus) => {
        try {
            await api.patch(`tasks/${taskId}/`, { status: newStatus });
            fetchTasks();
        } catch (error) {
            alert("Failed to update task");
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await api.delete(`tasks/${taskId}/`);
            fetchTasks();
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setErrorMsg("you are not authorised to perform this action");
            } else {
                alert("Failed to delete task");
            }
        }
    };

    if (!project) return <div>Loading...</div>;

    const statuses = ['Todo', 'In Progress', 'Review', 'Done'];

    return (
        <div>
            {errorMsg && <Popup message={errorMsg} onClose={() => setErrorMsg('')} />}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2>{project.name}</h2>
                    <p>{project.description}</p>
                </div>
                <button onClick={createTask}>+ Add Task</button>
            </div>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                {statuses.map(status => (
                    <div key={status} className="glass glass-panel" style={{ padding: '1rem' }}>
                        <h3 className="mb-4 text-center">{status}</h3>
                        <div style={{ minHeight: '300px' }}>
                            {tasks.filter(t => t.status === status).map(task => (
                                <div key={task.id} className="glass" style={{ padding: '1rem', marginBottom: '1rem', background: 'rgba(15, 23, 42, 0.8)' }}>
                                    <div className="flex justify-between items-center mb-4">
                                        <h4>{task.title}</h4>
                                        <button onClick={() => deleteTask(task.id)} className="btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>✕</button>
                                    </div>
                                    <p className="text-sm mb-4">{task.description}</p>
                                    <select 
                                        value={task.status} 
                                        onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                                        style={{ marginBottom: 0, padding: '0.5rem' }}
                                    >
                                        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectDetail;
