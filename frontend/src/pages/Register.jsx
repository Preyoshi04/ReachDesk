import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Mail, Lock, UserPlus, ArrowLeft } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import BASE_URL from "../api/config";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError("");

    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/auth/register`,
        formData
      );
      toast.success("Registration Successful! Please Login.");
      navigate("/login");
    } catch (err) {
      toast.error("Registration Failed! Please try again.");
      setError(err.response?.data?.message || "Server Error - Check Console");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6">
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-[2.5rem] border border-slate-700/50 shadow-2xl p-10">
          <button
            onClick={() => navigate("/")}
            className="mb-6 p-2 flex items-center gap-2 text-slate-400 hover:text-slate-200 group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-md font-medium">Back to Home</span>
          </button>
          <header className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              Create Account
            </h2>
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          </header>

          <Toaster />

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">
                Full Name
              </label>
              <div className="relative group">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />
                <input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900/50 border border-slate-700 text-slate-100 pl-11 pr-4 py-3.5 rounded-2xl outline-none focus:border-slate-400 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="test@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900/50 border border-slate-700 text-slate-100 pl-11 pr-4 py-3.5 rounded-2xl outline-none focus:border-slate-400 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900/50 border border-slate-700 text-slate-100 pl-11 pr-4 py-3.5 rounded-2xl outline-none focus:border-slate-400 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 flex items-center justify-center gap-3 py-4 bg-slate-100 text-slate-900 font-bold rounded-2xl shadow-lg hover:bg-white transition-all duration-200"
            >
              <UserPlus size={20} />
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
