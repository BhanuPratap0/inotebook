import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
  const host = "https://inotebookbackend-zolh.onrender.com"
  const n1 = []
  const [notes, setNotes] = useState(n1)

  
  const uploadImage = async (formData) => {
    const response = await fetch(`https://inotebookbackend-zolh.onrender.com/api/notes/image`, {
      method: "PUT",
      headers: {
        "auth-token": localStorage.getItem('token')
      },
      body: formData,
    });
    const result = await response.json();
  }

  //Get note
  const getNotes = async () => {
    //API Call TODO
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setNotes(json);
  }
  //Add note
  const addNote = async (title, description, tag) => {
    //API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  }
  //Delete Note
  const deleteNote = async (id) => {
    //API Call 
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify(),
    });
    const json = response.json();
    const newNote = notes.filter((note) => { return note._id !== id });
    setNotes(newNote)
  }
  // Edit note
  const editNote = async (id, title, description, tag) => {

    //API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    //const json= response.json();
    let newNote = JSON.parse(JSON.stringify(notes));
    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNotes(newNote);
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, getNotes, uploadImage}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState