import React, { useState } from 'react';
import { getInitialData, showFormattedDate } from '../utils/index';
import Addnew from './Addnew';
import Archived from './ArsipApp';

const Noteapp = () => {
  const [notes, setNotes] = useState(getInitialData());
  const [searchTerm, setSearchTerm] = useState('');
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [loding, setLoding] = useState(false);

  const addNote = (newNote) => {
    setLoding(true);
    setTimeout(() => {
      setNotes([newNote, ...notes]);
      setLoding(false);
    }, 5000);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    setArchivedNotes(archivedNotes.filter((note) => note.id !== id));
  };

  const archiveNote = (id) => {
    const noteToArchive = notes.find((note) => note.id === id);
    if (noteToArchive) {
      setArchivedNotes([noteToArchive, ...archivedNotes]);
      setNotes(notes.filter((note) => note.id !== id));
    }
  };

  const restoreNote = (id) => {
    const noteToRestore = archivedNotes.find((note) => note.id === id);
    if (noteToRestore) {
      setNotes([noteToRestore, ...notes]);
      setArchivedNotes(archivedNotes.filter((note) => note.id !== id));
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      (note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.body.toLowerCase().includes(searchTerm.toLowerCase())) &&
      !note.archived
  );

  return (
    <div className="container mx-auto py-8">
      <Addnew addNote={addNote} setSearchTerm={setSearchTerm} loding={loding} />
      <h1 className="text-3xl font-bold mb-6">Catatan Aktif:</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white shadow-md rounded-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg font-bold mb-2">{note.title}</h3>
              <p className="text-gray-500 mb-4">{showFormattedDate(note.createdAt)}</p>
              <p className="text-gray-600 mb-6">{note.body}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => deleteNote(note.id)}
                  className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-600 hover:text-black mr-4"
                >
                  Delete
                </button>
                <button
                  onClick={() => archiveNote(note.id)}
                  className="text-black rounded-md px-4 py-2 bg-blue-600 hover:bg-blue-400 hover:text-white"
                >
                  Arsipkan
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">Tidak ada catatan yang ditemukan.</p>
        )}
      </div>
      <Archived archivedNotes={archivedNotes} restoreNote={restoreNote} />
    </div>
  );
};

export default Noteapp;
