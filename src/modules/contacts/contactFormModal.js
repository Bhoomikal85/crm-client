import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../redux/config";

const ContactFormModal = ({ show, onClose, contact, refresh }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "Lead",
    notes: "",
  });

  useEffect(() => {
    if (contact) setForm(contact);
  }, [contact]);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");

    if (contact) {
      await axios.put(`${url}/contacts/${contact._id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      await axios.post(`${url}/contacts`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    refresh();
    onClose();
  };

  return (
    <div className={`modal fade ${show ? "show d-block" : ""}`}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">

          {/* Header */}
          <div className="modal-header bg-success text-white rounded-top-4">
            <h5 className="modal-title">
              {contact ? "Edit Contact" : "Add Contact"}
            </h5>
            <button className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          {/* Form */}
          <form onSubmit={submit}>
            <div className="modal-body p-4">

              <label className="fw-semibold">Name</label>
              <input
                required
                name="name"
                className="form-control form-control-lg rounded-3 mb-3"
                placeholder="Name"
                value={form.name}
                onChange={onChange}
              />

              <label className="fw-semibold">Email</label>
              <input
                required
                name="email"
                className="form-control form-control-lg rounded-3 mb-3"
                placeholder="Email"
                value={form.email}
                onChange={onChange}
              />

              <label className="fw-semibold">Phone</label>
              <input
                name="phone"
                className="form-control form-control-lg rounded-3 mb-3"
                placeholder="Phone"
                value={form.phone}
                onChange={onChange}
              />

              <label className="fw-semibold">Company</label>
              <input
                name="company"
                className="form-control form-control-lg rounded-3 mb-3"
                placeholder="Company"
                value={form.company}
                onChange={onChange}
              />

              <label className="fw-semibold">Status</label>
              <select
                name="status"
                className="form-select form-select-lg rounded-3 mb-3"
                value={form.status}
                onChange={onChange}
              >
                <option>Lead</option>
                <option>Prospect</option>
                <option>Customer</option>
              </select>

              <label className="fw-semibold">Notes</label>
              <textarea
                name="notes"
                className="form-control rounded-3"
                placeholder="Notes"
                rows="3"
                value={form.notes}
                onChange={onChange}
              />
            </div>

            {/* Footer */}
            <div className="modal-footer border-0 p-3">
              <button type="button" className="btn btn-light border rounded-pill px-4" onClick={onClose}>
                Cancel
              </button>

              <button type="submit" className="btn btn-success rounded-pill px-4">
                {contact ? "Save" : "Add Contact"}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default ContactFormModal;
