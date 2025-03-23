import { useState, useRef, useEffect } from "react";
import "./TopNavbar.css";

const TopNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const circleRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            setTimeout(() => {
                if (
                    menuRef.current && !menuRef.current.contains(event.target) &&
                    circleRef.current && !circleRef.current.contains(event.target)
                ) {
                    setIsOpen(false);
                }
            }, 50);
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="top-navbar">
            <div
                className="top-navbar-circle"
                ref={circleRef}
                onClick={() => setIsOpen(prev => !prev)}
            ></div>

            {isOpen && (
                <ul className="top-navbar-submenu" ref={menuRef}>
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Settings</a></li>
                    <li><a href="#">Logout</a></li>
                </ul>
            )}
        </div>
    );
};

export default TopNavbar;
