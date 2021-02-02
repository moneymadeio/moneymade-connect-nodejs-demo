import { TextInput, PlainButton } from '../components';
import { makeStyles } from '@material-ui/core';  
import React, { useState } from 'react';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
  },
});

export function Login(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    buttonDisabled: true,
    usernameLenght: 0,
    passwordLenght: 0, 
  });

  const target = props.isOauth
    ? `/loading/${window.location.search}`
    : '/dashboard';

  const onClick = () => {
    const query = new URLSearchParams(window.location.search);
    const payload = query.get('payload');
    const signature = query.get('signature');
  
    if (payload && signature) {
      window.fetch(
        '/signin/oauth',
        {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ payload, signature }),
        },
      )
      .then(res => res.json())
      .then(res => {
        if (res.status === 'OK') {
          // window.location = 'https://moneymade.io/dashboard/portfolio';
        }
      })
    }
  
    props.history.push(target)
  };
  
  return (<div className={classes.root}>
    <img
      src='/platform-logo.png'
      width='200px'
      alt='platform logo'  
    />
    <p align='center'>
      Login to the best Trading Portal 
    </p>
    <TextInput label='Username'/>
    <TextInput label='Password' type='password'/>
    <PlainButton label='Login' onClick={onClick}/>
  </div>);
} 