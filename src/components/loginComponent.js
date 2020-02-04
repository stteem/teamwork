import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useHistory, useLocation } from 'react-router-dom';


export default function Login(props) {

	const [email, setEmail] = React.useState(null);
  	const [password, setPassword] = React.useState(null);

  	let history = useHistory();
	let location = useLocation();

	let { from } = location.state || { from: { pathname: "/" } };



  	const handleLogin = async (event) => {

  		event.preventDefault();
        //toggleModal();
        if (email !== null || password !== null) {
            await props.loginUser({email: email, password: password});
            return localStorage.getItem('token') ? history.replace(from) : null;
        }
        else return false;
    }

    

    return(
        <div> 
        	<header className="App-header">
                <h1>TeamWork</h1>
                <h5>Inspiration comes from the little Gifs of life! Login to connect with your team mates in a giffy way.</h5> 
                <div className="container">
                    <div className="row loginform">
                        <div className="col-12 col-md-3" >
                            <Form onSubmit={handleLogin}>
                                <FormGroup>
                                    <Label htmlFor="email">Email</Label>
                                    <Input type="text" id="email" name="email"
                                        onChange={e => setEmail(e.target.value)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="password">Password</Label>
                                    <Input type="password" id="password" name="password" 
                                        onChange={e => setPassword(e.target.value)}  />
                                </FormGroup>
                               
                                <Button type="submit" value="submit" className="loginbuttn">
                                    <span className="fa fa-sign-in fa-lg"></span> Login
                                    {props.auth.isLoading ?
                                        <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                        : null
                                    }
                                </Button>    
                            </Form>
                        </div>
                    </div>
                </div>
  
		    </header>
        </div>
    );    
}