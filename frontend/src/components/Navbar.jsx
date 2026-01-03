// components/Navbar.jsx
import { useNavigate } from "react-router-dom";
import { LogOut, User, Search, Contact2 } from "lucide-react";

function Navbar({ searchQuery, setSearchQuery, username }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-800/80 backdrop-blur-md border-b border-slate-700/50 p-6 flex items-center justify-between">
      {/* icon */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="bg-slate-100 p-1.5 rounded-lg">
          <Contact2 className="text-slate-900 w-5 h-5" />
        </div>
        <span className="text-3xl font-bold text-white tracking-tight hidden md:block">
          Reach<span className="text-slate-400">Desk</span>
        </span>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-md mx-4">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          size={18}
        />
        <input
          type="text"
          placeholder="Search contacts..."
          className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2 pl-10 pr-4 outline-none focus:border-slate-500 transition-all text-sm text-slate-200"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* user icon , logout */}
      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-slate-700 rounded-full transition-colors group flex flex-col items-center">
          <User size={30} className="text-slate-300 group-hover:text-white" />{" "}
          {username}
        </button>
        <button
          onClick={handleLogout}
          className="p-2 hover:bg-red-500/10 group rounded-full transition-colors flex flex-col items-center"
          title="Logout"
        >
          <LogOut
            size={30}
            className="text-slate-400 group-hover:text-red-400"
          />
          Log Out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
