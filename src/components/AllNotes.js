import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Noteitem from './Noteitem';
import noteContext from '../context/notes/noteContext';
import userContext from '../context/user/userContext';

const AllNotes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" })

    const context3=useContext(userContext);
    const {users, getUser}=context3;

    let history = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
            getUser();
        } else {
            history("/login")
        }
    }, [])
    const ref = useRef(null);
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id ,etitle: currentNote.title, edescription:currentNote.description, etag: currentNote.tag})
      }
    return (
        <div>
            <div className='container my-5' >
                <h2>{users.name}'s Notes</h2>
                <div className='row' >
                    <center><h1>{notes.length === 0 && '****No notes to display!****'}</h1></center>
                    {notes.map((note) => {
                        return <div className='col-md-4' key={note._id}><Noteitem updateNote={updateNote} notes={note} /></div>
                    })}

                </div>
            </div>
        </div>
    )
}

export default AllNotes
