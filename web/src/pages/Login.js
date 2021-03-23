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
  const onClick = () => {
    const query = new URLSearchParams(window.location.search);
    const payload = query.get('payload');
    const oauthSignature = query.get('signature');
  
    if (payload && oauthSignature) {
      window.fetch(
        '/signin/oauth',
        {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ payload, oauthSignature }),
        },
      )
      .then(res => res.json())
      .then(res => {
        const message = {
          status: res.status === 'OK' ? 'OK' : 'FAILED',
        };

        if (props.mode === 'popup') {
          window.opener.postMessage(message, '*');
        } else {
          window.parent.postMessage(message, '*');
        }
      })
    } else {
      props.history.push('/dashboard');
    }
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