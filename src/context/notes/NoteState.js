import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
  const host = "http://localhost:5000"
  const n1 = []
  const [notes, setNotes] = useState(n1)

  //Get note
  const getNotes = async () => {
    //API Call TODO
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem('token')
      }
    });
    const json =  await response.json();
    console.log(json);
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
    const json = response.json();
    
    //Logic for client
    console.log("adding a new note")
    const note = {
      "_id": "2323656f71f4fd6c0788d6273d54e",
      "user": "656cca0sd1128f0f5b9b860ad2",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-12-05T18:54:44.063Z",
      "__v": 0
    }
    setNotes(notes.concat(note));
  }
  //Delete Note
  const deleteNote = async(id) => {
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
    console.log("deleting the note with id:" + id)
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
    let newNote= JSON.parse(JSON.stringify(notes));
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
    <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState