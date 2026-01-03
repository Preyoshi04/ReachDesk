// pages/Landing.jsx
import { useNavigate } from "react-router-dom";
import { UserPlus, LogIn, Contact2, ShieldCheck, Zap } from "lucide-react";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 selection:bg-slate-500/30">
      <div className="bg-slate-800/40 rounded-full blur-[120px] pointer-events-none" />

      <div>
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-[2.5rem] border border-slate-700/50 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] p-10 text-center">
          {/* Logo Section */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-slate-400 blur-xl opacity-20 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-slate-100 to-slate-400 p-4 rounded-2xl shadow-2xl">
                <Contact2
                  className="w-10 h-10 text-slate-900"
                  strokeWidth={2.5}
                />
              </div>
            </div>
          </div>

          <header className="space-y-3 mb-10">
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Reach<span className="text-slate-400">Desk</span>
            </h1>
            <p className="text-slate-400 font-medium leading-relaxed">
              Elevate your network management with a sleek, unified contact
              workspace.
            </p>
          </header>

          <div className="grid gap-4">
            <button
              onClick={() => navigate("/register")}
              className="flex items-center justify-center gap-3 w-full py-4 bg-slate-100 text-slate-900 font-bold rounded-2xl shadow-lg hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <UserPlus size={20} />
              Get Started
            </button>

            <button
              onClick={() => navigate("/login")}
              className="flex items-center justify-center gap-3 w-full py-4 bg-slate-800/80 text-slate-200 font-semibold rounded-2xl border border-slate-600 hover:bg-slate-700 hover:border-slate-500 transition-all duration-200 shadow-md cursor-pointer"
            >
              <LogIn size={20} />
              Sign In
            </button>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-700/50 flex justify-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <ShieldCheck size={14} className="text-slate-600" />
              Secure
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <Zap size={14} className="text-slate-600" />
              Fast
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
