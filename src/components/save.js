
import { actions } from 'react-redux-form';
import validator from 'validator';

// wherever dispatch() is available:
dispatch(actions.setErrors('user.email', {
  invalid: (val) => !validator.isEmail(val) && 'Not a valid email',
  length: (val) => val < 8 && 'Email is too short'
}));


import { actions } from 'react-redux-form';
import validator from 'validator';

// wherever validation is occurring:
dispatch(actions.validate('user.email', {
  required: (value) => value && value.length,
  valid: validator.isEmail
});




 function RenderComments({comments, postComment, dishId}) {
        if (comments != null)
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        <Stagger in>
                            {comments.map((comment) => {
                                return (
                                    <Fade in key={comment._id}>
                                        <li>
                                        <p>{comment.comment}</p>
                                        <p>-- {comment.author.firstname} {comment.author.lastname} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.updatedAt)))}</p>
                                        </li>
                                    </Fade>
                                );
                            })}
                        </Stagger>
                    </ul>
                    <CommentForm dishId={dishId} postComment={postComment} />
                </div>
            );
        else
            return(
                <div></div>
            );
    }

    class CommentForm extends Component {

        constructor(props) {
            super(props);
    
            this.handleSubmit = this.handleSubmit.bind(this);
        }
    
       
    
        handleSubmit(values) {
            this.props.postComment(this.props.itemId, values.comment);
        }
    
        render() {
            return(
                <div>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        
                        <Row className="form-group">
                            <Col>
                            <Control.textarea model=".comment" id="comment"
                                        rows="6" className="form-control" />
                            </Col>
                        </Row>
                        <Button type="submit" className="bg-primary">
                            Post
                        </Button>
                    </LocalForm>
                </div>
            );
        }
    }                            





function SingleComment({comment}) {
    if (comment != null) {
        console.log('comment data', comment)
        return(
            <div className="col-12 col-md-12 m-1">
                <ul className="list-unstyled">                
                    <p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.createdon)))}</p>
                    <li>{comment.comment}</li>
                    <hr/>        
                </ul>
            </div>
        );
    }
    else
        return(
        <div>
        </div>
    );
}


const singleComment = this.props.comment.comment.map((datum) => {
    return (
        <div in key={datum.id}>
            <SingleComment comment={datum} />
        </div>
    );
});


<!-- Fonts to support Material Design -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
  <!-- Icons to support Material Design -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />


  The standard Lorem Ipsum passage, used since the 1500s
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
 magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
   occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
 voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione 
 voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
  sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. 
  Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea 
  commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur,
   vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"

1914 translation by H. Rackham
"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a 
complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of 
human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not 
know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves
 or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which 
 toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious 
 physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses 
 to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"

 Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti 
quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt 
mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, 
cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas 
assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe 
eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, 
ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."

1914 translation by H. Rackham
"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms 
of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; 
and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through 
shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power 
of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed
 and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will
  frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these
   matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains 
   to avoid worse pains."


   <p>
  <label>
    Firstname
    <br />
    <input type="text" name="firstname" onChange={this.handleChange} value={this.state.product.name}/>
  </label>
</p>
<p>
  <label>
    Lastname
    <br />
    <input type="text" name="lastname" onChange={this.handleChange} value={this.state.product.category} />
  </label>
</p>
<p>
  <label>
    Email
    <br />
    <input type="email" name="email" onChange={this.handleChange} value={this.state.product.price} />
  </label>
</p>
<p>
  <label>
    Password
    <br />
    <input type="password" name="password" onChange={this.handleChange} value={this.state.product.price} />
  </label>
</p>
<p>
  <label>
    <input type="radio" value="male" />
    Male
  </label>
  <label>
    <input type="radio" value="female" />
    Female
  </label>
</p>
<p>
  <label>
    Job Role
    <br />
    <input type="text" name="jobrole" onChange={this.handleChange} value={this.state.product.price} />
  </label>
