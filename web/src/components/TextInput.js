import { TextField } from '@material-ui/core';

export function TextInput(props) {
  return (
    <TextField
      variant='outlined'
      type={props.type ? props.type : 'text'}
      label={props.label}
      defaultValue='user@mail.com'
      style={{
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '200px',
        marginTop: '8px',
      }}
    >
    </TextField>
  );
} 