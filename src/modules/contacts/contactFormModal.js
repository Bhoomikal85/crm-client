import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { contactsCreateApi, contactsEditApi } from "../../redux/api/contactsApis";


const ContactFormModal = ({ show, onClose, contact, refresh }) => {
  const dispatch = useDispatch();

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

  const submit = (e) => {
    e.preventDefault();

    if (contact) {
      dispatch(
        contactsEditApi(
          { ...form, id: contact._id },
          () => {
            refresh();
            onClose();
          },
          (err) => console.error(err)
        )
      );
    } else {
      dispatch(
        contactsCreateApi(
          form,
          () => {
            refresh();
            onClose();
          },
          (err) => console.error(err)
        )
      );
    }
  };

  return (
    <div className={`modal fade ${show ? "show d-block" : ""}`}>

      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">

          <div className="modal-header bg-success text-white rounded-top-4">
            <h5 className="modal-title">
              {contact ? "Edit Contact" : "Add Contact"}
            </h5>
            <button className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <form onSubmit={submit}>
            <div className="modal-body p-4">

              <input name="name" required placeholder="Name"
                className="form-control form-control-lg rounded-3 mb-3"
                value={form.name} onChange={onChange} />

              <input name="email" required placeholder="Email"
                className="form-control form-control-lg rounded-3 mb-3"
                value={form.email} onChange={onChange} />

              <input name="phone" placeholder="Phone"
                className="form-control form-control-lg rounded-3 mb-3"
                value={form.phone} onChange={onChange} />

              <input name="company" placeholder="Company"
                className="form-control form-control-lg rounded-3 mb-3"
                value={form.company} onChange={onChange} />

              <select name="status"
                className="form-select form-select-lg rounded-3 mb-3"
                value={form.status} onChange={onChange}>
                <option>Lead</option>
                <option>Prospect</option>
                <option>Customer</option>
              </select>

              <textarea name="notes" placeholder="Notes"
                className="form-control rounded-3"
                rows="3" value={form.notes} onChange={onChange} />

            </div>

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
