import React, { Component } from 'react';
import { AccountHttp, Address } from 'nem-library';
import nem from 'nem-sdk';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import logo from '../logo.png';
import '../App.css';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class App extends Component {
  state = {
    allTransactions: '',
    orderList: '',
    invoiceList: '',
    unconfirmedTransactionsList: '',
  };

  componentDidMount = () => {
    this.getTransaction();
  };

  componentDidUpdate = () => {
    this.getTransaction();
  };
  getTransaction = () => {
    const accountHttp = new AccountHttp();

    accountHttp
      .allTransactions(new Address(process.env.REACT_APP_ADDRESS), {
        pageSize: 20,
      })
      .subscribe(allTransactions => {
        const orderList = allTransactions.filter(transaction => {
          return orderList;
          // console.log('go: ' + JSON.stringify(transaction));
          // return (
          //   transaction.recipient.value ===
          //   process.env.REACT_APP_STEAMSTORE_ADDRESS
          // );
        });

        const invoiceList = allTransactions.filter(transaction => {
          return (
            transaction.signer.address.plain() ===
            process.env.REACT_APP_STEAMSTORE_ADDRESS
          );
        });

        this.setState({
          orderList: orderList,
          invoiceList: invoiceList,
        });
      });

    accountHttp
      .unconfirmedTransactions(new Address(process.env.REACT_APP_ADDRESS))
      .subscribe(x => {
        // console.log(x);
        this.setState({
          unconfirmedTransactionsList: x,
        });
      });
  };

  decryptMessage = payload => {
    let decryptMessage = nem.crypto.helpers.decode(
      process.env.REACT_APP_PRIVATE_KEY,
      process.env.REACT_APP_STEAMSTORE_PUBLIC_KEY,
      payload
    );

    decryptMessage = nem.utils.convert.hex2a(decryptMessage);

    return decryptMessage;
  };
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">History</h1>
        </header>

        {this.state.allTransactions !== '' ? (
          <div>
            <p>All transaction</p>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <CustomTableCell>Time</CustomTableCell>
                    <CustomTableCell numeric>Sender</CustomTableCell>
                    <CustomTableCell numeric>Receiver</CustomTableCell>
                    <CustomTableCell numeric>Message</CustomTableCell>
                    <CustomTableCell numeric>Amount</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.allTransactions.map((transaction, index) => {
                    return (
                      <TableRow className={classes.row} key={index}>
                        <CustomTableCell component="th" scope="row">
                          {/* {transaction.timeWindow.timeStamp} */}
                        </CustomTableCell>
                        <CustomTableCell>
                          {transaction.signer.address.plain()}
                        </CustomTableCell>
                        <CustomTableCell>
                          {transaction.recipient.value}
                        </CustomTableCell>
                        <CustomTableCell>
                          {transaction.message.isEncrypted()
                            ? this.decryptMessage(transaction.message.payload)
                            : nem.utils.convert.hex2a(
                                transaction.message.payload
                              )}
                        </CustomTableCell>
                        <CustomTableCell>
                          {transaction._xem.amount}
                        </CustomTableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </div>
        ) : (
          ''
        )}

        {this.state.unconfirmedTransactionsList !== '' ? (
          <div>
            <p>Unconfirmed transaction</p>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <CustomTableCell>Message</CustomTableCell>
                    <CustomTableCell>Amount</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.unconfirmedTransactionsList.map(
                    (transaction, index) => {
                      return (
                        <TableRow className={classes.row} key={index}>
                          <CustomTableCell>
                            {transaction.message.isEncrypted()
                              ? this.decryptMessage(transaction.message.payload)
                              : nem.utils.convert.hex2a(
                                  transaction.message.payload
                                )}
                          </CustomTableCell>
                          <CustomTableCell>
                            {transaction._xem.amount}
                          </CustomTableCell>
                        </TableRow>
                      );
                    }
                  )}
                </TableBody>
              </Table>
            </Paper>
          </div>
        ) : (
          ''
        )}

        {this.state.orderList !== '' ? (
          <div>
            <p>Order transaction</p>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <CustomTableCell>Tx</CustomTableCell>
                    <CustomTableCell>Message</CustomTableCell>
                    <CustomTableCell>Amount</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.orderList.map((transaction, index) => {
                    return (
                      <TableRow className={classes.row} key={index}>
                        <CustomTableCell>
                          <a
                            target="_blank"
                            href={`http://bob.nem.ninja:8765/#/transfer/${
                              transaction.transactionInfo.hash.data
                            }`}
                          >
                            {transaction.transactionInfo.hash.data}
                          </a>
                        </CustomTableCell>
                        <CustomTableCell>
                          {transaction.message.isEncrypted()
                            ? this.decryptMessage(transaction.message.payload)
                            : nem.utils.convert.hex2a(
                                transaction.message.payload
                              )}
                        </CustomTableCell>
                        <CustomTableCell>
                          {transaction._xem.amount}
                        </CustomTableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </div>
        ) : (
          ''
        )}

        {this.state.invoiceList !== '' ? (
          <div>
            <p>invoice transaction</p>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <CustomTableCell>Tx</CustomTableCell>
                    <CustomTableCell numeric>Message</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.invoiceList.map((transaction, index) => {
                    return (
                      <TableRow className={classes.row} key={index}>
                        <CustomTableCell component="th" scope="row">
                          <a
                            target="_blank"
                            href={`http://bob.nem.ninja:8765/#/transfer/${
                              transaction.transactionInfo.hash.data
                            }`}
                          >
                            {transaction.transactionInfo.hash.data}
                          </a>
                        </CustomTableCell>
                        <CustomTableCell>
                          {transaction.message.isEncrypted()
                            ? this.decryptMessage(transaction.message.payload)
                            : nem.utils.convert.hex2a(
                                transaction.message.payload
                              )}
                        </CustomTableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
