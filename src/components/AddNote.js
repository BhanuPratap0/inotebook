import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import alertContext from '../context/alert/alertContext';

const AddNote = () => {
    document.body.style = 'background: linear-gradient(90deg, rgba(249,249,249,1) 0%, rgba(235,203,174,1) 100%, rgba(143,135,135,0.4654236694677871) 100%);';
    const context = useContext(noteContext);
    const { addNote } = context;
    const context2=useContext(alertContext);
    const {alert, showAlert}=context2;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""});
        showAlert("Note Added Successfully!","success")
        
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="container add-note my-3" style={{ background:"linear-gradient(90deg, rgba(143,135,135,1) 0%, rgba(195,174,157,1) 0%, rgba(255,255,255,1) 100%)", boxShadow: "20px 20px 50px black", padding:"25px"}}  >
            <center><h2>Add Note</h2></center>
            <form className='my-3'  onSubmit={handleClick} >
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" onChange={onChange} id="title" value={note.title} name="title" minLength={5} required  />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" onChange={onChange} id="tag" value={note.tag} name="tag"  />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                    <textarea className="form-control" id="description" value={note.description} onChange={onChange} name="description" rows="3" minLength={5} required ></textarea>
                </div>
                <button type="submit"  className="btn btn-dark">Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
