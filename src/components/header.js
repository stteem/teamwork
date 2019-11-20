import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron, Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label, FormFeedback } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.validate = this.validate.bind(this);
        this.state = {
          isNavOpen: false,
          isModalOpen: false,
          email: '',
          password: '',
          remember: false,
          message: '',
          touched: {
            email: false,
            password: false
          }
        };
      }

    toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name] : value
        });
    }


  	handleLogin(event) {
        this.toggleModal();
        if (this.state.email === '' || this.state.password === '') {
            return alert( 'fields are empty');
        }
        alert(" Login details are: " + JSON.stringify(this.state.email + " " + this.state.password
            + " " + this.state.remember));
        event.preventDefault();
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true}
        });
    }

    validate(email, password) {
        const errors = {
            email: '',
            password: ''
        };

        if (this.state.touched.email && email.split('').filter(x => x === '@').length !== 1) {
            errors.email = 'Email should contain a @';
        }
        if (this.state.touched.password && password.length < 6 ) {
            errors.password = 'Password must not be less than 6 characters';
        }
        if (this.state.touched.password && password.length > 20 ) {
            errors.password = 'Password must not be more than 20 characters';
        }
        return errors;
    }

    render() {
        const errors = this.validate(this.state.email, this.state.password)
        return(
            <div>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">
                    	</NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link"  to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                                                   </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                            </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Login</Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>TeamWork</h1>
                                <p>Foster collaboration in the work place and bring forth your creative juices, Take or give inspiration from the little Gifs of life!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                    	<Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" name="email"
                                    value={this.state.email}
                                    valid={errors.email === ''}
                                    invalid={errors.email !== ''}
                                    onBlur={this.handleBlur('email')}
                                    onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.email}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    value={this.state.password}
                                    valid={errors.password === ''}
                                    invalid={errors.password !== ''}
                                    onBlur={this.handleBlur('password')}
                                    onChange={this.handleInputChange}  />
                                    <FormFeedback>{errors.password}</FormFeedback>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                    checked={this.state.remember}
                                    onChange={this.handleInputChange}  />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default Header;