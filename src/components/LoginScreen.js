import React, { useState, useEffect, useRef } from 'react';

const LoginScreen = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const [pin, setPin] = useState('');
  const [loginError, setLoginError] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const containerRef = useRef(null);

  /* ---------------- Mouse Tracking ---------------- */
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  /* ---------------- 3D Card ---------------- */
  const handle3DMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y - rect.height / 2) / 15;
    const rotateY = (rect.width / 2 - x) / 15;
    cardRef.current.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handle3DLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
  };

  /* ---------------- LOGIN LOGIC (FIXED) ---------------- */
  const handleLogin = () => {
    if (userId.trim().length < 2 || pin.length < 4) {
      setLoginError('User ID must be 2+ characters and PIN must be 4+ digits');
      return;
    }

    setLoginError('');

    // ✅ STANDARDIZED STORAGE
    localStorage.setItem('pm_displayName', userId.trim());
    localStorage.setItem('pm_userId', userId.trim());

    // ✅ FORCE MONTHLY BUDGET SCREEN AFTER LOGIN
    if (!localStorage.getItem('pm_monthlyLimit')) {
      localStorage.setItem('pm_needsBudget', 'true');
    }

    // ✅ PASS DATA UP
    onLogin(userId.trim(), pin);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  const parallaxStyle = {
    transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 p-4 overflow-hidden relative"
    >
      {/* ---------- HEADER ---------- */}
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 animate-fadeIn" style={parallaxStyle}>
          <div className="text-7xl mb-4 animate-bounce-slow">📱</div>
          <h1 className="text-6xl font-black text-white leading-tight">
            PERSONAL<br />MANAGER
          </h1>
          <p className="text-blue-200 text-lg font-bold">🇮🇳 Indian Edition</p>
        </div>

        {/* ---------- LOGIN CARD ---------- */}
        <div
          ref={cardRef}
          onMouseMove={handle3DMove}
          onMouseLeave={handle3DLeave}
          className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl animate-slideIn"
        >
          <div className="space-y-5">
            {/* USER ID */}
            <div>
              <label className="block font-bold mb-2">👤 User ID</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500"
                placeholder="Enter User ID"
                autoFocus
              />
            </div>

            {/* PIN */}
            <div>
              <label className="block font-bold mb-2">🔒 PIN</label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500"
                placeholder="Enter PIN"
                maxLength={6}
              />
            </div>

            {/* ERROR */}
            {loginError && (
              <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-xl animate-shake">
                ⚠️ {loginError}
              </div>
            )}

            {/* LOGIN BUTTON */}
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg"
            >
              🚀 Login
            </button>

            <p className="text-center text-gray-500 text-xs">
              🔒 Data stored locally on your device
            </p>
          </div>
        </div>

        <p className="text-white text-sm text-center mt-6">
          Made with ❤️ in India 🇮🇳
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;

