import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ContactFormModal from "./contactFormModal";
import { contactDelete, contactList } from "../../redux/actions/contactsAction";



const ContactsDashboard = () => {
  const dispatch = useDispatch();
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [show, setShow] = useState(false);

  const fetchContacts = () => {
    dispatch(contactList(
      { q: query, status },
      (res) => setContacts(res.data.items),
      (err) => console.log(err)
    ));
  };

  useEffect(() => {
    fetchContacts();
  }, [query, status]);

  const deleteHandler = (id) => {
    dispatch(
      contactDelete(
        id,
        () => fetchContacts(),
        (err) => console.log(err)
      )
    );
  };

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-success">Contacts</h2>
        <button
          className="btn btn-success px-4 rounded-pill"
          onClick={() => {
            setSelectedContact(null);
            setShow(true);
          }}
        >
          + Add Contact
        </button>
      </div>

      {/* Search & Filter */}
      <div className="card shadow-sm border-0 rounded-4 p-4 mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <input
              placeholder="Search by name or email..."
              className="form-control form-control-lg rounded-3"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <select
              className="form-select form-select-lg rounded-3"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Lead">Lead</option>
              <option value="Prospect">Prospect</option>
              <option value="Customer">Customer</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm border-0 rounded-4">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-success text-white">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Company</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-end">Actions</th>
              </tr>
            </thead>

            <tbody>
              {contacts.map((c) => (
                <tr key={c._id}>
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.phone}</td>
                  <td className="p-3">{c.company}</td>

                  <td className="p-3">
                    <span className="badge bg-success-subtle text-success border px-3 py-2 rounded-pill">
                      {c.status}
                    </span>
                  </td>

                  <td className="p-3 text-end">
                    <button
                      className="btn btn-outline-primary btn-sm rounded-pill me-2 px-3"
                      onClick={() => {
                        setSelectedContact(c);
                        setShow(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm rounded-pill px-3"
                      onClick={() => deleteHandler(c._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* Modal */}
      {show && (
        <ContactFormModal
          show={show}
          contact={selectedContact}
          onClose={() => setShow(false)}
          refresh={fetchContacts}
        />
      )}
    </div>
  );
};

export default ContactsDashboard;
