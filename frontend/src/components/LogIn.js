import React, {useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import axios from 'axios';

import {makeStyles} from '@material-ui/core/styles';
import { useCookies } from 'react-cookie';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}))

const LogIn = () => {
  const classes = useStyles();
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState();
  let [hint, setHint] = useState('');
  let [error, setError] = useState(false);
  const [cookie, setCookie] = useCookies([]);
  const [main, setMain] = useState(false);

  const handleMailInputChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePassInputChange = (event) => {
    if (event.target.value.length >= 6) {
      setPassword(event.target.value);
      setHint('');
      setError(false);
    } else {
      setHint('Password is invalid. Min 6 symbols are required.');
      setError(true);
    }
  }

  const submitButton =() => {
    axios.post('http://localhost:3030/authentication',{
    strategy : 'local',
    email: email,
    password: password,
    })
    .then(response => {
      if (response.status === 201) {
        setCookie('token', response.data.accessToken, { path: '/' });
        setTimeout(() => setMain(true), 500);
      }
    })
    .catch(error => {
      alert(`Authorization failed \n ${error.response.data.message}`);
      let errorText = error;
      console.log(error.response.data.message)
      })
    }

    return (
      <div className={classes.form} noValidate>
        <h3>Sign In</h3>
        <TextField onChange={handleMailInputChange} variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoFocus />
        <TextField onChange={handlePassInputChange} error = {error} helperText = {hint} variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password"/>
        <Button onClick = {submitButton} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Sign In</Button>
        <a href="#" variant="body2" to="/registration">{"Don't have an account? Sign Up"}</a>
      </div>
    );
}

export default LogIn;