import React, {useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Bg from '../images/bg.png';
import Back from '../images/back.svg'
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: 'teal',
    },
  },
  main: {
    width: '100%',
    height: '100hv',
    padding: 0,
    backgroundImage: `url(${Bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'fixed',
  },
  back: {
    marginRight: '100%',
  },
  backIcon: {
    width: '1.5em',
  },
  block: {
    width: '80%',
    height: '100hv',
    margin: 'auto',
    textAlign: 'center',
    backgroundColor: 'white',
  },
  paper: {
    marginTop: theme.spacing(10),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'grey',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: 'none',
    cursor: 'pointer',
  },
}));

const SignUp = () => {
  const classes = useStyles();
  let [nick, setNick] = useState();
  let [mail, setMail] = useState();
  let [pass, setPass] = useState();
  let [helperText, setHelperText] = useState('');
  let [error, setError] = useState(false);
  


  const handleNickInputChange = (event) => {
    setNick(event.target.value);
  }

  const handleMailInputChange = (event) => {
    setMail(event.target.value);
  }

  const handlePassInputChange = (event) => {
    if (event.target.value.length >= 6) {
      setPass(event.target.value);
      setHelperText('');
      setError(false);
    } else {
      setHelperText('Password is invalid. Minimin 6 symbols are required.');
      setError(true);
    }
  }

  const submitButton =() => {
  axios.post('http://localhost:3030/users',{
  email: mail,
  password: pass,
  nickname: nick
})
}

  return (
    <div className={classes.main}>
      <RouterLink to='/' className={classes.link}>
      <CardHeader className={classes.back}
        action={
          <IconButton>
            <CardMedia 
        className={classes.backIcon} 
        component="img"
        src={Back}
        title="Back"/>
          </IconButton>
        }
      />
      </RouterLink>
      <section className={classes.block}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <div className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={handleNickInputChange}
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Nickname"
                  autoFocus
                  color='secondary'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleMailInputChange}
                  variant="outlined"
                  required
                  fullWidth
                  type= "email"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handlePassInputChange}
                  error = {error}
                  helperText = {helperText}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <RouterLink href="#" variant="body2" className={classes.link} to="/messages">
            <Button
              onClick={submitButton}
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Sign Up
            </Button>
            </RouterLink>
          </div>
          <RouterLink href="#" variant="body2" to="/signin/">
            {"Already have an account? Sign In! :)"}
          </RouterLink>
        </div>
      </Container>
      </section>
    </div>
  );
}

export default SignUp;