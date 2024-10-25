import React, { useState } from 'react';

const Addnew = ({ addNote, setSearchTerm, loding }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const maxTitleLength = 50;

  // Function to handle title character limit
  const handleTitleChange = (e) => {
    if (e.target.value.length <= maxTitleLength) {
      setTitle(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNote = {
      id: +new Date(),
      title,
      body,
      archived: false,
      createdAt: new Date().toISOString(),
    };

    addNote(newNote);

    setTitle('');
    setBody('');
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="mt-4 block font-medium text-gray-700 text-2xl">Notes</h1>
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search notes..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[400px] mb-4 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
        />
      </div>
      <hr className="mb-4" />
      <div className="flex justify-center items-center mb-11 flex-col">
        {/* Note Form */}
        <div className="bg-white w-[500px] shadow-2xl border-blue-600 border rounded-md p-10">
          <div className="flex items-center justify-between">
            <h1 className="mb-4 font-bold text-xl text-blue-600">Buat catatan</h1>
            <p>Sisa karakter: {maxTitleLength - title.length}</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block font-medium text-gray-700">
                Note Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
                placeholder="Note title"
                required
                className="w-[400px] h-[40px] border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-3"
              />
            </div>
            <div>
              <label htmlFor="body" className="block font-medium text-gray-700">
                Isi catatan
              </label>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Add note here...."
                required
                className="w-[400px] h-[200px] border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-3 py-2"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 w-[400px] text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
               {loding ? 'Adding...' : 'Add Note'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addnew;
