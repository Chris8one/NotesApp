import React from 'react';

const NoteItem = ({ note, onEdit, onDelete }) => {
  return (
    <div>
      <p>{note.content}</p>
      <button onClick={() => onEdit(note.id)}>Edit</button>
      <button onClick={() => onDelete(note.id)}>Delete</button>
    </div>
  );
};

export default NoteItem;
