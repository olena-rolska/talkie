import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Image from '../images/speech-bubble.png';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    height: 'calc(100vh - 50px)',
    width: '100%',
    maxWidth: '100%',
    backgroundImage: `url(${Image})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    },
  card: {
    margin: 50,
    maxWidth: '100%',
    width: '25%',
    minWidth: 250,
    height: 300,
  },
  media: {
    height: 140,
  },
  content: {
    height: 300,
  },
  date: {
    margin: 20,
  }
});

const Message = ({match}) => {
  const classes = useStyles();
  const [cookies] = useCookies(['token']);
  let [message, setMessage] = React.useState([]);
  // let messageId = match.params.id;


  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


  const CreateTime = (date) => {
    let mainTime = new Date(date);
    let string = ` ${monthNames[mainTime.getMonth()]} ${mainTime.getDate()}, ${mainTime.getFullYear()}`;
    return string;
  }

  // useEffect(()=> {
  //   axios.get ('http://localhost:3030/messages/' + messageId,{
  // 'headers': {
  //   Authorization: cookies.token,
  // }})
  // .then(response => {
  //   console.log(response.data)
  //   setMessage(response.data);
  // })
  // }, [])

  return (
    <Container component="main" className={classes.root}>
    <CssBaseline />
    <Card className={classes.card}>
      <CardActionArea key={message.id} >
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="subtitle1" component="h2">
            Message #{message.id}
          </Typography>
          <Typography variant="h5" component="h2">
            "{message.text}"
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.date}>
            Created on {CreateTime(message.updatedAt)}
          </Typography>
        </CardContent>
      </CardActionArea>

    </Card>
      </Container>
  );
}

export default Message;