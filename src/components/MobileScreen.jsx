import React from 'react';

export default function MobileScreen({ children, className = "" }) {
    return (
        <div className="mobile-container">
            <div className="mobile-content">
                <div className={`mobile-card ${className}`}>
                    {children}
                </div>
            </div>
        </div>
    );
}
