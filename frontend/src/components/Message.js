import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

import Bg from '../images/bg.png';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  '@global': {
    body: {
      backgroundColor: 'teal',
      backgroundImage: `url(${Bg})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom',
      backgroundSize: 'contain',
    },
  },
  main: {
    width: '100%',
    height: '100hv',
    padding: 0,
  },
  card: {
    margin: 50,
    maxWidth: '100%',
    width: '80%',
    minWidth: 250,
    height: 500,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  media: {
    height: 140,
  },
  content: {
    height: 300,
  },
  id: {
    paddingBottom: '6em',
  },
  date: {
    paddingTop: '8em',
  },
  action: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingTop: '6em',
  }
});


const Message = ({match}) => {
  const classes = useStyles();
  const [cookies] = useCookies(['token']);
  let [users, setUsers] = useState([]);
  let [message, setMessage] = useState([]);
  let messageId = match.params.id;

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


  const CreateTime = (date) => {
    let mainTime = new Date(date);
    let string = ` ${monthNames[mainTime.getMonth()]} ${mainTime.getDate()}, ${mainTime.getFullYear()}`;
    return string;
  }

  useEffect(()=> {
      axios.get ('http://localhost:3030/messages/' + messageId,{
    'headers': {
      
    Authorization: cookies.token,
  }})
  .then(response => {
    setMessage(response.data);
    })
  }, [])

  useEffect(()=> {
    axios.get ('http://localhost:3030/messages', {
  'headers': {
  Authorization: cookies.token,
}})
.then(response => {
    setUsers(response.data.data);
  })
}, [cookies.token])


const refreshMessages = () => {
  axios.get ('http://localhost:3030/messages', {
'headers': {
Authorization: cookies.token,
}})
.then(response => {
  setUsers(response.data.data);
})
}

const deleteMessage = (id) => {
  axios.delete ('http://localhost:3030/messages/'+ id, {
  'headers': {
  Authorization: cookies.token,
}})
.then(response => {
  setTimeout(refreshMessages(), 1000);
  })
}


  return (
    <Container component="main" className={classes.main}>
      <Card className={classes.card}>
        <CardActionArea key={message.id} >
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="subtitle1" component="h2" className={classes.id}>
              talk #{message.id}
            </Typography>
            <Typography variant="h5" component="h2">
              - {message.text}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.date}>
              Created on {CreateTime(message.updatedAt)}
            </Typography>
          </CardContent>
          <CardActions className={classes.action} >
            <IconButton aria-label="Add to favorites" aria-label="Show more">
              <FavoriteIcon />
            </IconButton>
            <RouterLink to ='/messages/' className={classes.link} onClick={()=>refreshMessages()}>
              <IconButton aria-label="Delete" name={message.id} className={classes.button} onClick={()=>deleteMessage(message.id)} >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </RouterLink>
          </CardActions>
        </CardActionArea>
      </Card>
    </Container>
  );
}

export default Message;