import React,{useContext} from 'react';
import noteContext from '../context/notes/noteContext'
import alertContext from '../context/alert/alertContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const context2=useContext(alertContext);
    const {alert, showAlert}=context2;
    let {notes, updateNote}=props;
    return (
        <div>
            <div className="card-note my-4" style={{width:"22rem", boxShadow:'10px 5px 35px black'}}>
                <div className="card-body">
                    <h5 className="card-title">{notes.title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{notes.tag}</h6>
                    <p className="card-text">{notes.description}</p>
                    <i className="fa-solid fa-trash mx-2"onClick={()=>{deleteNote(notes._id);toast.success("Note Deleted Successfully!",{autoClose: 1000,hideProgressBar: true,})}} ></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(notes)}} ></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
