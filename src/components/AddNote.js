import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import alertContext from '../context/alert/alertContext';

const AddNote = () => {
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
        <div className="container my-3" >
            <h2>Add Note</h2>
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
                <button type="submit"  className="btn btn-primary">Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
