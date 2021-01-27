import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { TransactionList } from './TransactionList';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '20%',
    maxWidth: 345,
    margintTop: '1%',
    marginBottom: '1%',
    marginRight: '2%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export function AccountCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { account } = props;
  const { official_name, name, balances } = account;
  const accountName = official_name || name;
  const avatarLetter = accountName[0];

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const cardStyle = {};

  if (!expanded) {
    cardStyle.maxHeight = '370px';
  }

  return (
    <Card
      className={classes.root}
      style={cardStyle}
    >
      <CardHeader
        avatar={
          <Avatar aria-label='recipe'>
            {avatarLetter.toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={accountName}
        subheader={new Date().toLocaleDateString()}
      />
      <CardMedia
        className={classes.media}
        image={`https://loremflickr.com/320/240/finance?check=${Date.now()}`}
        title="Paella dish"
      />
      <CardContent>
        <Typography  component="p">
          Balance: {balances.current} {balances.iso_currency_code}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Type: {account.type}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        Transactions
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <TransactionList transactions={account.transactions} />
        </CardContent>
      </Collapse>
    </Card>
  );
}
