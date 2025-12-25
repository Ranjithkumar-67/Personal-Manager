// App.jsx
import MainLayout from "./components/Layout/MainLayout";
import Login from "./pages/Login";

function App() {
  // all state + handlers here

  if (!isLoggedIn) {
    return (
      <Login
        userId={userId}
        pin={pin}
        setUserId={setUserId}
        setPin={setPin}
        loginError={loginError}
        handleLogin={handleLogin}
        isDarkTheme={isDarkTheme}
      />
    );
  }

  return (
    <MainLayout
      page={page}
      setPage={setPage}
      isDarkTheme={isDarkTheme}
      setIsDarkTheme={setIsDarkTheme}
      currentTime={currentTime}
      // pass notes, tasks, goals, habits, expenses, income, monthlyLimit, etc.
      // plus all handlers for add/edit/delete
    />
  );
}

export default App;

