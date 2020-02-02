import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Form, Errors, actions } from 'react-redux-form';
//import { isEmail, isEmpty } from 'validator';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);


class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitFailed = this.handleSubmitFailed.bind(this);
        this.state = {error: ''}
    }

    handleSubmit(reguser) {
        
        //console.log('reguser', reguser.values)
        if (reguser.firstname !== '' || reguser.lastname !== ''
        	|| reguser.email !== '' || reguser.password !== ''
        	|| reguser.gender !== false || reguser.jobrole !== ''
        	|| reguser.department !== '' || reguser.address !== ''
        	|| reguser.maritalstatus !== false ) 
        {
        	//console.log("Current State is: " + JSON.stringify(reguser.firstname));
        	this.props.postNewUser(reguser);
        	this.props.resetCreateUserForm();
        }
        
        else this.setState({error: 'Empty field(s) detected!'});
            setTimeout(() => {this.setState({error: ''})},5000);
            return false;
    }


    handleSubmitFailed(reguser) {
	    // logs form-level errors
	    console.log('reguser form', reguser.$form.errors);

	    // logs errors for user.email
	    //console.log(reguser.email.errors);
	 }


    render() {

    	//const { firstname, lastname, email, password, gender, jobrole, dept, address, status } = this.props.reguser;

        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Create User</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Create User</h3>
                        <hr />
                    </div>
                </div>
                
                <div className="row row-content">
                    <div className="col-12">
                        <h3>New User Information </h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form 
                        	model="reguser" 
                        	//validators={{'': { required }}}
                        	onSubmit={(reguser) => this.handleSubmit(reguser)}
                        	//onSubmitFailed={ (reguser) => this.handleSubmitFailed(reguser) }
                    	>
                            <Row className="form-group">
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={8}>
                                    <Control.text model=".firstname" id="firstname" name="firstname"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            required: 'Required, ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={8}>
                                    <Control.text model=".lastname" id="lastname" name="lastname"
                                        placeholder="Last Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".lastname"
                                        show="touched"
                                        messages={{
                                            required: 'Required, ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={8}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        className="form-control"
                                        validators={{
                                            required, validEmail
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            required: 'Required, ',
                                            validEmail: 'Invalid Email Address'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="password" md={2}>Password</Label>
                                <Col md={8}>
                                    <Control.text type="password" model=".password" id="password" name="password"
                                        placeholder="Password"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(6), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".password"
                                        show="touched"
                                        messages={{
                                            required: 'Required, ',
                                            minLength: 'Must be greater than 5 characters',
                                            maxLength: 'Must be 15 characters or less',
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="gender" md={2}>Gender</Label>
                                <Col md={8}>
                                    <Control.select 
                                        model=".gender" 
                                        name="gender"
                                        className="form-control">
                                        <option></option>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="jobrole" md={2}>Job Role</Label>
                                <Col md={8}>
                                    <Control.text model=".jobrole" id="jobrole" name="jobrole"
                                        placeholder="Job Role"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(50)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".jobrole"
                                        show="touched"
                                        messages={{
                                            required: 'Required, ',
                                            minLength: 'Must be greater than 3 characters',
                                            maxLength: 'Must be 50 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="dept" md={2}>Department</Label>
                                <Col md={8}>
                                    <Control.text model=".department" id="department" name="department"
                                        placeholder="Department"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(50)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".department"
                                        show="touched"
                                        messages={{
                                            required: 'Required, ',
                                            minLength: 'Must be greater than 3 characters',
                                            maxLength: 'Must be 50 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="address" md={2}>Address</Label>
                                <Col md={8}>
                                    <Control.text model=".address" id="address" name="address"
                                        placeholder="Address"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(50)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".address"
                                        show="touched"
                                        messages={{
                                            required: 'Required, ',
                                            minLength: 'Must be greater than 3 characters',
                                            maxLength: 'Must be 50 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
								<Label htmlFor="maritalstatus" md={2}>Marital Status</Label>
                                <Col md={8}>
                                    <Control.select 
                                        model=".maritalstatus" 
                                        name="maritalstatus"
                                        className="form-control">
										<option></option>
                                        <option>Married</option>
                                        <option>Single</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 6, offset: 2}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".isadmin" name="isadmin"
                                                className="form-check-input"
                                                 /> {' '}
                                                <strong>Make Admin</strong>
                                        </Label>
                                    </div>
                                </Col>
                                
                            </Row>
                            
                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                <p className="error">{this.state.error}</p>
                                    <Button className="buttn" disabled type="submit">
                                    Create User
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

}

export default CreateUser;