import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import MapView from './components/MapView';
import AccommodationCard from './components/AccommodationCard';
import recommendations from './data/recommendations';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// 상단 네비게이션 레이아웃
function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          {/* 로고 이미지 (크기 조정) */}
          <Link to="/">
            <img
              src="/logo.png"
              alt="숙소 플랫폼"
              className="h-16 md:h-20"
            />
          </Link>
          <div className="space-x-4">
            <Link to="/login" className="text-gray-700 hover:text-blue-600">로그인</Link>
            <Link to="/signup" className="text-gray-700 hover:text-blue-600">회원가입</Link>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}

// 홈 페이지 콘텐츠
function HomeContent() {
  return (
    <>
      {/* 검색 바 */}
      <SearchBar onSearch={() => {}} />

      {/* 카테고리 탭 (지도 위) */}
      <div className="mt-6 flex space-x-4 overflow-x-auto pb-2">
        {['호텔/리조트', '펜션/풀빌라', '글램핑/캠핑', '모텔', '해외숙소'].map(tab => (
          <button
            key={tab}
            className="whitespace-nowrap px-4 py-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 상단 지도 (풀폭) */}
      <div className="mt-4 w-full h-80 bg-white rounded-xl overflow-hidden shadow">
        <MapView />
      </div>

      {/* 카드 목록 */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.slice(0, 6).map(item => (
          <AccommodationCard key={item.id} {...item} />
        ))}
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>         
          <Route index element={<HomeContent />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
