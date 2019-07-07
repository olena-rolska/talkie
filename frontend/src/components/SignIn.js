import React, {useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import { useCookies } from 'react-cookie';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Bg from '../images/bg.png';
import Back from '../images/back.svg'
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
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
    backgroundColor: 'teal',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const classes = useStyles();
  let [mail, setMail] = useState('');
  let [pass, setPass] = useState();
  let [helperText, setHelperText] = useState('');
  let [error, setError] = useState(false);
  const [cookies, setCookie] = useCookies([]);
  const [toMessages, setToMessages] = useState(false);

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
  axios.post('http://localhost:3030/authentication',{
  strategy : 'local',
  email: mail,
  password: pass,
  })
  .then(response => {
    if (response.status === 201) {
      setCookie('token', response.data.accessToken, { path: '/' });
      console.log('redirecting')
      setTimeout(() => setToMessages(true), 500);
    }
  })
  .catch(error => {
    alert(`Authorization failed \n ${error.response.data.message}`);
    let errorText = error;
    console.log(error.response.data.message)
    })
  }

  return (
    <div className={classes.main}>
      <RouterLink to='/' className={classes.link}>
        <CardHeader className={classes.back}
          action={
            <IconButton>
              <CardMedia className={classes.backIcon} component="img" src={Back} title="Back"/>
            </IconButton>
          }/>
      </RouterLink>
      <section className={classes.block}>
        <Container component="main" maxWidth="xs" className={classes.root}>
          <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <div className={classes.form} noValidate>
                <TextField
                  onChange={handleMailInputChange}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoFocus
                />
                <TextField
                  onChange={handlePassInputChange}
                  error = {error}
                  helperText = {helperText}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
                <Button
                  onClick={submitButton}
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                {toMessages ? <Redirect to="/messages/" /> : null}
                <Grid container>
                  <Grid item>
                    <RouterLink href="#" variant="body2" to="/signup/">
                      {"Don't have an account? Sign Up"}
                    </RouterLink>
                  </Grid>
                </Grid>
              </div>
            </div>
        </Container>
      </section>
    </div>
  );
}

export default SignIn;