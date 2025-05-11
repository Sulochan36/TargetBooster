import React, { useEffect, useState } from 'react';

const Notes = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
        setNotes(savedNotes);
    }, []);

    const addNote = () => {
        const newNotes = [...notes, { id: Date.now(), text: '' }];
        setNotes(newNotes);
        localStorage.setItem('notes', JSON.stringify(newNotes));
    };

    const updateNote = (id, text) => {
        const updated = notes.map(note =>
            note.id === id ? { ...note, text } : note
        );
        setNotes(updated);
        localStorage.setItem('notes', JSON.stringify(updated));
    };

    const deleteNote = (id) => {
        const filtered = notes.filter(note => note.id !== id);
        setNotes(filtered);
        localStorage.setItem('notes', JSON.stringify(filtered));
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto w-full">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center">Your Notes</h1>
            <div className="flex justify-center">
                <button
                    onClick={addNote}
                    className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base"
                >
                    Add Note
                </button>
            </div>

            <div className="space-y-6">
                {notes.map(note => (
                    <div key={note.id} className="relative">
                        <textarea
                            value={note.text}
                            onChange={(e) => updateNote(note.id, e.target.value)}
                            className="w-full p-3 border rounded-lg resize-none min-h-[120px] shadow text-sm sm:text-base"
                            placeholder="Write your note here..."
                        />
                        <button
                            onClick={() => deleteNote(note.id)}
                            className="absolute top-2 right-2 text-xs sm:text-sm text-red-500 hover:underline"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notes;
