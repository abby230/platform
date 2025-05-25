import React from 'react';

export default function SearchBar({ onSearch }) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const { loc, checkIn, checkOut } = e.target;
        onSearch({
          location: loc.value,
          checkIn: checkIn.value,
          checkOut: checkOut.value,
        });
      }}
      className="flex items-center bg-white p-2 rounded-full shadow-md max-w-4xl mx-auto"
    >
      <input
        name="loc"
        placeholder="Location"
        className="flex-1 px-4 py-2 rounded-l-full border border-r-0 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        name="checkIn"
        type="date"
        className="px-4 py-2 border-t border-b border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        name="checkOut"
        type="date"
        className="px-4 py-2 border border-l-0 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 transition-colors"
      >
        Search
      </button>
    </form>
  );
}
