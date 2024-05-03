import React, { useState } from 'react';
import { postDataAPI } from '../../utils/fetchData';
import { useSelector } from 'react-redux';
 
const Confirmacioncorreo = () => {
    const { auth } = useSelector((state) => state);
    const [correoDestino, setCorreoDestino] = useState('');
    const [loading, setLoading] = useState(false);

    const enviarCorreoConfirmacion = async () => {
        try {
            setLoading(true);
       
 
            const respuesta = await postDataAPI('enviarcorreoconfirmacion', {
                correoDestino: correoDestino, // Usar el valor del campo de entrada
         
            }, auth.token);

            if (respuesta.ok) {
                alert('Correo electrónico de confirmación enviado correctamente. Por favor, verifica tu correo electrónico.');
            } else {
                 
                alert('Hubo un error al enviar el correo electrónico de confirmación. Por favor, inténtalo de nuevo más tarde.');
            }
        } catch (error) {
             
            alert('Hubo un error al enviar el correo electrónico de confirmación. Por favor, inténtalo de nuevo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="email"
                placeholder="Correo electrónico de destino"
                value={correoDestino}
                onChange={(e) => setCorreoDestino(e.target.value)}
            />

            <button onClick={enviarCorreoConfirmacion} disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar Correo de Confirmación'}
            </button>
        </div>
    );
};

export default Confirmacioncorreo;
