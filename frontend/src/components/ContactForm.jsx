import { useState } from "react";

function ContactForm({ fetchContacts }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    });

    if(res.ok){
      setForm({ name: "", email: "", phone: "", message: "" });
      fetchContacts();
    } else {
      alert("Error adding contact");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Contact</h3>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required/>
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required/>
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required/>
      <input name="message" placeholder="Message" value={form.message} onChange={handleChange}/>
      <button type="submit">Add Contact</button>
    </form>
  );
}

export default ContactForm;
