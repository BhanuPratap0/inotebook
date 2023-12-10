import React from 'react'
import logo from '../logo.png'
import proIcon from './profile icon.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
const Navbar = () => {
  let history=useNavigate();
  let location = useLocation();
  const handleLogout=()=>{
    localStorage.removeItem('token')
    history("/login")

  }
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-fixed-top " data-bs-theme="dark" style={{backgroundColor:"#7b3c3c",fontSize: "20px"}} >
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <img className='logo-img' src={logo} />
        <Link className="navbar-brand" to="/">iNotebook</Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {localStorage.getItem('token') ?<li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""} `} to="/">Home</Link>
            </li>:null}
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""} `} to="/about">About</Link>
            </li>
          </ul>
          { !localStorage.getItem('token') ?<form className="d-flex" role="search">
          <Link className="btn btn-primary mx-1 " to="/login" role="button">Login</Link>
          <Link className="btn btn-primary mx-1 " to="/signup" role="button">Signup</Link>
          </form>: <div><buttons className="btn btn-primary mx-1 " onClick={handleLogout} role="button">Logout</buttons></div>}
        </div>
        {localStorage.getItem('token')&&<Link to="/profile" ><img src={proIcon} style={{width:"50px", marginRight:"10px", marginLeft:"10px" }} /></Link>}
      </div>
    </nav>
  )
}

export default Navbar
