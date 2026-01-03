// pages/Home.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import BASE_URL from "../api/config";
import {
  Plus,
  ArrowUpDown,
  Trash2,
  Phone,
  Mail,
  MessageSquare,
  Loader2,
  UserPlus,
  Edit3,
  X,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

function Home() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phno: "",
    message: "",
  });
  const [sortConfig, setSortConfig] = useState({
    key: "username",
    direction: "asc",
  });
  const [editId, setEditId] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${BASE_URL}/api/contacts`,
        getAuthHeaders()
      );
      setContacts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  //Both Add and Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    // matching backend names
    const payload = {
      name: formData.username,
      email: formData.email,
      phone: formData.phno,
      message: formData.message,
    };

    try {
      if (editId) {
        const { data } = await axios.put(
          `${BASE_URL}/api/contacts/${editId}`,
          payload,
          getAuthHeaders()
        );
        setContacts(contacts.map((c) => (c._id === editId ? data : c)));
        setEditId(null);
       toast.success("Contact Updated!");
      } else {
        const { data } = await axios.post(
          `${BASE_URL}/api/contacts`,
          payload,
          getAuthHeaders()
        );
        setContacts([...contacts, data]);
        toast.success("Contact Added!");
      }
      setFormData({ username: "", email: "", phno: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Operation failed.");
    }
  };
  const startEdit = (contact) => {
    setEditId(contact._id);
    setFormData({
      username: contact.username,
      email: contact.email,
      phno: contact.phno,
      message: contact.message,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditId(null);
    setFormData({ username: "", email: "", phno: "", message: "" });
  };
  // DELETE logic
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    toast.success("Contact Deleted!");
    try {
      await axios.delete(`${BASE_URL}/api/contacts/${id}`, getAuthHeaders());
      setContacts(contacts.filter((c) => c._id !== id));
    } catch (err) {
      toast.error("Delete failed.");
    }
  };
  //SORTING logic
  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const sortedAndFiltered = [...contacts]
    .filter(
      (c) =>
        c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const key = sortConfig.key === "username" ? "name" : sortConfig.key;
      const valA = (a[key] || "").toString().toLowerCase();
      const valB = (b[key] || "").toString().toLowerCase();

      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    const loggedInUser = localStorage.getItem("username") || "User";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} username={loggedInUser} />
      <Toaster />

      <main className="container mx-auto px-4 py-10 max-w-[1500px] space-y-12">
        <section
          className={`transition-all duration-500 border-2 rounded-[3rem] p-10 shadow-2xl backdrop-blur-2xl ${
            editId
              ? "bg-indigo-900/20 border-indigo-500/50"
              : "bg-slate-900/40 border-slate-800"
          }`}
        >
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-4">
              <div
                className={`p-4 rounded-2xl shadow-xl ${
                  editId ? "bg-indigo-700" : "bg-white"
                }`}
              >
                {editId ? (
                  <Edit3 className="text-white" size={28} />
                ) : (
                  <UserPlus className="text-slate-900" size={28} />
                )}
              </div>
              <h2 className="text-3xl font-black text-white italic uppercase tracking-tight">
                {editId ? "Update Connection" : "New Connection"}
              </h2>
            </div>
            {editId && (
              <button
                onClick={cancelEdit}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors uppercase font-bold text-md tracking-widest"
              >
                <X size={18} /> Cancel Edit
              </button>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"
          >
            {["username", "email", "phno", "message"].map((field) => (
              <div key={field} className="space-y-3">
                <label className="text-md font-black text-slate-500 uppercase ml-2">
                  {field}
                </label>
                <input
                  required={field !== "message"}
                  className="w-full bg-slate-950/50 border-2 border-slate-800 rounded-2xl px-6 py-4 outline-none focus:border-indigo-400 transition-all text-lg font-medium"
                  placeholder={`Enter ${field}...`}
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                />
              </div>
            ))}
            <button
              type="submit"
              className={`lg:mt-8 h-[60px] font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl uppercase tracking-widest text-md ${
                editId ? "bg-indigo-700 text-white" : "bg-white text-slate-950"
              }`}
            >
              {editId ? "Update" : "Create"}
            </button>
          </form>
        </section>

        {/* DATA TABLE */}
        <section className="bg-slate-900/20 border border-slate-800 rounded-[3.5rem] overflow-hidden shadow-3xl">
          <div className="p-10 border-b border-slate-800 flex justify-between items-center bg-slate-950/30">
            <h3 className="font-black text-2xl text-white uppercase tracking-tighter">
              Network Directory
            </h3>
            <button
              onClick={() => handleSort("username")}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-slate-800 px-6 py-3 rounded-xl border border-slate-700 hover:bg-slate-700 transition-all"
            >
              <ArrowUpDown size={14} /> Sort List
            </button>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-40 gap-6">
                <Loader2 className="animate-spin text-slate-100" size={50} />
                <p className="text-slate-500 font-black uppercase tracking-[0.4em] text-2xl">
                  Syncing Network
                </p>
              </div>
            ) : (
              <table className="w-full min-w-[800px] border-separate border-spacing-0 text-left">
                <thead>
                  <tr className="text-slate-600 text-2xl font-black uppercase tracking-[0.3em] bg-slate-950/60">
                    <th className="px-12 py-8">Identity</th>
                    <th className="px-12 py-8">Contact Info</th>
                    <th className="px-12 py-8">Note</th>
                    <th className="px-12 py-8 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y-8 divide-transparent">
                  {sortedAndFiltered.map((c) => (
                    <tr
                      key={c._id}
                      className="hover:bg-slate-800/30 transition-all group"
                    >
                      <td className="px-12 py-8">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-2xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-white font-black text-xl shadow-lg">
                            {c.name?.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-black text-white text-2xl tracking-tight">
                            {c.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-12 py-8 space-y-2">
                        <div className="flex items-center gap-3 text-slate-300 text-xl font-bold">
                          <Mail size={20} className="text-slate-600" />{" "}
                          {c.email}
                        </div>
                        <div className="flex items-center gap-3 text-lg text-slate-500 font-bold">
                          <Phone size={20} className="text-slate-600" />{" "}
                          {c.phone}
                        </div>
                      </td>
                      <td className="px-12 py-8">
                        <div className="flex items-center gap-3 text-slate-400 bg-slate-950/80 p-5 rounded-2xl border border-slate-800 italic text-lg">
                          <MessageSquare
                            size={20}
                            className="text-slate-700"
                          />
                            {c.message || "---"}
                        </div>
                      </td>
                      <td className="px-12 py-8 text-right">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => startEdit(c)}
                            className="p-4 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 rounded-2xl transition-all border border-slate-700"
                          >
                            <Edit3 size={20} />
                          </button>
                          <button
                            onClick={() => handleDelete(c._id)}
                            className="p-4 bg-red-500/5 text-red-500 hover:bg-red-600 hover:text-white rounded-2xl transition-all border border-red-500/10"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
