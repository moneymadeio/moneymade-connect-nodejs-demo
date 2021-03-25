import React from 'react';
import { Login } from './Login';

export function OauthLogin(props) {
  return (
    <>
      <Login history={props.history} isOauth={true} />
    </>
  );
} 