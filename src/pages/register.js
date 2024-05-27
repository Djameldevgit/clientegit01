import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//import axios from 'axios';
import { postDataAPI } from '../utils/fetchData';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Paper from '@mui/material/Paper';

//import { TextField, Button, Typography, Box, Grid, Paper, Avatar, createTheme, ThemeProvider } from '@mui/material';
import { Avatar, Button,   TextField, Grid, Box, Typography,   IconButton, InputAdornment, FormControl, InputLabel, OutlinedInput, Link as MuiLink } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
 

import CssBaseline from '@mui/material/CssBaseline';
//import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { showErrMsg, showSuccessMsg } from '../utils/notification/Notification';
import { isEmpty, isEmail, isLength, isMatch } from '../utils/validation/Validation';
 
 
const initialState = {
    username: '',
    email: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
};

function Register() {
    const [user, setUser] = useState(initialState)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {username, email, password,cf_password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (isEmpty(username) || isEmpty(password))
            return setUser({...user, err: "Veuillez remplir tous les champs.", success: ''});
    
        if (!isEmail(email))
            return setUser({...user, err: "E-mails invalides.", success: ''});
    
        if (isLength(password))
            return setUser({...user, err: "Le mot de passe doit contenir au moins 6 caractères.", success: ''});
        
        if (!isMatch(password, cf_password))
            return setUser({...user, err: "Les mots de passe ne correspondent pas.", success: ''});
    
        try {
            const res = await postDataAPI('/register', {
                username, email, password
            });
            
    

            setUser({...user, err: '', success: res.data.msg})
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }


    return (


        <ThemeProvider theme={createTheme()}>
            <div>
            {err && showErrMsg(err)}
                        {success && showSuccessMsg(success)}
            </div>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wedding)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />


                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>



                        <Typography component="h1" variant="h5">
                            S'inscrire
                        </Typography>
                        
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Nom"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={handleChangeInput}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Adresse e-mail"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={handleChangeInput}
                        />
                        <FormControl fullWidth sx={{ mt: 1 }}>
                            <InputLabel htmlFor="password">Mot de passe</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={handleChangeInput}
                                name="password"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={toggleShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ mt: 1 }}>
                            <InputLabel htmlFor="cf_password">Confirmer le mot de passe</InputLabel>
                            <OutlinedInput
                                id="cf_password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={cf_password}
                                onChange={handleChangeInput}
                                name="cf_password"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={toggleShowConfirmPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            S'inscrire
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                Vous avez déjà un compte?{' '}
                                <MuiLink component={Link} to="/login" variant="body2">
                                    Se connecter
                                </MuiLink>
                            </Grid>
                        </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default Register;
