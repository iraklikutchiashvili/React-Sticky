import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Note from "./Note";
import Form from "./Form";
import qs from "qs";
import axios from "axios";

const App = () => {
  const client = axios.create({
    baseURL: env.API_URL,
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  const [notesArr, setNotesArr] = useState([]);

  useEffect(() => {
    client.get("/notes").then((response) => {
      setNotesArr(response.data);
    });
  }, []);

  function handleAddNote(note) {
    if (note.title !== "" && note.content !== "") {
      addNotes(note.title, note.content);
    }
  }

  const deleteNote = (id) => {
    axios({
      method: "delete",
      url: env.API_URL,
      data: qs.stringify({
        _id: id,
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    setNotesArr((prevNotes) => {
      return prevNotes.filter((note) => {
        return note._id !== id;
      });
    });
  };

  const addNotes = (title, content) => {
    client
      .post("/notes", {
        title: title,
        content: content,
      })
      .then((response) => {
        setNotesArr((prevNotes) => {
          return [...prevNotes, response.data];
        });
      });
  };

  return (
    <div>
      <Header />
      <Form onAdd={handleAddNote} />
      {notesArr.map((noteItem, index) => (
        <Note
          id={noteItem._id}
          key={noteItem._id}
          note={noteItem}
          deleteNote={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
};

export default App;
