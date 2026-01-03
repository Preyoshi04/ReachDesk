// pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, LogIn, ArrowLeft, ShieldCheck } from "lucide-react";
import BASE_URL from "../api/config";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axios.post(`${BASE_URL}/api/auth/login`, formData);
      console.log("Login Response:", data);
      localStorage.setItem("token", data.token);
     const nameToStore = data.user?.name || data.user?.username || "User";
    localStorage.setItem("username", nameToStore);
      toast.success("Logged In Successfully !!");
      navigate("/home"); 
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 selection:bg-slate-500/30">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-800/30 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md">
        <button 
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </button>
<Toaster />
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-[2.5rem] border border-slate-700/50 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] p-10">
          <header className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-slate-400 text-sm">Enter your details to access ReachDesk.</p>
          </header>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-slate-200 transition-colors" size={18} />
                <input
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900/50 border border-slate-700 text-slate-100 pl-11 pr-4 py-3.5 rounded-2xl outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Password</label>
                <button type="button" className="text-[10px] text-slate-500 hover:text-slate-300 uppercase tracking-tighter">Forgot?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-slate-200 transition-colors" size={18} />
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900/50 border border-slate-700 text-slate-100 pl-11 pr-4 py-3.5 rounded-2xl outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 flex items-center justify-center gap-3 py-4 bg-slate-100 text-slate-900 font-bold rounded-2xl shadow-lg hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <LogIn size={20} />
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center text-slate-400 text-sm">
            New to ReachDesk?{" "}
            <button 
              onClick={() => navigate("/register")}
              className="text-slate-100 font-semibold hover:underline decoration-slate-500 underline-offset-4"
            >
              Create account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;