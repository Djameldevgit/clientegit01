import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
 
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'
import { Link } from 'react-router-dom';
 
import Grid from '@mui/material/Grid';
import { postDataAPI } from '../../utils/fetchData';
 
function ActivationEmail() {
    const { activation_token } = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')
 
    useEffect(() => {
     
        const activationEmail = async () => {
            try {
                const res = await postDataAPI('activation', { activation_token }, {
                  
                })
        
                setSuccess(res.data.msg)
            } catch (err) {
                console.error("La demande d'activation a échoué:", err); // Agrega esta línea para mostrar el error en la consola del navegador
                err.response.data.msg && setErr(err.response.data.msg)
            }
        }
        activationEmail()
    }, [activation_token])

    return (
        <div className="active_page">
            {err && showErrMsg(err)}

            {success && showSuccessMsg(success)}

            <Grid container className='mt-4 mx-auto'>
                <Grid item>
                    <Link to="/login" variant="body2">
                        Aller à la page de connexion
                    </Link>
                </Grid>
            </Grid>

        </div>
    )
}

export default ActivationEmail
