import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import './App.css';

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
            console.error("Error fetching notes", error);
        }
    };

    const handleNoteCreated = (newNote) => {
        setNotes([...notes, newNote]);
    };

    const handleNoteUpdated = (updatedNote) => {
        setNotes(notes.map(note => (note.id === updatedNote.id ? updatedNote : note)));
    };

    const handleNoteDeleted = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/notes/${id}/`);
            setNotes(notes.filter(note => note.id !== id));
        } catch (error) {
            console.error("Error deleting note", error);
        }
    };

    return (
        <div className="app-container">
            <h1 className="header">Notes App</h1>
            <NoteForm onNoteCreated={handleNoteCreated} />
            <NoteList
                notes={notes}
                onNoteUpdated={handleNoteUpdated}
                onNoteDeleted={handleNoteDeleted}
            />
        </div>
    );
};

export default App;
