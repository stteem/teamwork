import React, {Component} from 'react';
import Feed from './feedComponent';
import { connect } from 'react-redux';

import Header from './headerComponent';
//import RenderPostForm from './postImageAndArticleComponent';
import ItemDetail from './itemAndCommentComponent';
import ArticleDetail from './articleAndCommentComponent';
import Login from './loginComponent';
import CreateUser from './createUserComponent';
import About from './aboutComponent';
import { actions } from 'react-redux-form';

import { loginUser, logoutUser, fetchFeed, postGif, fetchImageAndComments, postImageComment,
         postArticle, fetchArticleAndComments, postArticleComment, updateArticle, updatePostedArticle, 
         deleteImage, deleteArticle, deletePostedArticle, deletePostedImage, postNewUser } from '../redux/ActionCreators';
import { Switch, Route, Redirect, matchPath, withRouter } from 'react-router-dom';



const mapStateToProps = state => {
    return {
      auth: state.auth,
      feed: state.feeds,
      item: state.item,
      article: state.article,
      createduser: state.createduser
    }
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  fetchFeed: () => {dispatch(fetchFeed())},
  postGif: (title, file) => dispatch(postGif(title, file)),
  fetchImageAndComments: (itemid) => dispatch(fetchImageAndComments(itemid)),
  postImageComment: (itemid, comment) => dispatch(postImageComment(itemid, comment)),
  postArticle: (title, text) => dispatch(postArticle(title, text)),
  fetchArticleAndComments: (articleid) => dispatch(fetchArticleAndComments(articleid)),
  postArticleComment: (articleid, comment) => dispatch(postArticleComment(articleid, comment)),
  updateArticle: (itemid, title, article) => dispatch(updateArticle(itemid, title, article)),
  updatePostedArticle: (itemid, title, article) => dispatch(updatePostedArticle(itemid, title, article)),
  deleteImage: (itemid) => dispatch(deleteImage(itemid)),
  deleteArticle: (itemid) => dispatch(deleteArticle(itemid)),
  deletePostedArticle: (itemid) => dispatch(deletePostedArticle(itemid)),
  deletePostedImage: (itemid) => dispatch(deletePostedImage(itemid)),
  postNewUser: (values) => dispatch(postNewUser(values)),
  resetCreateUserForm: () => { dispatch(actions.reset('reguser'))}
 });






class Main extends Component {

  componentDidMount(){

    this.props.fetchFeed();

    this.getIdParamAndFetchImage();
    this.getIdParamAndFetchArticle();

    console.log('Component DID MOUNT!')

  }

  
  //On page reload, this function supplys image ID to the endpoint
  async getIdParamAndFetchImage() {

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

  //On page reload, this function supplys article ID to the endpoint
  async getIdParamAndFetchArticle() {

    const match = matchPath(this.props.history.location.pathname, {
      path: '/article/:itemid',
      exact: true,
      strict: false
    }) 

    if (match != null) {

     await this.props.fetchArticleAndComments(match.params.itemid);
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
          postImageComment={this.props.postImageComment}
          comment={this.props.item}
          />
      );
    }

    const ArticleWithId = () => {
      return(
        
        <ArticleDetail article={this.props.article}
          isLoading={this.props.article.isLoading}
          errMess={this.props.article.errMess}
          comments={this.props.article}
          articleid={this.props.article}
          postArticleComment={this.props.postArticleComment}
          comment={this.props.article}
          />
      );
    }


    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.auth.isAuthenticated
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/login',
              state: { from: props.location }
            }} />
      )} />
    );
    

    return (
      <div /*className="App"*/>
        <Header auth={this.props.auth} 
          loginUser={this.props.loginUser} 
          logoutUser={this.props.logoutUser}
          />
        
        <Switch>
            <Route path='/login' component={() => <Login auth={this.props.auth} loginUser={this.props.loginUser} logoutUser={this.props.logoutUser}/>} />
            <PrivateRoute path='/home' component={() => <Feed feeds={this.props.feed} fetchImageAndComments={this.props.fetchImageAndComments} 
                                                  fetchArticleAndComments={this.props.fetchArticleAndComments} auth={this.props.auth}
                                                  updateArticle={this.props.updateArticle} deleteImage={this.props.deleteImage} 
                                                  deleteArticle={this.props.deleteArticle} postGif={this.props.postGif} postArticle={this.props.postArticle}
                                                  updatePostedArticle={this.props.updatePostedArticle} deletePostedArticle={this.props.deletePostedArticle} 
                                                  deletePostedImage={this.props.deletePostedImage} />} />
            <PrivateRoute path="/item/:itemid" component={ItemWithId} />
            <PrivateRoute path="/article/:itemid" component={ArticleWithId} />
            <PrivateRoute path="/createuser" component={() => <CreateUser resetCreateUserForm={this.props.resetCreateUserForm} postNewUser={this.props.postNewUser} />} />
            <Route path="/about" component={() =>  <About /> } />
            <Redirect to="/home" />
        </Switch>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
