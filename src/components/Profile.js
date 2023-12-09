import React, { useContext, useEffect } from 'react'
import './profilecard.css';
import userContext from '../context/user/userContext';
import { Link, useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import userLogo from './user.png'

const Profile = () => {
    document.body.style = 'background: linear-gradient(90deg, rgba(249,249,249,1) 0%, rgba(235,203,174,1) 100%, rgba(143,135,135,0.4654236694677871) 100%);';
    const context1 = useContext(noteContext);
    const { notes, getNotes, editNote } = context1;
    const context = useContext(userContext);
    const { users, getUser } = context;
    let history = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
            getUser();
        } else {
            history("/login")
        }
    }, [])
    return (
        <div>
            <div className="container mt-4 mb-4 p-3 d-flex justify-content-center"  >
                <div className="card p-4" style={{boxShadow:"10px 10px 10px black"}} >
                    <div className=" image d-flex flex-column justify-content-center align-items-center"> <button
                        className="btn btn-secondary"> <img src={userLogo} height="100"
                            width="100" /></button> <span className="name mt-3">{users.name}</span> <span
                                className="idd"></span>
                        <div className="d-flex flex-row justify-content-center align-items-center gap-2">  </div>
                        <div className="d-flex flex-row justify-content-center align-items-center mt-3"> <span className="number">{notes.length} <span
                            className="follow">Notes</span></span> </div>
                        <div className=" d-flex mt-2"> 
                        <button className="btn2 btn-dark"><Link style={{color:"white", textDecoration:"none" }} to="/" >Add Note</Link></button> 
                        </div>
                        <div className="text mt-3"> <span> Last Note :<br/> {notes[notes.length-1].description} </span> </div>
                        <div className=" px-2 rounded mt-4 date "> <span className="join">Joined {new Date(users.date).toDateString()}</span> </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
