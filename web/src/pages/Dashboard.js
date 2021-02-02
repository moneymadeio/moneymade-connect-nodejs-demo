import { useState } from 'react';
import { Loading } from '../pages/Loading';
import { AccountCard, AppBar } from '../components';
import { makeStyles, Typography, Paper } from '@material-ui/core';

const useStyles = makeStyles({
  accounts: {
    padding: '1%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
  },
  paper: {
    marginTop: '2%',
    width: '90%',
    marginRight: 'auto',
    marginLeft: 'auto',
  }
});

export function Dashboard() {
  const classes = useStyles();
  const [state, setState] = useState({ user: null });
  const { user } = state;

  if (!user) {
    setTimeout(() => {
      fetch('/user/me')
      .then(res => res.text())
      .then(res => {
        setState({ user: JSON.parse(res) });
      });
    }, 2000);

    return (<><AppBar/><Loading /></>);
  }

  const accountGroups = user.accounts.reduce(
    (acc, account) => {
      const lastIndex = acc.length - 1;
      const last = acc[lastIndex];

      if (last.length < 4) {
        last.push(account);
      } else {
        acc.push([account]);
      }

      return acc;
    },
    [[]],
  );

  return (<>
    <AppBar />
    <Paper className={classes.paper}>
      <Typography align='center'>
        Your accounts are here:
      </Typography>
      {
        accountGroups.map((group, gIndex) => (
          <div key={gIndex} className={classes.accounts}>
            {
              group.map((account, aIndex) => (
                <AccountCard account={account} key={aIndex} />
              ))
            }
          </div>
        ))
      }
    </Paper>
  </>);
}