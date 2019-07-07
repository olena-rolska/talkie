import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Bg from '../images/bg.png';

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
    backgroundColor: '#39523b',
    
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
  input: {
    display: 'none',
  },
}))

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <section className={classes.block}>
        <Typography variant="h1" component="h1" className={classes.title}>Welcome to Talkie</Typography>
        <Typography variant="h4" component="h2" className={classes.text}>Before you're gonna talk, you need to choose</Typography>
        <RouterLink href="#" variant="body2" to="/signup/" className={classes.link}><Button className={classes.button}>SIGN UP</Button></RouterLink>
        <RouterLink href="#" variant="body2" to="/signin/" className={classes.link}><Button className={classes.button}>SIGN IN</Button></RouterLink>
      </section>
    </div>
  )
}

export default Home;