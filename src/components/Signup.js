import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import alertContext from '../context/alert/alertContext';
import logo from './bg.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signup = (props) => {
    document.body.style.backgroundImage = `url(${logo})`;
    document.body.style.backgroundSize = "cover";
    const context2 = useContext(alertContext);
    const { showAlert } = context2;
    const [credential, setCredential] = useState({ name: "", email: "", password: "", cpassword: "",avatar:"" })
    let history = useNavigate();

    props.handleProgress(0);

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const { name, email, password,avatar } = credential;
        props.handleProgress(20);
        const response = await fetch(`https://inotebookbackend-zolh.onrender.com/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password, avatar }),
        });
        props.handleProgress(50);
        const json = await response.json();
        props.handleProgress(100);
        console.log(json);
        if (json.success) {
            //redirect
            showAlert("Signup Successfully", "success")
            toast.success("Signup Successful", { autoClose: 1000, hideProgressBar: true, });
            history("/login")
        } else {
            showAlert("Email Already Exists!!", "danger")
        }
    }

  
    return (
        <>
            <section style={{ marginTop: "120px" }}   >
                <div className="signin" >
                    <div className="content">
                        <h2>iNoteBook Singup</h2>
                        <form className="form" onSubmit={handleClick} >
                            <div className="inputBox">
                                <input type="text" id="name" name="name" onChange={onChange} required /><i>Name</i>
                            </div>
                            <div className="inputBox">
                                <input type="email" id="email" name="email" onChange={onChange} required /><i>Email</i>
                            </div>
                            <div className="inputBox">
                                <input type="password" id="password" name="password" onChange={onChange} minLength={5} required /><i>Password</i>
                            </div>
                            <div className="inputBox">
                                <input type="password" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required /><i>Confirm Password</i>
                            </div>
                            <div className="links"><p style={{ color: "white" }}>Already have an Account?&nbsp;&nbsp;</p><Link to="/login">Login</Link>
                            </div>
                            <div className="inputBox">
                                <input type="submit" value="Singup" />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    )
}

export default Signup
