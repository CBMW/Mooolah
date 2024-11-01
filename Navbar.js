import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Close the menu if clicking outside
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!event.target.closest('.navbar') && isOpen) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen]);

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">moolah</Link>
            </div>
            <div
                className="menu-icon"
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-controls="nav-links"
            >
                {/* Replace the Font Awesome icon with a Unicode character */}
                <span style={{ fontSize: '24px', cursor: 'pointer', color: '#a0e4b0' }}>☰</span>
            </div>
            <ul id="nav-links" className={`nav-links ${isOpen ? 'active' : ''}`}>
                <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
                <li><Link to="/features" onClick={toggleMenu}>Features</Link></li>
                <li><Link to="/pricing" onClick={toggleMenu}>Pricing</Link></li>
                <li><Link to="/results" onClick={toggleMenu}>Results</Link></li>
                <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
                <li><Link to="/signup" onClick={toggleMenu}>Sign Up</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
