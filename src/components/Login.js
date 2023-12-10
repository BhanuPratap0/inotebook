import React, { useContext, useState } from 'react'
import logo from './bg.jpg'
import banner from './banner.jpg'
import alertContext from '../context/alert/alertContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = (props) => {
    document.body.style.backgroundImage = `url(${logo})`;
    document.body.style.backgroundSize = "cover";
    const context=useContext(alertContext);
    const {showAlert}=context;
    const [credential, setCredential]= useState({email: "", password: ""})
    let history=useNavigate();
    const handleClick = async(e) => {
        props.handleProgress(20);
        e.preventDefault();
        const response = await fetch(`https://inotebookbackend-zolh.onrender.com/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email:credential.email, password: credential.password }),
        });
        props.handleProgress(50);
        const json = await response.json();
        props.handleProgress(100);
        console.log(json);
        if(json.success){
            //redirect
            localStorage.setItem('token', json.authToken);
            localStorage.setItem('email',credential.email);
            localStorage.setItem('password',credential.password);
            showAlert("Login Success", "success")
            history("/")
        }else{
            localStorage.removeItem('token')
            showAlert("Invalid Credential", "danger")
        }
    }
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    return (
        <section>
            <div className="signin">
                <div className="content">
                    <h2>Welcome to iNoteBook</h2>
                    <form className="form" onSubmit={handleClick} >
                        <div className="inputBox">
                        <input type="email" id="email" name="email"  onChange={onChange} value={credential.email}  required /><i>Email</i>
                        </div>
                        <div className="inputBox">
                        <input type="password" onChange={onChange}  value={credential.password} id="password" name="password" required /><i>Password</i>
                        </div>
                        <div className="links"><p style={{color:"white"}}>Don't have an Account?&nbsp;&nbsp;</p><Link to="/signup">Signup</Link>
                        </div>
                        <div className="inputBox">
                            <input type="submit" value="Login" />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login
