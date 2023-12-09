import React, { useContext, useState } from 'react'
import logo from './bg.jpg'
import banner from './banner.jpg'
import alertContext from '../context/alert/alertContext';
import { Link, useNavigate } from 'react-router-dom';

const Test = () => {
    document.body.style.backgroundImage = `url(${logo})`;
    document.body.style.backgroundSize = "cover";

    const context=useContext(alertContext);
    const {showAlert}=context;
    const [credential, setCredential]= useState({email: "", password: ""})
    let history=useNavigate();
    const handleClick = async(e) => {
        e.preventDefault();
        const response = await fetch(`https://inotebookbackend-zolh.onrender.com/api/auth/login`, {
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
            localStorage.setItem('token', json.authToken);
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
            <div class="signin">
                <div class="content">
                    <h2>Welcome to iNoteBook</h2>
                    <form class="form" onSubmit={handleClick} >
                        <div class="inputBox">
                        <input type="email" id="email" name="email"  onChange={onChange} value={credential.email}  required /><i>Email</i>
                        </div>
                        <div class="inputBox">
                        <input type="password" onChange={onChange}  value={credential.password} id="password" name="password" required /><i>Password</i>
                        </div>
                        <div class="links">  <Link to="/signup">Signup</Link>
                        </div>
                        <div class="inputBox">
                            <input type="submit" value="Login" />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Test
