import React, { useState } from 'react';
import axios from 'axios';

const NoteForm = ({ onNoteCreated }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/notes/', { content });
            onNoteCreated(response.data);
            setContent('');
        } catch (error) {
            console.error('Error creating note:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="note-form">
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Create new note..."
            />
            <button type="submit">Add Note</button>
        </form>
    );
};

export default NoteForm;
