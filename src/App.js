import React, {Component} from 'react';
import Main from './components/mainComponent';
//import Login from './components/loginComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';


const store = ConfigureStore();

class App extends Component {


  render() {
    return (
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Main/>
      </div>
      </BrowserRouter>
    </Provider>
    );
  }
}


export default App;
