import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/authAction';

const RegisterForm = () => {
  const initialState = {
    username: '',
    account: '',
    password: '',
    cf_password: '',
  };
  const [userRegister, setUserRegister] = useState(initialState);
  const { username, account, password, cf_password } = userRegister;

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const dispatch = useDispatch();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserRegister({ ...userRegister, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userRegister));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="name" className="form-label">Nom</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="username"
          value={username}
          onChange={handleChangeInput}
          
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="account" className="form-label">E-mail/numéro de téléphone</label>
        <input
          type="text"
          className="form-control"
          id="account"
          name="account"
          value={account}
          onChange={handleChangeInput}
          placeholder="Example@gmail.com/+21352547854"
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
            placeholder="Mot de passe plus de 6 caracter."
          />
          <small onClick={() => setTypePass(!typePass)}>
            {typePass ? 'Masquer' : 'Afficher'}
          </small>
        </div>
      </div>

      <div className="form-group mb-3">
        <label htmlFor="cf_password" className="form-label">Confirmez le mot de passe</label>
        <div className="pass">
          <input
            type={typeCfPass ? 'text' : 'password'}
            className="form-control"
            id="cf_password"
            name="cf_password"
            value={cf_password}
            onChange={handleChangeInput}
            placeholder="confirmer le mot de passe."
          />
          <small onClick={() => setTypeCfPass(!typeCfPass)}>
            {typeCfPass ? 'Masquer' : 'Afficher'}
          </small>
        </div>
      </div>

      <button type="submit" className="btn btn-dark w-100 my-1">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