</p>
<p>
  <label>
    Department
    <br />
    <input type="text" name="dept" onChange={this.handleChange} value={this.state.product.price} />
  </label>
</p>
<p>
  <label>
    Address
    <br />
    <input type="text" name="address" onChange={this.handleChange} value={this.state.product.price} />
  </label>
</p>
<p>
  <label>
    Marital Status
    <br />
    <select>
        <option></option>
        <option value="married">Married</option>
        <option value="single">Single</option>
    </select>
  </label>
</p>
<p>
  <label>
    <input type="checkbox" name="isadmin" onChange={this.handleChange} checked={this.state.product.stocked}/>
    &nbsp;Make admin?
  </label>
</p>
<input type="submit" value="Save" onClick={this.handleSave} />








import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';


const RESET_VALUES = {firstname: '', lastname: '', email: '', password: '', gender: '',
 jobrole: '', dept: '', address: '', maritalstatus: '', isadmin: false};


class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          userinfo: Object.assign({}, RESET_VALUES),
          errors: {}
        };
    }


    handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name ? target.name : target.id;

        this.setState((prevState) => {
          prevState.userinfo[name] = value;
          console.log('setting state', prevState.userinfo)
          return { userinfo: prevState.userinfo };
        });
    }


    handleSubmit(e) {
        e.preventDefault();
        this.props.createUser(this.state.userinfo);
        // reset the form values to blank after submitting: 
        this.setState({
          userinfo: Object.assign({}, RESET_VALUES),
          errors: {}
        });
    }


    render() {

        //const { firstname, lastname, email, password, gender, jobrole, dept, address, status } = this.props.createuser;
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Create User</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>User Information</h3>
                        <hr />
                    </div>
                </div>
                
                <div className="row">

                    <form >
                        <div className="form-group">
                         <label for="firstname">Firstname</label>
                          <input type="text" name="firstname" className="form-control form-control-lg"  onChange={this.handleChange} value={this.state.userinfo.firstname}/>
                        </div>
                        <div className="form-group">
                          <label for="lastname">Lastname</label>
                            <input type="text" name="lastname" className="form-control form-control-lg"  onChange={this.handleChange} value={this.state.userinfo.lastname} />
                        </div>
                        <div className="form-group">
                          <label for="email">Email</label>
                            <input type="email" name="email" className="form-control form-control-lg"  onChange={this.handleChange} value={this.state.userinfo.email} />
                        </div>
                        <div className="form-group">
                          <label for="password">Password</label>
                            <input type="password" name="password" className="form-control form-control-lg"  onChange={this.handleChange} value={this.state.userinfo.password} />
                        </div>
                        <div className="form-group">
                          <label for="gender">Gender</label>
                            <select id="gender" className="form-control form-control-lg" >
                                <option></option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="form-group">
                          <label for="jobrole">Job Role</label>
                            <input type="text" name="jobrole" className="form-control form-control-lg"  onChange={this.handleChange} value={this.state.userinfo.jobrole} />
                        </div>
                        <div className="form-group">
                          <label for="dept">Department</label>
                            <input type="text" name="dept" className="form-control form-control-lg"  onChange={this.handleChange} value={this.state.userinfo.dept} />
                        </div>
                        <div className="form-group">
                          <label for="address">address</label>
                            <input type="address" name="address" className="form-control form-control-lg"  onChange={this.handleChange} value={this.state.userinfo.address} />
                        </div>
                        <div className="form-group">
                          <label for="maritalStatus">Marital Status</label>
                            <select id="maritalstatus" className="form-control form-control-lg" >
                                <option></option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                            </select>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" name="isadmin" onChange={this.handleChange} checked={this.state.userinfo.isadmin}/>
                            &nbsp;
                            <label for="isadmin"><strong>Make admin?</strong></label>
                        </div>
                        <Button className="buttn" type="submit" color="primary" >
                          Register
                        </Button>
                        
                    </form>
                </div>
            </div>
        );
    }

}

export default CreateUser;