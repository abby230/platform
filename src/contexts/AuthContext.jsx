import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 예시: 로컬스토리지에서 토큰 확인
  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = async (email, password) => {
    // TODO: 실제 API 호출
    const fakeUser = { email };
    localStorage.setItem('user', JSON.stringify(fakeUser));
    setUser(fakeUser);
  };

  const signup = async (email, password) => {
    // TODO: 실제 API 호출
    const newUser = { email };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
