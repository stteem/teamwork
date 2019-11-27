import React, {Component} from 'react';
import Feed from './homeComponent';
//import { Navbar, NavbarBrand } from 'reactstrap';
import { connect } from 'react-redux';

import Header from './headerComponent';

import { loginUser, logoutUser, fetchFeed } from '../redux/ActionCreators';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';



const mapStateToProps = state => {
    return {
      auth: state.auth,
      feed: state.feeds
    }
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  fetchFeed: () => {dispatch(fetchFeed())},
 });

class Main extends Component {

  componentDidMount(){
    this.props.fetchFeed();
  }

  render() {

    const HomePage = () => {
      return(
        <Feed feeds={this.props.feed}/>
      );
    }

    return (
      <div /*className="App"*/>
        <Header auth={this.props.auth} 
          loginUser={this.props.loginUser} 
          logoutUser={this.props.logoutUser}
          />
        <Switch>
              <Route path='/home' component={HomePage} />
              <Redirect to="/home" />
          </Switch>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
