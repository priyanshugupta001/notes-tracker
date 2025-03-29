import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const App = () => {
  const [notes, setNotes] = useState(()=>{
    const savedNotes = localStorage.getItem("notes");

    return savedNotes? JSON.parse(savedNotes) : [] ;
  });
  const [search, setSearch] = useState("");

  

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    const newNote = { id: uuidv4(), text, date: new Date().toLocaleDateString() };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="app">
      <h1>Notes App 📝</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <NoteForm addNote={addNote} />
      <NoteList notes={notes} search={search} deleteNote={deleteNote} />
    </div>
  );
};

const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search notes..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

const NoteForm = ({ addNote }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addNote(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Write your note here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add Note</button>
    </form>
  );
};

const NoteList = ({ notes, search, deleteNote }) => {
  return (
    <div className="notes-container">
      {notes
        .filter((note) => note.text.toLowerCase().includes(search.toLowerCase()))
        .map((note) => (
          <Note key={note.id} note={note} deleteNote={deleteNote} />
        ))}
    </div>
  );
};

const Note = ({ note, deleteNote }) => {
  return (
    <div className="note">
      <p>{note.text}</p>
      <span>{note.date}</span>
      <button onClick={() => deleteNote(note.id)}>🗑️</button>
    </div>
  );
};

export default App;
