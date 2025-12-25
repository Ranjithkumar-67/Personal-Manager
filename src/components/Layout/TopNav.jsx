import { Sun, Moon, User } from "./Icons";

export default function TopNav({
  currentTime,
  isDarkTheme,
  setIsDarkTheme,
  setPage
}) {
  return (
    <div className="glass-nav fixed top-0 left-0 right-0 px-6 py-4 max-w-lg mx-auto z-50 rounded-b-2xl">
      <div className="flex justify-between items-center">
        <p className="text-sm font-bold">
          {currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
        </p>
        <div className="flex gap-3">
          <button onClick={() => setIsDarkTheme(!isDarkTheme)}>
            {isDarkTheme ? <Sun /> : <Moon />}
          </button>
          <button onClick={() => setPage("settings")}>
            <User />
          </button>
        </div>
      </div>
    </div>
  );
}

