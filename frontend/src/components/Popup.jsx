import React, { useState, useEffect } from 'react';

const Popup = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="glass glass-panel popup-content" onClick={e => e.stopPropagation()}>
                <h3 style={{ color: 'var(--danger)', marginBottom: '1rem' }}>Access Denied</h3>
                <p>{message}</p>
                <button onClick={onClose} className="mt-4">Close</button>
            </div>
        </div>
    );
};

export default Popup;
