import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createContact } from '../../redux/actions/contactActions';

export default function ContactForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name:'', email:'', phone:'', company:'', status:'Lead', notes:'' });

  const submit = (e) => {
    e.preventDefault();
    dispatch(createContact(form));
    setForm({ name:'', email:'', phone:'', company:'', status:'Lead', notes:'' });
  };

  return (
    <form onSubmit={submit} className="mb-3">
      <div className="row g-2">
        <div className="col-md-3"><input placeholder="Name" className="form-control" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required /></div>
        <div className="col-md-3"><input placeholder="Email" className="form-control" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required /></div>
        <div className="col-md-2"><input placeholder="Phone" className="form-control" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} /></div>
        <div className="col-md-2"><input placeholder="Company" className="form-control" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} /></div>
        <div className="col-md-2">
          <select className="form-select" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
            <option>Lead</option><option>Prospect</option><option>Customer</option>
          </select>
        </div>
      </div>
      <div className="mt-2">
        <textarea className="form-control" placeholder="Notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} />
      </div>
      <button className="btn btn-success mt-2">Add contact</button>
    </form>
  );
}
