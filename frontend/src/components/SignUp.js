import React, {useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  const classes = useStyles();
  let [nick, setNick] = useState();
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  let [hint, setHint] = useState('');
  let [error, setError] = useState(false);

  const handleNickInputChange = (event) => {
    setNick(event.target.value);
  }

  const handleMailInputChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePassInputChange = (event) => {
    if (event.target.value.length >= 6) {
      setPassword(event.target.value);
      setHint('');
      setError(false);
    } else {
      setHint('Password is invalid. Minimin 6 symbols are required.');
      setError(true);
    }
  }

  const [toLogin, setToLogin] = useState(false);

  const submitButton =() => {
    axios.post('http://localhost:3030/users',{
    email: email,
    password: password,
    nickname: nick
  })
    .then(response => {
      if (response.status === 201) {
        alert('Your account is registed');
        setTimeout(() => setToLogin(true), 500);
      }
  } )
  }
  
  return (
    <div>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <div className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField onChange={handleNickInputChange} autoComplete="fname" name="firstName" variant="outlined" required fullWidth id="firstName" label="Nickname" autoFocus />
            </Grid>
            <Grid item xs={12}>
              <TextField onChange={handleMailInputChange} variant="outlined" required fullWidth type= "email" id="email" label="Email Address" name="email" autoComplete="email" />
            </Grid>
            <Grid item xs={12}>
              <TextField onChange={handlePassInputChange} error = {error} helperText = {hint} variant="outlined" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
            </Grid>
          </Grid>
          <Button onClick={submitButton} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}> Sign Up</Button>
          <Grid container justify="flex-end">
            <Grid item>
              <a href="#" variant="body2" to="/login">
                Already have an account? Sign in
              </a>
            </Grid>
          </Grid>
        </div>
    </div>
  )
}

export default SignUp;