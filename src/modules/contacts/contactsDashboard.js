import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../redux/config";
import ContactFormModal from "./contactFormModal";


const ContactsDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchContacts = async () => {
    const token = localStorage.getItem("accessToken");

    const res = await axios.get(`${url}/contacts`, {
      params: { q: query, status },
      headers: { Authorization: `Bearer ${token}` }
    });

    setContacts(res.data.items);
  };

  useEffect(() => {
    fetchContacts();
  }, [query, status]);

  const deleteContact = async (id) => {
    if (!window.confirm("Delete this contact?")) return;

    const token = localStorage.getItem("accessToken");

    await axios.delete(`${url}/contacts/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    fetchContacts();
  };

  return (
    <div className="container py-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-success">Contacts</h2>

        <button
          className="btn btn-success px-4 py-2 rounded-pill shadow-sm"
          onClick={() => {
            setSelectedContact(null);
            setShowModal(true);
          }}
        >
          + Add Contact
        </button>
      </div>

      {/* Search + Filter Box */}
      <div className="card shadow-sm border-0 rounded-4 p-4 mb-4">
        <div className="row g-3">

          <div className="col-md-6">
            <input
              className="form-control form-control-lg rounded-3"
              placeholder="Search by name or email..."
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

      {/* Contacts Table */}
      <div className="card shadow-sm border-0 rounded-4">
        <div className="table-responsive">
          <table className="table align-middle table-hover mb-0">
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
                <tr key={c._id} className="border-bottom">
                  <td className="p-3 fw-semibold">{c.name}</td>
                  <td className="p-3 text-secondary">{c.email}</td>
                  <td className="p-3">{c.phone || "-"}</td>
                  <td className="p-3">{c.company || "-"}</td>

                  <td className="p-3">
                    <span className="badge bg-success-subtle text-success border border-success rounded-pill px-3 py-2">
                      {c.status}
                    </span>
                  </td>

                  <td className="p-3 text-end">

                    <button
                      className="btn btn-outline-primary btn-sm rounded-pill me-2 px-3"
                      onClick={() => {
                        setSelectedContact(c);
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm rounded-pill px-3"
                      onClick={() => deleteContact(c._id)}
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
      {showModal && (
        <ContactFormModal
          show={showModal}
          onClose={() => setShowModal(false)}
          contact={selectedContact}
          refresh={fetchContacts}
        />
      )}

    </div>
  );
};

export default ContactsDashboard;
