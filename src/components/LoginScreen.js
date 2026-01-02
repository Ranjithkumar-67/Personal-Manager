import React, { useState } from 'react';

const LoginScreen = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const [pin, setPin] = useState('');
  const [loginError, setLoginError] = useState('');

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeIn">
          <div className="text-6xl mb-4 animate-pulse">📱</div>
          <h1 className="text-5xl font-black text-white mb-2 leading-tight">
            PERSONAL<br/>MANAGER
          </h1>
          <p className="text-blue-200 text-lg font-semibold">🇮🇳 Indian Edition</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl animate-slideIn">
          <div className="space-y-4">
            {/* User ID Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                User ID
              </label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Enter User ID (min 2 characters)"
                autoFocus
              />
            </div>

            {/* PIN Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                PIN
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Enter PIN (min 4 digits)"
                maxLength={6}
              />
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl text-sm animate-fadeIn">
                {loginError}
              </div>
            )}

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Login
            </button>

            {/* Info Text */}
            <p className="text-center text-gray-500 text-xs mt-4">
              Your data is stored locally on your device
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white text-sm mt-6 opacity-75">
          Made with ❤️ in India
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
