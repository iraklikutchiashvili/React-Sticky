import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Note from "./Note";
import Form from "./Form";

const App = () => {
  const [notesArr, setNotesArr] = useState([]);

  function handleAddNote(note) {
    if (note.title !== "" && note.content !== "") {
      setNotesArr((prevNotes) => {
        return [...prevNotes, note];
      });
    }
  }

  function handleDelete(id) {
    setNotesArr((prevNotes) => {
      return prevNotes.filter((note, index) => index !== id);
    });
  }

  return (
    <div>
      <Header />
      <Form onAdd={handleAddNote} />
      {notesArr.map((noteItem, index) => (
        <Note
          id={index}
          key={noteItem.title}
          note={noteItem}
          deleteNote={handleDelete}
        />
      ))}
      <Footer />
    </div>
  );
};

export default App;
