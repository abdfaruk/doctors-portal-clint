import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import login from '../../../images/login.png';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { user, loginUser, isLoading, signInUsingGoogle, authError} = useAuth();


    const location = useLocation();
    const history = useHistory();

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = {...loginData};
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    const handleLoginSubmit = e =>{
        loginUser(loginData.email, loginData.password, location, history);
        e.preventDefault();
    }




    const handleGoogleLogin = () => {
        signInUsingGoogle(location, history);
    }


    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item sx={{mt:8}} xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>Login</Typography>
                    { !isLoading && <form onSubmit={handleLoginSubmit}>
                        <TextField 
                            sx={{width: '75%', m:1}}
                            id="standard-basic" 
                            label="Your Email" 
                            name="email"
                            type="email"
                            onChange={handleOnChange}
                            variant="standard" 
                        />
                        <br />
                        <TextField 
                            id="standard-basic" 
                            sx={{width: '75%', m:1}}
                            type="password"
                            name="password"
                            onChange={handleOnChange}
                            label="Your Password" 
                            variant="standard" 
                        />
                        <br />
                        <NavLink style={{textDecoration:'none'}}  to='/register'><Button variant="text">New User? Please Register</Button></NavLink>
                        <br />
                        <Button sx={{width: '75%', m:1}} variant="contained" type="submit">Login</Button>
                    </form>}
                    <Button onClick={handleGoogleLogin} sx={{width: '75%', m:1}} variant="contained">Sign With Google</Button>
                    {isLoading && <CircularProgress />}
                    {user?.email && <Alert severity="success">Congratulation! User Logged in successfully!</Alert>}
                    {authError && <Alert severity="error">{authError}</Alert>}
                    
                </Grid>
                <Grid item xs={12} md={6}>
                    <img style={{width:"100%"}} src={login} alt="" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;