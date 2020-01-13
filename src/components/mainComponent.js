import React, {Component} from 'react';
import Feed from './feedComponent';
//import { Navbar, NavbarBrand } from 'reactstrap';
import { connect } from 'react-redux';

import Header from './headerComponent';
import RenderPostForm from './postImageComponent';
import ItemDetail from './itemAndCommentComponent';


import { loginUser, logoutUser, fetchFeed, postGif, fetchImageAndComments, postComment } from '../redux/ActionCreators';
import { Switch, Route, Redirect, matchPath, withRouter } from 'react-router-dom';



const mapStateToProps = state => {
    return {
      auth: state.auth,
      feed: state.feeds,
      gif: state.gif,
      item: state.item,
      comment: state.comment
    }
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  fetchFeed: () => {dispatch(fetchFeed())},
  postGif: (title, file) => dispatch(postGif(title, file)),
  fetchImageAndComments: (itemid) => dispatch(fetchImageAndComments(itemid)),
  postComment: (itemId, comment) => dispatch(postComment(itemId, comment))
 });






class Main extends Component {

  componentDidMount(){

    this.props.fetchFeed();

    this.getIdParamAndFetch();
    
    console.log('Component DID MOUNT!')

  }

  

  async getIdParamAndFetch() {

    const match = matchPath(this.props.history.location.pathname, {
      path: '/item/:itemid',
      exact: true,
      strict: false
    }) 

    if (match != null) {

     await this.props.fetchImageAndComments(match.params.itemid);
      console.log('Got param!')
    }
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

    const ItemWithId = () => {
      return(
        
        <ItemDetail item={this.props.item}
          isLoading={this.props.item.isLoading}
          errMess={this.props.item.errMess}
          comments={this.props.item}
          itemid={this.props.item}
          postComment={this.props.postComment}
          comment={this.props.item}
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
            <Route path='/home' component={() => <Feed feeds={this.props.feed} fetchImageAndComments={this.props.fetchImageAndComments} />} />
            <Route path="/item/:itemid" component={ItemWithId} />
            <Redirect to="/home" />
        </Switch>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
