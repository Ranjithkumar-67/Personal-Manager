import React, { useState, useEffect, useRef } from 'react';

const LoginScreen = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const [pin, setPin] = useState('');
  const [loginError, setLoginError] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const containerRef = useRef(null);

  // Track mouse movement for 3D effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 3D tilt effect for login card
  const handle3DMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handle3DLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    }
  };

  const handleLogin = () => {
    if (userId.length < 2 || pin.length < 4) {
      setLoginError('User ID must be 2+ characters and PIN must be 4+ digits');
      return;
    }
    
    setLoginError('');
    onLogin(userId, pin);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  // Parallax effect for background
  const parallaxStyle = {
    transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 p-4 overflow-hidden relative"
    >
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
          style={{
            transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`
          }}
        />
        <div 
          className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
          style={{
            transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px)`
          }}
        />
        <div 
          className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `translate(${mousePosition.x * (10 + i * 2)}px, ${mousePosition.y * (10 + i * 2)}px)`
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header with 3D effect */}
        <div 
          className="text-center mb-8 animate-fadeIn"
          style={parallaxStyle}
        >
          <div className="relative inline-block">
            <div className="text-7xl mb-4 animate-bounce-slow filter drop-shadow-2xl">
              📱
            </div>
            <div className="absolute inset-0 blur-xl opacity-50 animate-pulse">
              📱
            </div>
          </div>
          
          <h1 className="text-6xl font-black text-white mb-2 leading-tight drop-shadow-2xl relative">
            <span className="inline-block animate-gradient-text bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent bg-300% animate-shimmer">
              PERSONAL
            </span>
            <br/>
            <span className="inline-block animate-gradient-text bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent bg-300% animate-shimmer" style={{ animationDelay: '0.2s' }}>
              MANAGER
            </span>
          </h1>
          
          <div className="relative inline-block">
            <p className="text-blue-200 text-lg font-bold tracking-wide">
              🇮🇳 Indian Edition
            </p>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg blur opacity-20 animate-pulse" />
          </div>
        </div>

        {/* 3D Interactive Login Card */}
        <div
          ref={cardRef}
          onMouseMove={handle3DMove}
          onMouseLeave={handle3DLeave}
          className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl animate-slideIn relative overflow-hidden"
          style={{
            transition: 'transform 0.1s ease-out',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Animated border gradient */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
          
          {/* Glowing corner accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/30 to-transparent rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-400/30 to-transparent rounded-full blur-2xl" />

          <div className="space-y-5 relative z-10">
            {/* User ID Input with 3D effect */}
            <div className="group">
              <label className="block text-gray-700 font-bold mb-2 flex items-center gap-2">
                <span className="text-blue-500 text-xl">👤</span>
                User ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm hover:shadow-lg hover:scale-[1.02] focus:scale-[1.02]"
                  placeholder="Enter User ID (min 2 characters)"
                  autoFocus
                  style={{
                    transform: 'translateZ(20px)'
                  }}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 via-blue-400/5 to-blue-400/0 group-hover:via-blue-400/10 transition-all duration-300 pointer-events-none" />
              </div>
            </div>

            {/* PIN Input with 3D effect */}
            <div className="group">
              <label className="block text-gray-700 font-bold mb-2 flex items-center gap-2">
                <span className="text-purple-500 text-xl">🔒</span>
                PIN
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm hover:shadow-lg hover:scale-[1.02] focus:scale-[1.02]"
                  placeholder="Enter PIN (min 4 digits)"
                  maxLength={6}
                  style={{
                    transform: 'translateZ(20px)'
                  }}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/0 via-purple-400/5 to-purple-400/0 group-hover:via-purple-400/10 transition-all duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Error Message with animation */}
            {loginError && (
              <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-xl text-sm animate-shake relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-300/0 via-red-300/20 to-red-300/0 animate-shimmer-fast" />
                <div className="relative flex items-center gap-2">
                  <span className="text-lg">⚠️</span>
                  {loginError}
                </div>
              </div>
            )}

            {/* 3D Interactive Login Button */}
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
              style={{
                transform: 'translateZ(30px)'
              }}
            >
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              {/* Button text */}
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="text-xl">🚀</span>
                Login
                <span className="text-xl">✨</span>
              </span>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300" />
            </button>

            {/* Info Text with icon */}
            <p className="text-center text-gray-500 text-xs mt-4 flex items-center justify-center gap-2">
              <span className="text-green-500">🔒</span>
              Your data is stored locally on your device
              <span className="text-green-500">✅</span>
            </p>
          </div>

          {/* Shine effect on card */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,0.2) 0%, transparent 50%)`
            }}
          />
        </div>

        {/* Footer with parallax */}
        <div 
          className="text-center mt-8 space-y-2"
          style={{
            transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`
          }}
        >
          <p className="text-white text-sm opacity-90 flex items-center justify-center gap-2 animate-pulse-slow">
            Made with <span className="text-red-400 text-lg animate-heartbeat">❤️</span> in India <span className="text-lg">🇮🇳</span>
          </p>
          <div className="flex items-center justify-center gap-2 text-white/70 text-xs">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Secure • Private • Offline
          </div>
        </div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        @keyframes shimmer-fast {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          10%, 30% { transform: scale(1.2); }
          20%, 40% { transform: scale(1); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
          background-size: 300% 100%;
        }

        .animate-shimmer-fast {
          animation: shimmer-fast 2s infinite;
        }

        .animate-shake {
          animation: shake 0.5s;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        .bg-300\% {
          background-size: 300%;
        }
      `}</style>
    </div>
  );
};

export default LoginScreen;
