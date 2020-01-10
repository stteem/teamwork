import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Label,
     Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { Loading } from './loadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';



function RenderItem({item, postComment}) {

    return(
        <Card>
            <CardBody>
              <CardTitle>{item.gifTitle}</CardTitle>
            </CardBody>
                <CardImg width="100%" src={item.url} alt={item.gifTitle} />
                <RenderItemComments comments={item.comments} postComment={postComment} itemid={item.itemid}/>
        </Card>

    );
}

function RenderItemComments({comments, postComment, itemid}) {
    if (comments != null) {
        return(
            <div className="col-12 col-md-12 m-1">
                <ul className="list-unstyled">
                    <Stagger in>
                        {comments.map((comment) => {
                            return (
                                <Fade in key={comment.id}>
                                    
                                    <p>{comment.firstname} {comment.lastname} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.createdon)))}</p>
                                    <li>{comment.comment}</li>
                                    <hr/>
                                </Fade>
                            );
                        })}
                    </Stagger>
                </ul>
                <CommentForm itemid={itemid} postComment={postComment} />
            </div>
        );
    }
    else
        return(
            <div>
                <CommentForm itemid={itemid} postComment={postComment} />
            </div>
        );
}



class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

   

    handleSubmit(values) {
        this.props.postComment(this.props.itemid, values.comment);
    }

    render() {
        return(
            <div>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    
                    <Row className="form-group">
                        <Col>
                        <Control.textarea model=".comment" id="comment" placeholder="Add a comment"
                                     className="form-control" />
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




class ItemDetail extends Component {

    constructor(props) {
        super(props);
    }


    render() { 


        if (this.props.isLoading) {
            return(
                <div className="container">
                    <div className="row spinner">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.errMess) {
            return(
                <div className="container">
                    <div className="row centreItem">
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else       
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem active><Link to='/home'>Home</Link></BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="container">
                        <div className="row centreItem">
                            <div className="col-12 col-md-10 m-1">
                                <RenderItem item={this.props.item} postComment={this.props.postComment} />
                            </div> 
                        </div>
                    </div>
                </div>
            );
    }
}

export default ItemDetail;