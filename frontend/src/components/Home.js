import React, {useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Bg from '../images/bg.png';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  main: {
    width: '100%',
    height: '100hv',
    padding: 0,
    backgroundImage: `url(${Bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'fixed',
  },
  block: {
    width: '80%',
    height: '100hv',
    margin: 'auto',
    textAlign: 'center',
    backgroundColor: 'teal',
  },
  title: {
    marginTop: '1em',
    paddingTop: '1em',
    marginBottom: '1em',
  },
  link: {
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: '3em',
  },
  button: {
    margin: theme.spacing(10),
    fontSize: '0.5em',
  },
  paper: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    width: 280,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
  avatar: {
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'teal',
  },
  modalTitle: {
    marginLeft: '35%',
    marginTop: '2%',
  },
  margin: {
    margin: theme.spacing(1),
  },
  modalGrid: {
    width: 200,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Home = () => {
  const classes = useStyles();
  let [mail, setMail] = useState('');
  let [pass, setPass] = useState();
  let [helperText, setHelperText] = useState('');
  let [error, setError] = useState(false);
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

  const [open, setOpen] = useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
    };

  const submitButton =() => {
    axios.post('http://localhost:3030/authentication',{
    strategy : 'local',
    email: mail,
    password: pass,
    })
    .then(response => {
      if (response.status === 201) {
        setTimeout(() => setToMessages(true), 500);
      }
    })
    .catch(error => {
      alert(`Authorization failed \n ${error.response.data.message}`);
      })
    }

  return (
    <div className={classes.main}>
      <section className={classes.block}>
        <Typography variant="h1" component="h1" className={classes.title}>Welcome to Talkie</Typography>
        <Typography variant="h4" component="h2">Before you're gonna talk, you need to choose</Typography>
        <div>
        <RouterLink href="#" variant="body2" className={classes.link} onClick={handleOpen}><Button className={classes.button}>SIGN IN</Button></RouterLink>
        <Modal
          open={open}
          onClose={handleClose}
        >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar>
          <Typography variant="h6" component="p" id="modal-title" className={classes.modalTitle}>
            SIGN IN
          </Typography>
          <div className={classes.margin}>
            <Grid container spacing={1} alignItems="flex-end">
              <TextField
                onChange={handleMailInputChange}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email" 
                autoFocus />
            </Grid>
        </div>
        <div className={classes.margin} noValidate>
          <Grid container spacing={1} alignItems="flex-end">
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
              id="password" />
          </Grid>
        </div>
        <div className={classes.margin}>
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
        </div>
      </div>
      </Modal>
        <RouterLink href="#" variant="body2" className={classes.link} to="/signup/"><Button className={classes.button}>SIGN UP</Button></RouterLink>
      </div>
      </section>
    </div>
  )
}

export default Home;