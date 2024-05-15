import React, { useState, useEffect } from 'react';
import {   useHistory } from 'react-router-dom';
import { useDispatch,useSelector  } from 'react-redux';
import { login } from '../../redux/actions/authAction';
 
const LoginPass = () => {
 

  const { auth } = useSelector(state => state);
  const initialState = { account: '', password: '' };
  const [data, setUserLogin] = useState(initialState);
  const { account, password } = data;

  const [typePass, setTypePass] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (auth.token) history.push('/');
    }, [auth.token, history]);

  

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setUserLogin({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="account" className="form-label">
          E-mail/numéro de téléphone
        </label>
        <input
          type="text"
          className="form-control"
          id="account"
          name="account"
          value={account}
          onChange={handleChangeInput}
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="password" className="form-label">Mot de passe</label>
        <div className="pass">
          <input
            type={typePass ? 'text' : 'password'}
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
          <small onClick={() => setTypePass(!typePass)}>
            {typePass ? 'Hide' : 'Show'}
          </small>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-dark w-100 mt-1"
        disabled={!account || !password}
      >
        Login
      </button>
    </form>
  );
};

export default LoginPass;
