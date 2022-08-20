import NoteContext from "./noteContext";
import { React } from "react";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  // ITS A WAY TO PROVIDE EVERY STATE IN EVERY COMPONENTS OF THE APP
  const notesinitial = [ 
  ];

  const [notes, setnotes] = useState(notesinitial);

  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token') 
      }
    });
    const json = await response.json() 
    setnotes(json)
  }

  //API call for adding a note

  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json();
    setnotes(notes.concat(note))
  }

  // DELETING A NOTE

  const deleteNote = async (id) => {
     // TODO: Call API
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log("deleting the note with id" + id);
   const json = response.json();
   console.log(json);

   const newNotes = notes.filter((note)=>{return note._id !== id});
   setnotes(newNotes);
  };

  const editNote = async (id, title, description,tag) => {
    // API calls
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description,tag}), // body data type must match "Content-Type" header
    });

    let newNotes = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < newNotes.length; index++) {
      const element =newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, setnotes, addNote, deleteNote, editNote , getNotes}}
    >
      {/* IT IS THE SYNTAX TO USE THE USECONTEXT API */}
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
