import React, {Component} from 'react';
import PersistentDrawer from './drawers.js';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import SignUp from './SignUp.js';
import SignIn from './SignIn.js';
import User from './User.js';
import {connect} from 'react-redux';
import './App.css';
class App extends Component {
  render() {
    return (<div className="App">
      <Router>
        <div>
      <PersistentDrawer>
        <Route
            exact
            path="/"
            render={() => <Redirect to="/User" />}
          />
            <Route exact path="/SignIn" component={SignIn}/>
            <Route exact path="/SignUp" component={SignUp}/>
            <Route exact path="/User" component={User} />
      </PersistentDrawer>
      </div>
    </Router>

    </div>);
  }

}
export default connect(state => ({state: state}), {})(App);
