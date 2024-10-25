import React from 'react';
import { showFormattedDate } from '../utils/index';

const Archived = ({ archivedNotes = [], restoreNote = () => { } }) => {
    return (
        <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6">Catatan Arsip:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {archivedNotes.length > 0 ? (
                    archivedNotes.map((note) => (
                        <div
                            key={note.id}
                            className="bg-gray-100 shadow-md rounded-md p-6 hover:shadow-lg transition-shadow duration-300"
                        >
                            <h3 className="text-lg font-bold mb-2">{note.title}</h3>
                            <p className="text-gray-500 mb-4">{showFormattedDate(note.createdAt)}</p>
                            <p className="text-gray-600 mb-6">{note.body}</p>
                            <div className="flex justify-end">
                                <button
                                    onClick={() => restoreNote(note.id)}
                                    className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-600 hover:text-black"
                                >
                                    Restore
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600">Tidak ada catatan arsip.</p>
                )}
            </div>
        </div>
    );
};

export default Archived;
