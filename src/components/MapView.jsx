import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// 맵이 렌더된 후 크기 재계산 및 뷰 재설정 훅
function ResizeAndReset() {
  const map = useMap();
  useEffect(() => {
    // 짧은 지연 후 인밸리데이트하고 뷰 재설정
    const id = setTimeout(() => {
      map.invalidateSize();
      map.setView(map.getCenter());
    }, 200);
    return () => clearTimeout(id);
  }, [map]);
  return null;
}

export default function MapView({
  defaultCenter = [37.5665, 126.9780],
  zoom = 12
}) {
  const [center, setCenter] = useState(defaultCenter);

  // 사용자 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setCenter([pos.coords.latitude, pos.coords.longitude]),
        () => {},
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="w-full h-full"
    >
      <ResizeAndReset />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
    </MapContainer>
  );
}
