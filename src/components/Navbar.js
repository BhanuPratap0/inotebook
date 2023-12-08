import React from 'react'
import { Link, useLocation } from 'react-router-dom'
const Navbar = () => {

  let location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" >iNotebook</Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""} `} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""} `} to="/about">About</Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
          <Link className="btn btn-primary mx-1 " to="/login" role="button">Login</Link>
          <Link className="btn btn-primary mx-1 " to="/signup" role="button">Signup</Link>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
