// src/components/AccommodationCard.jsx
export default function AccommodationCard({ id, name, location, onNotify }) {
  const imgUrl = `https://picsum.photos/seed/${id}/400/260`;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow">
      <img src={imgUrl} alt={name} className="w-full h-48 object-cover" />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{name}</h3>
        <p className="text-sm text-gray-500 truncate">{location}</p>

        {/* 알림 요청 버튼 */}
        <button
          className="mt-3 px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition"
          onClick={() => onNotify(id)}
        >
          🔔 취소 알림 요청
        </button>
      </div>
    </div>
  );
}
