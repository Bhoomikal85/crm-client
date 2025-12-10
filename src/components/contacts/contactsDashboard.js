import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact } from '../../redux/actions/contactActions';
import ContactForm from './contactsForm';

export default function ContactsDashboard() {
  const dispatch = useDispatch();
  const contacts = useSelector(s => s.contacts);
  const auth = useSelector(s => s.auth);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    dispatch(fetchContacts({ page, q, status }));
  }, [dispatch, page, q, status]);

  return (
    <div className="container mt-4">
      <h3>Contacts</h3>
      <div className="mb-3 row">
        <div className="col">
          <input className="form-control" placeholder="Search by name or email" value={q} onChange={e=>setQ(e.target.value)} />
        </div>
        <div className="col">
          <select className="form-select" value={status} onChange={e=>setStatus(e.target.value)}>
            <option value="">All statuses</option>
            <option>Lead</option>
            <option>Prospect</option>
            <option>Customer</option>
          </select>
        </div>
      </div>

      <ContactForm />

      {contacts.loading ? <p>Loading...</p> : (
        <>
          <table className="table table-striped">
            <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Company</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {contacts.items.map(c => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.company}</td>
                  <td>{c.status}</td>
                  <td>
                    {/* edit flow could open modal with ContactForm prefilled */}
                    <button className="btn btn-sm btn-danger" onClick={()=>dispatch(deleteContact(c._id))}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <nav>
            <ul className="pagination">
              {Array.from({length: contacts.pages || 1}, (_, i) => (
                <li key={i} className={`page-item ${contacts.page === i+1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={()=>setPage(i+1)}>{i+1}</button>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
