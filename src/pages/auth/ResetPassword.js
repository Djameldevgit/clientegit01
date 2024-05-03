import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification';
import {isLength, isMatch } from '../../utils/validation/valid';
 
const initialState = {
    password: '',
    cf_password: '',
    err: '',
    success: ''
};

function ResetPassword() {
    const [data, setData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showLoginButton, setShowLoginButton] = useState(false);
    const { token } = useParams();
    const history = useHistory();

    const { password, cf_password, err, success } = data;

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value, err: '', success: '' });
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleResetPass = async () => {
        if (isLength(password)) {
            return setData({ ...data, err: "Le mot de passe doit être d'au moins 6 caractères.", success: '' });
        }

        if (!isMatch(password, cf_password)) {
            return setData({ ...data, err: 'Le mot de passe ne correspond pas.', success: '' });
        }

        try {
            const res = await axios.post('/api/reset', { password }, {
                headers: { Authorization: token }
            });

            setData({ ...data, err: '', success: res.data.msg });
            setShowLoginButton(true); // Mostrar el botón para redirigir al inicio de sesión
        } catch (err) {
            err.response.data.msg && setData({ ...data, err: err.response.data.msg, success: '' });
        }
    };

    const handleLoginRedirect = () => {
        history.push('/login'); // Redirigir al usuario al inicio de sesión
    };

    return (
        <div className="container mt-4">
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <h2 className="text-center">Créer un nouveau mot de passe</h2>
            <div className="row">
                <label htmlFor="password">Mot de passe</label>
                <div className="input-group">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={handleChangeInput}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? 'Masquer' : 'Afficher'}
                        </button>
                    </div>
                </div>

                <label htmlFor="cf_password">Confirmez le mot de passe</label>
                <div className="input-group">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="cf_password"
                        id="cf_password"
                        className="form-control"
                        value={cf_password}
                        onChange={handleChangeInput}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={toggleShowConfirmPassword}
                        >
                            {showConfirmPassword ? 'Masquer' : 'Afficher'}
                        </button>
                    </div>
                </div>

                <button className="btn btn-primary mt-4" onClick={handleResetPass}>
                    Sauvegarder
                </button>

                {showLoginButton && (
                    <button className="btn btn-secondary mt-2" onClick={handleLoginRedirect}>
                        Aller à la page de connexion
                    </button>
                )}
            </div>
        </div>
    );
}

export default ResetPassword;
