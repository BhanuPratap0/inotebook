import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import alertContext from '../context/alert/alertContext'

const Login = () => {
    const context=useContext(alertContext);
    const {showAlert}=context;
    const [credential, setCredential]= useState({email: "", password: ""})
    let history=useNavigate();
    const handleClick = async(e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email:credential.email, password: credential.password }),
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //redirect
            localStorage.setItem('token', json.authtoken);
            showAlert("Login Success", "success")
            history("/")
        }else{
            showAlert("Invalid Credential", "danger")
        }
    }
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    return (
        <div className='container my-2'>
            <form onSubmit={handleClick} >
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} value={credential.email} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange}  value={credential.password}id="password" name="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
