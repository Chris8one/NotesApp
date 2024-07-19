import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/notes/');
      setNotes(response.data);
    } catch (error) {
      console.error('There was an error fetching the notes!', error);
    }
  };

  const addNote = async (content) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/notes/', { content });
      setNotes([...notes, response.data]);
    } catch (error) {
      console.error('There was an error creating the note!', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/notes/${id}/`);
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error('There was an error deleting the note!', error);
    }
  };

  const editNote = async (id, content) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/notes/${id}/`, { content });
      setNotes(notes.map(note => (note.id === id ? response.data : note)));
    } catch (error) {
      console.error('There was an error updating the note!', error);
    }
  };

  return (
    <div>
      <h1>Notes</h1>
      <NoteForm onAddNote={addNote} />
      <NoteList notes={notes} onEdit={editNote} onDelete={deleteNote} />
    </div>
  );
};

export default App;
