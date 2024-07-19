import React, { useState } from 'react';
import axios from 'axios';
import NoteItem from './NoteItem';

const NoteList = ({ notes, onNoteUpdated, onNoteDeleted }) => {
    const [editNoteId, setEditNoteId] = useState(null);
    const [editContent, setEditContent] = useState('');

    const handleEditClick = (note) => {
        setEditNoteId(note.id);
        setEditContent(note.content);
    };

    const handleSaveClick = async (id) => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/notes/${id}/`, { content: editContent });
            onNoteUpdated({ id, content: editContent });
            setEditNoteId(null);
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    const handleCancelClick = () => {
        setEditNoteId(null);
    };

    return (
        <div className="note-list-container">
            <ul className="note-list">
                {notes.map((note) => (
                    <li key={note.id} className="note-item">
                        {editNoteId === note.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    className="edit-input"
                                />
                                <a href="#" onClick={() => handleSaveClick(note.id)} className="link-button">Save</a>
                                <a href="#" onClick={handleCancelClick} className="link-button">Cancel</a>
                            </>
                        ) : (
                            <>
                                <span className="note-content">{note.content}</span>
                                <a href="#" onClick={() => handleEditClick(note)} className="link-button">Edit</a>
                                <a href="#" onClick={() => onNoteDeleted(note.id)} className="link-button">Delete</a>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NoteList;
