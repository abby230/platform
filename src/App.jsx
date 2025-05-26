// src/App.jsx

import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
  useNavigate
} from 'react-router-dom';

import SearchBar   from './components/SearchBar';
import MapView     from './components/MapView';
import LoginPage   from './pages/LoginPage';
import SignupPage  from './pages/SignupPage';

// 국내/해외 지역 목록
const domesticRegions  = ['서울', '경기', '제주', '부산', '강원'];
const overseasRegions  = ['미국', '일본', '태국', '호주', '프랑스'];

// 카테고리·지역별 더미 데이터
const mockData = {
  '호텔/리조트': {
    서울: ['한강 리버뷰 리조트', '남산 힐링 리조트', '광안리 오션 리조트', '해운대 블루 리조트', '경포대 씨뷰 리조트'],
    경기: ['수원 한옥 리조트', '가평 호수 리조트', '양평 숲속 리조트', '용인 캐슬 리조트', '파주 전망 리조트'],
    제주: ['제주 오션 리조트', '한림 비치 리조트', '성산 일출 리조트', '애월 가든 리조트', '중문 선셋 리조트'],
    부산: ['해운대 파라다이스 리조트', '광안대교 뷰 리조트', '송정 서퍼 리조트', '태종대 클리프 리조트', '남포동 시티 리조트'],
    강원: ['강릉 바다뷰 리조트', '속초 설악 리조트', '평창 알펜시아 리조트', '춘천 레이크 리조트', '동해 마린 리조트']
  },
  '펜션/풀빌라': {
    서울: ['북악산 힐링 펜션', '남산 스카이 펜션', '한강 보트 펜션', '올림픽공원 글라스 하우스', '양재 숲속 펜션'],
    경기: ['가평 숲속 풀빌라', '양평 리버사이드 펜션', '파주 허브 팜 펜션', '용인 팜빌라 펜션', '수원 시티 뷰 펜션'],
    제주: ['협재 풀빌라', '중문 야자수 풀빌라', '애월 해안 풀빌라', '성산 선셋 풀빌라', '서귀포 비밀 풀빌라'],
    부산: ['해운대 풀오션 뷰', '광안리 비치 풀빌라', '송정 써핑 풀빌라', '태종대 힐링 풀빌라', '남포동 시티 풀빌라'],
    강원: ['강릉 비치 풀빌라', '속초 설악 풀빌라', '평창 알파인 풀빌라', '춘천 레이크풀 펜션', '동해 블루풀 펜션']
  },
  '글램핑/캠핑': {
    서울: ['한강 글램핑 파크', '남산 캠핑 글램핑', '올림픽공원 그린 글램핑', '양재 캠핑 빌리지', '서초 웨이브 글램핑'],
    경기: ['가평 리버 글램핑', '양평 힐링 글램핑', '파주 포레스트 글램핑', '용인 레이크 글램핑', '수원 시티 글램핑'],
    제주: ['협재 글램핑 캠핑', '중문 야영 글램핑', '애월 오션 글램핑', '성산 일출 글램핑', '서귀포 숲속 글램핑'],
    부산: ['해운대 오션 글램핑', '광안리 글램핑 캠핑', '송정 서핑 글램핑', '태종대 캠핑 파크', '남포동 글램핑'],
    강원: ['강릉 비치 글램핑', '속초 설악 글램핑', '평창 알파인 글램핑', '춘천 레이크 캠핑', '동해 마린 글램핑']
  },
  '모텔': {
    서울: ['강남 스테이 모텔', '홍대 디럭스 모텔', '이태원 부티크 모텔', '잠실 시티 모텔', '건대 스타일 모텔'],
    경기: ['수원 모던 모텔', '용인 러브 모텔', '파주 패밀리 모텔', '가평 리버 모텔', '양평 그린 모텔'],
    제주: ['제주 시티 모텔', '중문 워터 모텔', '애월 오션 모텔', '성산 일출 모텔', '서귀포 가든 모텔'],
    부산: ['해운대 비치 모텔', '광안대교 전망 모텔', '송정 힐링 모텔', '태종대 클리프 모텔', '남포동 시티 모텔'],
    강원: ['강릉 오션 모텔', '속초 설악 모텔', '평창 알펜시아 모텔', '춘천 레이크 모텔', '동해 파크 모텔']
  },
  // ← 아래 쉼표 빼먹지 마세요!
  '해외숙소': {
    미국:   ['뉴욕 부티크 호텔', '라스베가스 스트립 리조트', '샌프란시스코 베이뷰 인', '하와이 비치 리조트', '마이애미 오션 호텔'],
    일본:   ['도쿄 시티 호텔', '오사카 그랜드 리조트', '교토 전통 료칸', '삿포로 스노우 리조트', '후쿠오카 스카이 라운지'],
    태국:   ['방콕 리버사이드 리조트', '푸켓 비치 빌라', '치앙마이 힐탑 리조트', '파타야 씨뷰 호텔', '카오락 정글 리조트'],
    호주:   ['시드니 하버뷰 호텔', '멜버른 시티 스테이', '골드코스트 선셋 리조트', '브리즈번 리버사이드 인', '퍼스 오션 프론트'],
    프랑스: ['파리 부티크 호텔', '니스 코발트 리조트', '리옹 시티 호텔', '칸 해변 리조트', '스트라스부르 전통 인']
  }
};

