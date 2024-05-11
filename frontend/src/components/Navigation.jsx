import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineUserAdd,
  HiOutlineLogin,
  HiOutlineLogout,
  HiOutlineClipboardList,
} from "react-icons/hi";
import { useAuthContext } from "../context/AuthContext";

export default function Navigation() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Link to="/" className="navbar-brand">
          My Notes App
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <Link to="/" className="nav-link">
                  <HiOutlineHome className="mr-1" /> Home
                </Link>

                <Link to="/notes" className="nav-link">
                  <HiOutlineClipboardList className="mr-1" /> Notes
                </Link>

                <button onClick={handleLogout} className="nav-link">
                  <HiOutlineLogout className="mr-1" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className="nav-link">
                  <HiOutlineUserAdd className="mr-1" /> Register
                </Link>
                <Link to="/login" className="nav-link">
                  <HiOutlineLogin className="mr-1" /> Login
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
