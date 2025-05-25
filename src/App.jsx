import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import MapView from './components/MapView';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// 상단 네비게이션 레이아웃
function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <Link to="/">
            <img src="/logo.png" alt="숙소 플랫폼" className="h-16 md:h-20" />
          </Link>
          <nav className="space-x-4">
            <Link to="/login" className="text-gray-700 hover:text-blue-600">로그인</Link>
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

// 홈 페이지: 검색바 + 카테고리 탭 + 지도 + 추천 숙소 3개
function HomeContent() {
  const navigate = useNavigate();
  const homeList = [
    { id: 'home-1', name: '한강뷰 리버사이드 리조트', location: '서울', imageUrl: 'https://picsum.photos/400/300?random=1' },
    { id: 'home-2', name: '제주 파노라마 풀빌라', location: '제주', imageUrl: 'https://picsum.photos/400/300?random=2' },
    { id: 'home-3', name: '부산 해변 글램핑 캠프', location: '부산', imageUrl: 'https://picsum.photos/400/300?random=3' }
  ];
  const categories = ['호텔/리조트', '펜션/풀빌라', '글램핑/캠핑', '모텔', '해외숙소'];

  const handleSearch = (location) => {
    if (location) {
      navigate(`/region/${encodeURIComponent(location)}`);
    }
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="mt-4 flex space-x-4 overflow-x-auto">
        {categories.map(cat => (
          <Link key={cat} to={`/category/${encodeURIComponent(cat)}`} className="whitespace-nowrap px-4 py-2 bg-white rounded-full shadow hover:bg-gray-100">
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
  const navigate = useNavigate();
  const domesticRegions = ['서울', '경기', '제주', '부산', '강원'];
  const overseasRegions = ['미국', '일본', '태국', '호주', '프랑스'];
  const isOverseas = decodedCat === '해외숙소';
  const regions = isOverseas ? overseasRegions : domesticRegions;
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);

  const handleSearch = (location) => {
    if (location) {
      navigate(`/region/${encodeURIComponent(location)}`);
    }
  };

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
    }
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="mt-4 flex space-x-4 overflow-x-auto">
        {regions.map(rg => (
          <button
            key={rg}
            onClick={() => setSelectedRegion(rg)}
            className={`whitespace-nowrap px-4 py-2 rounded-full shadow-sm transition ${
              selectedRegion === rg ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'
            }`}
          >
            {rg}
          </button>
        ))}
      </div>
      <div className="mt-6 w-full h-72 bg-white rounded-xl overflow-hidden shadow">
        <MapView centerRegion={selectedRegion} />
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockData[decodedCat][selectedRegion].map((name, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow overflow-hidden">
            <img
              src={`https://picsum.photos/400/300?random=${encodeURIComponent(decodedCat)}-${encodeURIComponent(selectedRegion)}-${idx}`}
              alt={name}
              className="w-full h-48)object-cover"
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

// 지역별 통합 검색 결과 페이지
function RegionPage() {
  const { region } = useParams();
  const decodedRegion = decodeURIComponent(region);
  const navigate = useNavigate();
  const categories = ['호텔/리조트', '펜션/풀빌라', '글램핑/캠핑', '모텔'];

  const handleSearch = (location) => {
    if (location) {
      navigate(`/region/${encodeURIComponent(location)}`);
    }
  };

  // 카테고리별 same mockData as above
  const mockData = {
    '호텔/리조트': mockData['호텔/리조트'],
    '펜션/풀빌라': mockData['펜션/풀빌라'],
    '글램핑/캠핑': mockData['글램핑/캠핑'],
    '모텔': mockData['모텔'],
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <h2 className="mt-6 text-2xl font-bold">{decodedRegion} 추천 숙소</h2>
      {categories.map(cat => (
        <div key={cat} className="mt-6">
          <h3 className="text-xl font-semibold mb-4">{cat}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockData[cat][decodedRegion]?.map((name, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow overflow-hidden">
                <img
                  src={`https://picsum.photos/400/300?random=${encodeURIComponent(cat)}-${encodeURIComponent(decodedRegion)}-${idx}`}
                  alt={name}
                  className="w-full h-48)object-cover"
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

// 메인 App 컴포넌트 및 라우팅 설정
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>  
          <Route index element={<HomeContent />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="category/:category" element={<CategoryPage />} />
          <Route path="region/:region" element={<RegionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
