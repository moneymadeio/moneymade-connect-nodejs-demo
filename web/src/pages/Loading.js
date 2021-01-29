import { CircularProgress } from '@material-ui/core';

export function Loading() {
  const query = new URLSearchParams(window.location.search);
  const info = query.get('info');
  const signature = query.get('signature');

  if (info && signature) {
    setTimeout(
      () => {
        fetch(
          '/signin/oauth',
          {
            method: 'POST',
            headers: { ['Content-type']: 'application/json' },
            body: JSON.stringify({ info, signature }),
          },
        )
        .then(res => res.json())
        .then(res => {
          if (res.status === 'OK') {
            window.location = 'https://moneymade.io/dashboard/portfolio';
          }
        })
      },
      2000,
    );
  }

  return (<div className='Centered'>
    <CircularProgress
      style={{ marginTop: '20px' }}
    />
  </div>);
}