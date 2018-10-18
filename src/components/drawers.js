import React from 'react';
import classNames from 'classnames';
import './App.css';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import {BrowserRouter as Router} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import compose from 'recompose/compose';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {getUserData,verifyUser} from '../actions/actions.js';
import {mailFolderListItems, otherMailFolderListItems} from './tileData';
import {connect} from 'react-redux';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appFrame: {
    height: '100vh',
    zIndex: 0,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%'
  },
  appBar: {
    backgroundColor: "#2196f3",
    position: 'absolute',
    transition: theme.transitions.create([
      'margin', 'width'
    ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create([
      'margin', 'width'
    ], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  'appBarShift-left': {
    marginLeft: drawerWidth
  },
  'appBarShift-right': {
    marginRight: drawerWidth
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  menuInfo: {
    width: '60%',
    marginRight:'20px',
    textAlign: "end"
  },
  menuLogo: {
    width: '40%',
    textAlign: "start"
  },
  hide: {
    display: 'none'
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth
  },
  drawerHeader: {
    color: 'blue',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  'content-left': {
    marginLeft: -drawerWidth
  },
  'content-right': {
    marginRight: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  'contentShift-left': {
    marginLeft: 0
  },
  'contentShift-right': {
    marginRight: 0
  }
});

class PersistentDrawer extends React.Component {
  state = {
    open: false,
    anchor: 'left'
  };
  handleDrawerOpen = () => {
    this.setState({open: true});
  };

  handleDrawerClose = () => {
    this.setState({open: false});
  };
// Log Out
  handleLogOut = () => {
      this.props.getUserData(null);
      this.props.verifyUser({auth:false,verifyLogin:null,verifyToken:null});
      let regForm = JSON.stringify({auth:false,verifyLogin:null,verifyToken:null});
      localStorage.setItem('regForm', regForm);
  };
// Log Out
  render() {
    const {classes, theme} = this.props;
    const {anchor, open} = this.state;

    const drawer = (<Drawer variant="persistent" anchor={anchor} open={open} classes={{
        paper: classes.drawerPaper
      }}>
      <div className={classes.drawerHeader}>
        <IconButton onClick={this.handleDrawerClose}>
          {
            theme.direction === 'rtl'
              ? <ChevronRightIcon/>
              : <ChevronLeftIcon/>
          }
        </IconButton>
      </div>
      <Divider/>
      <List>{mailFolderListItems}</List>
      <Divider/>
      <List>{otherMailFolderListItems}</List>
    </Drawer>);

    let before = null;
    let after = null;

    if (anchor === 'left') {
      before = drawer;
    } else {
      after = drawer;
    }
    return (
        <Router>
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-${anchor}`]]: open
            })} style={{height:"65px"}}>
            <Toolbar disableGutters={!open}>
              <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerOpen} className={classNames(classes.menuButton, open && classes.hide)}>
                <MenuIcon/>
              </IconButton>
              <Typography className={classes.menuLogo} variant="title" color="inherit" noWrap>
                  Auth form
              </Typography>

              <Typography className={classes.menuInfo} variant="title" color="inherit" noWrap>
                {this.props.state.allState.userVerify.auth?(this.props.state.allState.userVerify.verifyLogin):("Гость")}
              </Typography>
              {this.props.state.allState.userVerify.auth?<button type="button" onClick={this.handleLogOut} className="btn btn-danger">Выход</button>:null}
            </Toolbar>
          </AppBar>
          {before}
          <main className={classNames(classes.content, classes[`content-${anchor}`], {
              [classes.contentShift]: open,
              [classes[`contentShift-${anchor}`]]: open
            })}>
            <div className={classes.drawerHeader}/>
            <div className="apps">{this.props.children}</div>
          </main>
          {after}
        </div>
      </div>
      </Router>
    );
  }
}
export default compose(withStyles(styles, {withTheme: true}), connect(state => ({state: state}), {getUserData,verifyUser}))(PersistentDrawer);
