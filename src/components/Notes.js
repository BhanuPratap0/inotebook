import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import alertContext from '../context/alert/alertContext';
import { useNavigate } from 'react-router-dom';
import userContext from '../context/user/userContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notes = (props) => {
  
  
  const context = useContext(noteContext);
  //notes context
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({ id:"", etitle: "", edescription: "", etag: "default" })
  //alert context
  const context2=useContext(alertContext);
  const {showAlert}=context2;
  //user context
  const context3=useContext(userContext);
  const {users, getUser}=context3;

  let history=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      
      props.handleProgress(50);
      getNotes();
      getUser();
      props.handleProgress(100);
    }else{
      history("/login")
    }
  }, [])

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id ,etitle: currentNote.title, edescription:currentNote.description, etag: currentNote.tag})
  }
  const ref = useRef(null);
  const refclose = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    refclose.current.click();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    showAlert("Updated Succesfully", "success")
}
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
    
}

  return (

    <>
      <div className='container' >
        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form className='my-3'  onSubmit={handleClick} >
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" onChange={onChange} value={note.etitle} id="etitle" name="etitle" minLength={5} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" className="form-control" onChange={onChange} value={note.etag} id="etag" name="etag" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                    <textarea className="form-control" value={note.edescription} id="edescription" onChange={onChange} name="edescription" rows="3" minLength={5} required ></textarea>
                  </div>
                  <button ref={refclose} type="button" className="btn btn-secondary mx-2" data-bs-dismiss="modal">Close</button>
                  <button type="submit"  className="btn btn-primary">Update Note</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='container my-5' >
        <h2>{users.name}'s Notes</h2>
          <div className='row' >
              <center><h1>{notes.length===0 && '****No notes to display!****'}</h1></center>
              {notes.map((note) => {
                return <div className='col-md-4' key={note._id}><Noteitem updateNote={updateNote} notes={note} /></div>
              })}
            
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Notes
