// src/components/SearchBar.jsx

import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn]     = useState('');
  const [checkOut, setCheckOut]   = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSearch 에 체크인·체크아웃 날짜도 넘겨줄 수 있도록
    onSearch(location, checkIn, checkOut);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-center bg-white rounded-full shadow px-4 py-2 space-x-2"
    >
      {/* 위치 입력 */}
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="flex-1 min-w-[150px] outline-none px-3 py-2 rounded-full"
      />

      {/* 체크인 날짜 */}
      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        className="px-3 py-2 rounded-full border border-gray-200"
      />

      {/* 체크아웃 날짜 */}
      <input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        className="px-3 py-2 rounded-full border border-gray-200"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
}
