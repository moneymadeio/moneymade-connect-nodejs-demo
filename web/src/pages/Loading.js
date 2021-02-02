import { CircularProgress } from '@material-ui/core';

export function Loading() {
  return (<div className='Centered'>
    <CircularProgress
      style={{ marginTop: '20px' }}
    />
  </div>);
}