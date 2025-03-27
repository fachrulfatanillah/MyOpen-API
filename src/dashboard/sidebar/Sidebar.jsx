import { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaChartPie, FaClipboardList, FaPenAlt } from "react-icons/fa";
import TopNavbar from "../top-navbar/TopNavbar";
import "./Sidebar.css";

const Sidebar = () => {
    return <Container_SideBar />;
};

const Container_SideBar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
    
    // Gunakan ref untuk mendeteksi klik di luar submenu
    const submenuRef = useRef(null);

    // Fungsi untuk menangani klik di luar submenu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (submenuRef.current && !submenuRef.current.contains(event.target)) {
                setIsSubmenuOpen(false); // Tutup submenu jika klik di luar
            }
        };

        if (isSubmenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSubmenuOpen]);

    return (
        <div className="section-sidebar">
            <div className={`container-sidebar ${isCollapsed ? "collapsed" : ""}`}>
                <div className="container-title-sidebar">
                    <h1>MyOpen-API</h1>
                    <button
                        className="sidebar-menu-toggle"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    ></button>
                </div>

                <div className="container-sidebar-btn-create-project">
                    <button className="btn-sidebar-create-project">Create Project</button>
                    <div className="container-sidebar-btn-create">
                        <FaPenAlt className="sidebar-btn-create-icon" />
                    </div>
                </div>

                <ul className="sidebar-menu">
                    <li>
                        <a href="#">
                            <FaChartPie className="sidebar-menu-icon" />
                            <span className={`menu-text ${isCollapsed ? "hidden" : ""}`}>
                                Dashboard
                            </span>
                        </a>
                    </li>
                    <li className="sidebar-has-submenu" ref={submenuRef}>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsSubmenuOpen(!isSubmenuOpen);
                            }}
                        >
                            <FaClipboardList className="sidebar-menu-icon" />
                            <span className={`menu-text ${isCollapsed ? "hidden" : ""}`}>
                                Projects
                            </span>
                            {!isCollapsed && (
                                <FaChevronDown
                                    className={`sidebar-submenu-icon ${isSubmenuOpen ? "open" : ""}`}
                                />
                            )}
                        </a>

                        {isSubmenuOpen && (
                            <ul className="sidebar-submenu">
                                <li>
                                    <a href="#">Project 1</a>
                                </li>
                                <li>
                                    <a href="#">Project 2</a>
                                </li>
                                <li>
                                    <a href="#">Project 3</a>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Top Navbar */}
                <TopNavbar />

                {/* Page Content */}
                <div className="page-content">
                    <p>Hello World</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;