import React, {Component} from 'react';
import Feed from './feedComponent';
//import { Navbar, NavbarBrand } from 'reactstrap';
import { connect } from 'react-redux';

import Header from './headerComponent';
import RenderPostForm from './postComponent';
import ItemDetail from './commentComponent';


import { loginUser, logoutUser, fetchFeed, postGif, fetchImageAndComments } from '../redux/ActionCreators';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';



const mapStateToProps = state => {
    return {
      auth: state.auth,
      feed: state.feeds,
      gif: state.gif,
      item: state.item
    }
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  fetchFeed: () => {dispatch(fetchFeed())},
  postGif: (title, file) => dispatch(postGif(title, file)),
  fetchImageAndComments: (itemid) => dispatch(fetchImageAndComments(itemid))
 });

class Main extends Component {

  componentDidMount(){
    this.props.fetchFeed();
    //this.props.fetchImageAndComments(55);
    console.log('Component DID MOUNT!')
  }

 /* componentWillMount() {
      console.log('Component WILL MOUNT!')
   }
   
   componentWillReceiveProps(newProps) {    
      console.log('Component WILL RECIEVE PROPS!')
   }
   shouldComponentUpdate(newProps, newState) {
      return true;
   }
   componentWillUpdate(nextProps, nextState) {
      console.log('Component WILL UPDATE!');
   }
   componentDidUpdate(prevProps, prevState) {
      console.log('Component DID UPDATE!', this.props.gif.data)
   }
   componentWillUnmount() {
      console.log('Component WILL UNMOUNT!')
   }*/

  render() {

    const ItemWithId = ({match}) => {
      return(
        
        <ItemDetail item={this.props.item.item.data.filter((data) => data.itemid === match.params.itemid)[0]}
          isLoading={this.props.item.isLoading}
          errMess={this.props.item.errMess}
          />
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
            <Route path='/home' component={()=> <Feed feeds={this.props.feed} fetchImageAndComments={this.props.fetchImageAndComments} />} />
            <Route path="/home/:itemid" component={ItemWithId} />
            <Redirect to="/home" />
        </Switch>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
