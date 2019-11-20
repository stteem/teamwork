import React, {Component} from 'react';
//import Home from './homeComponent';
//import { Navbar, NavbarBrand } from 'reactstrap';
//import Menu from './menuComponents';
//import Contact from './contactComponent';
//import RepoInfo from './repoComponent';
//import DishDetail from './dishdetailComponent';
import Header from './header';
//import Footer from './footerComponent';
//import { DISHES } from '../shared/dishes';
//import { COMMENTS } from '../shared/comments';
//import { LEADERS } from '../shared/leaders';
//import { PROMOTIONS } from '../shared/promotions';

import { Switch, Route, Redirect } from 'react-router-dom';


class Main extends Component {

 

  render() {

    

    return (
      <div className="App">
        <Header />
        <Switch>
              <Route path='/home'  />
              <Route exact path='/menu'  />
              <Route path='/menu/:dishId'  />
              <Route exact path='/contactus'  />
              <Route exact path='/repoform'  />
              <Redirect to="/home" />
          </Switch>
      </div>
    );
  }
}


export default Main;
