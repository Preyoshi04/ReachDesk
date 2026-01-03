function ContactList({ contacts }) {
  return (
    <div>
      <h3>All Contacts</h3>
      {contacts.map(c => (
        <div key={c._id} style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
          <p><strong>Name:</strong> {c.name}</p>
          <p><strong>Email:</strong> {c.email}</p>
          <p><strong>Phone:</strong> {c.phone}</p>
          <p><strong>Message:</strong> {c.message}</p>
        </div>
      ))}
    </div>
  );
}

export default ContactList;