// 상단 레이아웃
function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <Link to="/">
            <img src="/logo.png" alt="숙소 플랫폼" className="h-16 md:h-20" />
          </Link>
          <nav className="space-x-4">
            <Link to="/login"  className="text-gray-700 hover:text-blue-600">로그인</Link>
            <Link to="/signup" className="text-gray-700 hover:text-blue-600">회원가입</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}

// 홈 화면
function HomeContent() {
  const navigate = useNavigate();
  const homeList = [
    { id: 'h1', name: '한강뷰 리버사이드 리조트', location: '서울', imageUrl: 'https://picsum.photos/400/300?random=1' },
    { id: 'h2', name: '제주 파노라마 풀빌라',       location: '제주', imageUrl: 'https://picsum.photos/400/300?random=2' },
    { id: 'h3', name: '부산 해변 글램핑 캠프',       location: '부산', imageUrl: 'https://picsum.photos/400/300?random=3' }
  ];
  const categories = ['호텔/리조트','펜션/풀빌라','글램핑/캠핑','모텔','해외숙소'];

  const onSearch = loc => loc && navigate(`/region/${encodeURIComponent(loc)}`);

  return (
    <>
      <SearchBar onSearch={onSearch} />

      <div className="mt-4 flex space-x-4 overflow-x-auto">
        {categories.map(cat => (
          <Link
            key={cat}
            to={`/category/${encodeURIComponent(cat)}`}
            className="whitespace-nowrap px-4 py-2 bg-white rounded-full shadow hover:bg-gray-100"
          >
            {cat}
          </Link>
        ))}
      </div>

      <div className="mt-6 w-full h-72 bg-white rounded-xl overflow-hidden shadow">
        <MapView />
      </div>

      <div className="mt-6 space-y-6">
        {homeList.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden flex">
            <img src={item.imageUrl} alt={item.name} className="w-32 h-32 object-cover" />
            <div className="p-4 flex-1">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-500 mt-1">{item.location}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// 카테고리 페이지
function CategoryPage() {
  const { category } = useParams();
  const decodedCat = decodeURIComponent(category);
  const isOverseas = decodedCat === '해외숙소';
  const regions    = isOverseas ? overseasRegions : domesticRegions;
  const [selRegion, setSelRegion] = useState(regions[0]);
  const navigate   = useNavigate();

  const onSearch = loc => loc && navigate(`/region/${encodeURIComponent(loc)}`);

  return (
    <>
      <SearchBar onSearch={onSearch} />

      <div className="mt-4 flex space-x-4 overflow-x-auto">
        {regions.map(rg => (
          <button
            key={rg}
            onClick={() => setSelRegion(rg)}
            className={`whitespace-nowrap px-4 py-2 rounded-full shadow-sm transition ${
              selRegion === rg ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'
            }`}
          >
            {rg}
          </button>
        ))}
      </div>

      <div className="mt-6 w-full h-72 bg-white rounded-xl overflow-hidden shadow">
        <MapView />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(mockData[decodedCat]?.[selRegion] || []).map((name, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow overflow-hidden">
            <img
              src={`https://picsum.photos/400/300?random=${encodeURIComponent(decodedCat)}-${encodeURIComponent(selRegion)}-${idx}`}
              alt={name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{name}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// 지역 검색 결과 페이지
function RegionPage() {
  const { region } = useParams();
  const decodedReg = decodeURIComponent(region);
  const navigate   = useNavigate();
  const categories = ['호텔/리조트','펜션/풀빌라','글램핑/캠핑','모텔'];

  const onSearch = loc => loc && navigate(`/region/${encodeURIComponent(loc)}`);

  return (
    <>
      <SearchBar onSearch={onSearch} />
      <h2 className="mt-6 text-2xl font-bold">{decodedReg} 추천 숙소</h2>

      {categories.map(cat => (
        <div key={cat} className="mt-6">
          <h3 className="text-xl font-semibold mb-4">{cat}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(mockData[cat]?.[decodedReg] || []).map((name, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow overflow-hidden">
                <img
                  src={`https://picsum.photos/400/300?random=${encodeURIComponent(cat)}-${encodeURIComponent(decodedReg)}-${idx}`}
                  alt={name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold">{name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

// App 컴포넌트 + 라우팅
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index                     element={<HomeContent />} />
          <Route path="login"              element={<LoginPage />} />
          <Route path="signup"             element={<SignupPage />} />
          <Route path="category/:category" element={<CategoryPage />} />
          <Route path="region/:region"     element={<RegionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
