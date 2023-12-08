import React,{useContext} from 'react';
import noteContext from '../context/notes/noteContext'


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    let {notes, updateNote}=props;
    return (
        <div>
            <div className="card my-4" style={{width:"18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{notes.title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{notes.tag}</h6>
                    <p className="card-text">{notes.description}</p>
                    <i className="fa-solid fa-trash mx-2"onClick={()=>{deleteNote(notes._id)}} ></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(notes)}} ></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem