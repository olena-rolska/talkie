import React, {useState, useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import Bg from '../images/bg.png';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
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
    backgroundSize: 'fixed',
  },
  fab: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    textDecoration: "none",
    color: 'black',
  },
  link: {
    textDecoration: "none",
    color: 'black',
  },
  cards: {
    width : '80%',
    display: 'flex',
  },
  card:{
    maxWidth: '40%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '4%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  action : {
      display: 'flex',
      justifyContent: "space-around",
  },
  button: {
    margin: theme.spacing(5),
    fontSize: '1em',
    background: 'white',

  },
  button_s: {
    margin: theme.spacing(1),
    float: 'right',
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  margin: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  paper: {
    position: 'absolute',
    top: "35%",
    left: "35%",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width : '100%',
  },
  content: {
    height: 150,
  }
}));

const Message = () => {
  const classes = useStyles();
  const [cookies] = useCookies(['token']);
  let [users, setUsers] = useState([]);
  const [open, setOpen] = React.useState(false);

  const [values, setValues] = React.useState({});

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleOpen = () => {
      setOpen(true);
    };

  const handleClose = () => {
      setOpen(false);
    };

  const createTime = (date) => {
    let mainTime = new Date(date);
    let string = ` ${monthNames[mainTime.getMonth()]} ${mainTime.getDate()}, ${mainTime.getFullYear()}`;
    return string;
  }


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
    setTimeout(refreshMessages(), 3000);
    })
  }

  const createMessage =() => {
    axios.post('http://localhost:3030/messages',{
    text: values.message
  },
  {
    'headers': {
      Authorization: cookies.token,
      }
    }
  )
  .then(response =>
    handleClose(),
    setValues(''),
    refreshMessages(),
  )
  }

  return (
    <div className={classes.main}>
      <RouterLink href="#" variant="body2" className={classes.fab} onClick={handleOpen}><Button className={classes.button} size='large' color='grey'>Talk</Button></RouterLink>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        >
        <div className={classes.paper}>
          <Fab size="small" color="teal" aria-label="Close" className={classes.margin} onClick={handleClose}>
            X
          </Fab>
          <Typography variant="h6" id="modal-title"> What do you think about?</Typography>
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
          <Button variant="contained" color="primary" className={classes.button_s} onClick={createMessage}>➤</Button>
        </div>
      </Modal>

      <div className = "cards">
        {users.map(i => (
        <Card className={classes.card} key={i.id}>
          <RouterLink to ={{pathname:`/message/${i.id}`}} className={classes.link}>
            <CardActionArea>
              <CardContent  className={classes.content}>
                <Typography gutterBottom variant="h5" component="h2">
                  - {i.text}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="h2">
                    {i.user.nickname}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="h2">
                    {createTime(i.createdAt)}
                  </Typography>
              </CardContent>
            </CardActionArea>
          </RouterLink>
          <CardActions className={classes.action} >
            <IconButton aria-label="Add to favorites" aria-label="Show more">
              <FavoriteIcon />
            </IconButton>
            <IconButton
            aria-label="Delete"
            name={i.id}
            className={classes.button}
            onClick={()=>deleteMessage(i.id)} >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </CardActions>
      </Card>
      ))}
    </div>
  </div>
  );
}

export default Message;