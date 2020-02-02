import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Breadcrumb, BreadcrumbItem, Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { Loading } from './loadingComponent';



function RenderArticle({article}) {

    return(
        <div className="item">
            <Card>
                <CardBody>
                  <CardTitle><h4>{article.title}</h4></CardTitle>
                  <div className="name-date">
                  <CardSubtitle>{article.firstname} {article.lastname}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(article.createdon)))}</CardSubtitle>
                  </div>
                </CardBody>
                <div className="article">
                <CardBody>
                    <CardText>{article.article}</CardText>
                </CardBody>
                </div>
            </Card>
        </div>
    );
}

    



function RenderArticleComments({comments}) {
    if (comments != null) {
        return(
            <div className="col-12 col-md-12 m-1" className="commentBorder">
                <ul className="list-unstyled">
                        {comments.map((comment) => {
                            return (
                                <div key={comment.id}>
                                    
                                    <p className="name-date">{comment.firstname} {comment.lastname} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.createdon)))}</p>
                                    <li>{comment.comment}</li>
                                    <hr/>
                                </div>
                            );
                        })}
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

function RenderSingleComment({comment}) {
    return(
        <div className="col-12 col-md-12 m-1" className="commentBorder">
            <ul className="list-unstyled">
                {comment.map((comment, index) => {
                    return (
                        <div key={index}>

                            <p className="name-date">{comment.firstname} {comment.lastname} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.createdon)))}</p>
                            <li>{comment.comment}</li>
                            <hr/>
                        </div>
                    );
                })}
            </ul>
        </div>
    );
}



class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {comment: ''}
    }

   

    handleSubmit(values) {
        if (values.comment !== '') {
            this.props.postArticleComment(this.props.articleid, values.comment);
        }
        else 
            this.setState({comment: ''});
            return false;
    }

    handleChange(comment) {
        this.setState({comment: comment})
    }

    render() {
        return(
            <div>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    
                    <Row className="form-group">
                        <Col>
                        <Control.textarea 
                        model=".comment" 
                        id="comment" 
                        placeholder="Add a comment"
                        className="form-control"
                        onChange={(comment) => this.handleChange(comment)}
                        />
                        </Col>
                    </Row>
                    <Button type="submit" disabled={!this.state.comment} className="buttn">
                        Post
                    </Button>
                </LocalForm>
            </div>
        );
    }
}     




class ArticleDetail extends Component {


    render() { 


        if (this.props.isLoading) {
            return(
                <div className="container spinner">
                    <div className="row">
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
                            <div className="col-12 col-md-8 m-1">
                                <RenderArticle article={this.props.article.article} />
                                <RenderArticleComments comments={this.props.article.article.comments} />
                                <RenderSingleComment comment={this.props.article.comment} />
                                <CommentForm articleid={this.props.article.article.articleid} postArticleComment={this.props.postArticleComment} />
                            </div> 
                        </div>
                    </div>
                </div>
            );
    }
}

export default ArticleDetail;