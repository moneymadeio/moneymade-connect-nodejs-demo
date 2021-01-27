import { Button } from '@material-ui/core';

export function PlainButton(props) {
  return (<Button
    style={{
      width: '200px',
      marginTop: '5px',
    }}
    label='Login'
    variant='contained'
    color='primary'
    onClick={props.onClick}
  > 
    {props.label || ''}
  </Button>);
} 