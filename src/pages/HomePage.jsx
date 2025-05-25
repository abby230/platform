// src/pages/HomePage.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl">환영합니다, {user?.email || 'Guest'}님</h1>
        {user
          ? <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded">로그아웃</button>
          : <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded">로그인</Link>
        }
      </div>
      {/* 기존 검색/지도/카드 레이아웃은 여기서 렌더 */}
      {/* <SearchBar …/><MapView/><CardList…/> */}
    </div>
  );
}
