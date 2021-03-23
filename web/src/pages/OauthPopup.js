import { TextInput, PlainButton } from '../components';
import { makeStyles } from '@material-ui/core';  
import React, { useState } from 'react';
import { Login } from './Login';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
  },
});

export function OauthPopup(props) {
  const classes = useStyles();
  const [state, setState] = useState();
  const {history} = props;

  return (
    <>
      <Login history={history} isOauth={true}  mode={'popup'}/>
    </>
  );
} 