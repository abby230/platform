// src/pages/RegionPage.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import MapView from '../components/MapView';
import AccommodationCard from '../components/AccommodationCard';

const categories = [
  '호텔/리조트',
  '펜션/풀빌라',
  '글램핑/캠핑',
  '모텔',
];

export default function RegionPage() {
  const { region } = useParams();
  const decodedRegion = decodeURIComponent(region);

  // 각 카테고리별로 5개씩 더미 데이터 생성
  const categoryLists = categories.map((category) => {
    const items = Array.from({ length: 5 }).map((_, idx) => ({
      id: `${decodedRegion}-${category}-${idx + 1}`,
      name: `${decodedRegion} ${category} ${idx + 1} 호`,
      location: decodedRegion,
      // Unsplash Source API로 키워드 조합 이미지
      imageUrl: `https://source.unsplash.com/400x300/?${encodeURIComponent(
        decodedRegion
      )},${encodeURIComponent(category)}&sig=${idx + 1}`,
    }));
    return { category, items };
  });

  return (
    <div className="min-h-screen p-6 bg-gray-50 max-w-6xl mx-auto">
      {/* 페이지 타이틀 */}
      <h2 className="text-2xl font-semibold mb-4">
        {decodedRegion} 숙소 전체 보기
      </h2>

      {/* 지도 */}
      <div className="w-full h-80 rounded-xl overflow-hidden shadow mb-8">
        <MapView />
      </div>

      {/* 카테고리별 섹션 */}
      {categoryLists.map(({ category, items }) => (
        <section key={category} className="mb-12">
          <h3 className="text-xl font-semibold mb-4">{category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <AccommodationCard
                key={item.id}
                name={item.name}
                location={item.location}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
