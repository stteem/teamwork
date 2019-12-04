import React, {Component} from 'react';
import Feed from './feedComponent';
//import { Navbar, NavbarBrand } from 'reactstrap';
import { connect } from 'react-redux';

import Header from './headerComponent';
import RenderPostForm from './postComponent';

import { loginUser, logoutUser, fetchFeed, postGif } from '../redux/ActionCreators';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';



const mapStateToProps = state => {
    return {
      auth: state.auth,
      feed: state.feeds,
      gif: state.gif
    }
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  fetchFeed: () => {dispatch(fetchFeed())},
  postGif: (title, file) => dispatch(postGif(title, file))
 });

class Main extends Component {

  componentDidMount(){
    this.props.fetchFeed();
  }

  render() {

    const HomePage = () => {
      return(
        <Feed feeds={this.props.feed} />
      );
    }

    return (
      <div /*className="App"*/>
        <Header auth={this.props.auth} 
          loginUser={this.props.loginUser} 
          logoutUser={this.props.logoutUser}
          />
        <RenderPostForm postGif={this.props.postGif} />
        <Switch>
              <Route path='/home' component={HomePage} />
              <Redirect to="/home" />
          </Switch>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
