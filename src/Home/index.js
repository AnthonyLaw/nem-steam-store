import React, { Component } from 'react';
import gamelist from '../Const';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import {
  Address,
  XEM,
  Account,
  TransferTransaction,
  TimeWindow,
  PlainMessage,
  TransactionHttp,
} from 'nem-library';
import '../App.css';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  card: {
    maxWidth: 345,
    padding: 10,
    margin: 5,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

class Home extends Component {
  state = {
    snackBarStatus: false,
    snackbarMsg: '',
  };
  handleClose = reason => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snackBarStatus: false });
  };
  onhandlePurchase = game => {
    const transactionHttp = new TransactionHttp();

    const account = Account.createWithPrivateKey(
      process.env.REACT_APP_PRIVATE_KEY
    );

    let order = `{"gamecode":"${game.code}"}`;

    const transferTransaction = TransferTransaction.create(
      TimeWindow.createWithDeadline(),
      new Address(process.env.REACT_APP_STEAMSTORE_ADDRESS),
      new XEM(game.info.price),
      PlainMessage.create(order)
    );

    const signedTransaction = account.signTransaction(transferTransaction);

    transactionHttp.announceTransaction(signedTransaction).subscribe(x => {
      console.log(x);
      let snackbarMsg = `Thank you Purchase ${
        game.name
      } please wait for confirmation`;

      if (x.message === 'SUCCESS') {
        this.setState({
          snackBarStatus: true,
          snackbarMsg: snackbarMsg,
        });
      } else {
        alert(x.message);
      }
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        {gamelist.map((game, index) => {
          return (
            <Card className={classes.card} key={index}>
              <CardMedia
                className={classes.media}
                image={game.info.url}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  {game.name}
                </Typography>
                <Typography component="p">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                  natoque penatibus et magnis dis parturient montes, nascetur
                  ridiculus mus.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => this.onhandlePurchase(game)}
                >
                  {game.info.price} Xem
                </Button>
                <Button size="small" color="primary">
                  Buy with SteamToken (comming Soon)
                </Button>
              </CardActions>
            </Card>
          );
        })}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snackBarStatus}
          autoHideDuration={3000}
          message={<span>{this.state.snackbarMsg}</span>}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Home);
