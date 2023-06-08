import { useState } from "react";
import axios from "axios";
import { Box, Button, Grid, TextField, ThemeProvider, Typography } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import React from "react";

const baseUrl = 'http://localhost:8080';
const theme = createTheme({
    palette: {
        primary: {
            main: '#f6f6e5'
        }
    }
})

const AuthPage = (props) => {
    const [username, setUsername] = useState();
    const [secret, setSecret] = useState();
    const [email, setEmail] = useState();
    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();

    const onLogin = (e) => {
        console.log({username, secret});
        e.preventDefault();
        axios
            .post(`${baseUrl}/login`, {username, secret})
            .then((r) => props.onAuth({...r.data, secret}))
            .catch((e) => console.log(JSON.stringify(e.response.data)));
    };

    const onSignup = (e) => {
        e.preventDefault();
        axios
            .post(`${baseUrl}/signup`, {
                username,
                secret,
                email,
                first_name,
                last_name,
            })
            .then((r) => props.onAuth({...r.data, secret}))
            .catch((e) => console.log(JSON.stringify(e.response.data)));
    };

    return (
        <div className="login-page">
            <div className="card">
                {/* Login Form */}
                <Box component="form" onSubmit={onLogin} noValidate sx={{mt: 1}}>
                    <Typography component="h2" variant="h5" color="white">
                        Sign In
                    </Typography>
                    <ThemeProvider theme={theme}>
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            name="secret"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setSecret(e.target.value)}
                        />
                    </ThemeProvider>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                </Box>

                {/* Sign Up Form */}
                <Box component="form" noValidate onSubmit={onSignup} sx={{mt: 3}}>
                    <Typography component="h2" variant="h5" color="white">
                        or Sign Up
                    </Typography>
                    <Grid container spacing={2} sx={{mt: 3}}>
                        <ThemeProvider theme={theme}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="signup-username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="signup-password"
                                    autoComplete="new-password"
                                    onChange={(e) => setSecret(e.target.value)}
                                />
                            </Grid>
                        </ThemeProvider>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign Up
                    </Button>
                </Box>
            </div>

            <style>{`
      .login-page { width: 100vw; height: 100vh; padding-top: 6vw; background: linear-gradient(180deg, rgba(117,84,160,1) 7%, rgba(117,84,160,1) 17%, rgba(106,95,168,1) 29%, rgba(99,103,174,1) 44%, rgba(87,116,184,1) 66%, rgba(70,135,198,1) 83%, rgba(44,163,219,1) 96%, rgba(22,188,237,1) 100%, rgba(0,212,255,1) 100%); }
      .card { width: 500px; position: relative; left: calc(50vw - 260px); text-align: center; }
      .title { padding-top: 32px; font-size: 22px; color: white; font-weight: 700; }
      input { width: calc(100% - 16px); margin-top: 12px; padding: 8px; background-color: #e6f7ff; outline: none; border: 1px solid #e6f7ff; }
      button { margin-top: 12px; width: 100%; padding: 8px; }
      `}</style>
        </div>
    );
};

export default AuthPage;
