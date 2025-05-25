// src/pages/SignupPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: API 호출 후 회원가입 처리
    console.log('회원가입 시도:', { email, pw });
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl mb-4 text-center">회원가입</h2>
        <label className="block mb-2">
          <span className="text-gray-700">이메일</span>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded border-gray-300 p-2"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">비밀번호</span>
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            required
            className="mt-1 block w-full rounded border-gray-300 p-2"
          />
        </label>
        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          가입하기
        </button>
      </form>
    </div>
  );
}
