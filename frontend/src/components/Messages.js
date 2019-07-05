import React, { useState, useEffect } from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {useCookies} from 'react-cookie';
import axios from 'axios';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';



const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width : '100%',
  },
  button: {
    margin: theme.spacing(1),
  },
  button_s: {
    margin: theme.spacing(1),
    float: 'right',
  },
  cards: {
    width : '80%',
    display: 'flex',
  },
  card:{
    maxWidth: '100%',
    width: '25%',
    minWidth: 250,
    margin:theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  link:{
    textDecoration: "none",
    color: 'black',
  },
  action : {
    display: 'flex',
    justifyContent: "flex-end",
  },
  content: {
    height: 150,
  }

}))

const Messages = () => {
  const classes = useStyles();
  const cookies = useCookies(['token']);
  let [users, setUsers] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({});
  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value});
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const handleOpen = () => {
    setOpen(true);
  };

  const HandleClose = () => {
    setOpen(false);
  };

  const createTime = (date) => {
    let mainTime = new Date(date);
    let string = `${monthNames[mainTime.getMonth()]} ${mainTime.getDate()}, ${mainTime.getFullYear()}`;
    return string;
  }

  useEffect(() => {
      axios.get('http://localhost:3000/messages', {
        'headers': {
          Authorization: cookies.token,
      }})
      .then(response => {
        setUsers(response.data.data);
      })
    }, [cookies.token])

  const refreshMessages = () => {
    axios.get('http://localhost:3000/messages', {
      'headers': {
        Authorization: cookies.token,
      }})
      .then(response => {
        setUsers(response.data.data);
      })
  }

  const deleteMessage = (id) => {
    axios.delete('http://localhost:3000/messages/'+ id, {
      'headers': {
        Authorization: cookies.token,
    }})
    .then(response => {
      alert('Message deleted');
      setTimeout(refreshMessages(), 3000);
    })
  }

  const createMessage = () => {
    axios.post('http://localhost:3000/messages', {
      text: values.message
    },
    {
      'headers': {
        Authorization: cookies.token,
      }
    }
    )
    .then(response => 
      HandleClose(),
      setValues(''),
      refreshMessages(),
      )
  }

  return (
    <div>
      <h2>Please, type your message</h2>
      <TextField
            label="Message"
            multiline
            rowsMax="4"
            value={values.message}
            onChange={handleChange('message')}
            className={classes.textField}
            margin="normal"
            id="simple-modal-description"
            />
      <Button variant="contained" color="primary" className={classes.button_s} onClick={createMessage}>
        Send
      </Button>
      <div className={classes.cards}>
        {users.map(i => (
        <Card className={classes.card} key={i.id}>
          <a to ={{pathname:`/message/${i.id}`}} className={classes.link}>
            <CardActionArea>
              <div>
                <Typography gutterBottom variant="subtitle1" component="h2">
                  Message
                </Typography>
              </div>
            <CardContent  className={classes.content}>
              <Typography gutterBottom variant="h5" component="h2">
                "{i.text}"
                </Typography>
                <Typography gutterBottom variant="body1" component="h2">
                  Created by {i.user.nickname}
                </Typography>
                <Typography gutterBottom variant="body1" component="h2">
                  on {createTime(i.createdAt)}
                </Typography>
            </CardContent>
            </CardActionArea>
            </a>
              <CardActions className={classes.action} >
                <IconButton
                aria-label="Delete"
                name={i.id}
                className={classes.button}
                onClick={()=>deleteMessage(i.id)} >
                </IconButton>
              </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Messages;