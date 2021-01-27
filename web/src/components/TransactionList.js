import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export function TransactionList(props) {
  const classes = useStyles();
  const { transactions } = props;

  return (
    <List className={classes.root}>
      {
        transactions.map((transaction, index) => {
          const { amount, type } = transaction;
          const isDebit = !amount.startsWith('-');
          const date = new Date(transaction.date).toLocaleDateString();
          const description = `${type}: ${isDebit ? '+': ''}${amount}$`;

          return (<ListItem key={index}>
            <ListItemAvatar>
              <Avatar>
                {
                  isDebit
                    ? <TrendingUpIcon style={{ color: green[500] }} />
                    : <TrendingDownIcon color='secondary'/>
                }
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={description} secondary={date} />
          </ListItem>)
        })
      }
    </List>
  );
}