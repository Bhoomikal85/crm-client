import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(s => s.auth);
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    dispatch(loginRequest({ email, password }));
  };

  if (auth.user) {
    navigate('/contacts');
  }

  return (
    <div className="container mt-5">
      <h3>Sign in</h3>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>Email</label>
          <input className="form-control" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <button className="btn btn-primary" type="submit">Sign in</button>
      </form>
      {auth.error && <div className="alert alert-danger mt-3">{auth.error}</div>}
    </div>
  );
}
