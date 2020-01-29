import React from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron, Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


export default function Login(props) {

	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [email, setEmail] = React.useState(null);
  	const [password, setPassword] = React.useState(null);

  	let history = useHistory();
	let location = useLocation();

	let { from } = location.state || { from: { pathname: "/" } };



    const toggleModal = () => {
          setIsModalOpen(!isModalOpen);
    }


  	const handleLogin = async (event) => {

  		event.preventDefault();
        toggleModal();
        await props.loginUser({email: email, password: password});
        return localStorage.getItem('token') ? history.replace(from) : null;
    }


    const handleLogout = () => {
        props.logoutUser();
    }
    

    return(
        <div> 
        	<header className="App-header login">
                <h1>TeamWork</h1>
                <h5>Inspiration comes from the little Gifs of life! Login to connect with your team mates in a giffy way.</h5> 
                { !props.auth.isAuthenticated ?
	                <Button outline onClick={toggleModal}>
	                    <span className="fa fa-sign-in fa-lg"></span> Login
	                    {props.auth.isLoading ?
	                        <span className="fa fa-spinner fa-pulse fa-fw"></span>
	                        : null
	                    }
	                </Button>
	                :
	                <div>
	                <div className="navbar-text mr-3"><FontAwesomeIcon icon={ faUser } size="lg" /> {props.auth.user}</div>
	                <Button outline onClick={handleLogout}>
	                    <span className="fa fa-sign-out fa-lg"></span> Logout
	                    {props.auth.isLoading ?
	                        <span className="fa fa-spinner fa-pulse fa-fw"></span>
	                        : null
	                    }
	                </Button>
	                </div>
	            }   
		    </header>

            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Login</ModalHeader>
                <ModalBody>
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
                       
                        <Button type="submit" value="submit" color="primary"  >Login</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );    
}