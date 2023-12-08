import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({ id:"", etitle: "", edescription: "", etag: "default" })

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, [])

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id ,etitle: currentNote.title, edescription:currentNote.description, etag: currentNote.tag})
  }
  const ref = useRef(null);
  const refclose = useRef(null);

  const handleClick = (e) => {
    refclose.current.click();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    
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
                <form className='my-3' >
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" onChange={onChange} value={note.etitle} id="etitle" name="etitle" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" className="form-control" onChange={onChange} value={note.etag} id="etag" name="etag" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                    <textarea className="form-control" id="edescription" onChange={onChange} value={note.edescription} name="edescription" rows="3"></textarea>
                  </div>
                  
                </form>
              </div>
              <div className="modal-footer">
                <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
              </div>
            </div>
          </div>
        </div>


        <h2>Your Notes</h2>
        <div className='container' >
          <div className='row' >
            
              <center><h1>{notes.length===0 && '****No notes to display!****'}</h1></center>
              {notes.map((note) => {
                return <div className='col-md-3' key={note._id}><Noteitem updateNote={updateNote} notes={note} /></div>
              })}
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Notes
