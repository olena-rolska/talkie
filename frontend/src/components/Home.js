import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  header: {
    height: '100hv',
    color: 'red',
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: 50,
    marginTop: 50,
    alignSelf: 'flex-end'
  },
  link: {
    textDecoration: 'none',
  }
}))

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <h1>Welcome to Talkie</h1>
      <h2>Before you gonna talk, you need to choose</h2>
      <RouterLink href="#" variant="body2" to="/signup/">
        Sign up
      </RouterLink>
      <RouterLink href="#" variant="body2" to="/signin/">
        Sign in
      </RouterLink>
    </div>
  )
}

export default Home;