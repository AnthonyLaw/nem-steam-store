import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link, Route, Switch } from 'react-router-dom';
import { NEMLibrary, NetworkTypes } from 'nem-library';
import Historypage from './History';
import Accountpage from './Account';
import Homepage from './Home';
import './App.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  rightMenu: {
    flexGrow: 1,
    textAlign: 'right',
  },
});

// Initialize NEMLibrary for TEST_NET Network
NEMLibrary.bootstrap(NetworkTypes.TEST_NET);

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="title" color="inherit">
                NEM Steam Store
              </Typography>

              <div className={classes.rightMenu}>
                <Button color="inherit" component={Link} to="/">
                  Store
                </Button>
                <Button color="inherit" component={Link} to="/history">
                  History
                </Button>
                <Button color="inherit" component={Link} to="/account">
                  Account
                </Button>
              </div>
            </Toolbar>
          </AppBar>
        </div>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/history" component={Historypage} />
          <Route path="/account" component={Accountpage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
