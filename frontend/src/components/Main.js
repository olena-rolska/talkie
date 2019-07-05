import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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

const Main = () => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <h1>Talkie</h1>
      <Button size="small" component={Link} to={`/messages/`}/>Go to messages<Button/>
    </div>
  )
}

export default Main;