import React from 'react';
import { Card, CardImg, CardTitle, CardBody, CardSubtitle, CardText, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './loadingComponent';
import DeleteDialog from './deleteDialogComponent';
import ArticleMenuOptions from './alterArticleComponent';
import PostedArticleMenuOptions from './alterPostedArticleComponent';
import RenderPostForm from './postImageAndArticleComponent';



function RenderFeedItem({auth, feed, fetchImageAndComments, fetchArticleAndComments, updateArticle, deleteImage, deleteArticle }) {
 if (feed.imageurl != null) {
    return(
        <Card>
        {parseInt(auth.userid, [10]) === feed.userid ?
            <div className="longmenu"><DeleteDialog itemid={feed.itemid} deleteImage={deleteImage} /></div>
            : null
        }
            <CardBody>
              <CardTitle><h4>{feed.title}</h4></CardTitle>
              <div className="name-date">
              <CardSubtitle>{feed.firstname} {feed.lastname}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(feed.createdon)))}</CardSubtitle>
              </div>
            </CardBody>
            <CardImg width="100%" src={feed.imageurl} alt={feed.title} />
            <Link to={`/item/${feed.itemid}`} >
                <div className="article-link">
                    <CardBody onClick={async () => await fetchImageAndComments(feed.itemid)}>
                        <span className="fa fa-comment fa-lg"></span>
                    </CardBody>
                </div>
            </Link>
        </Card>
    );
 }
 else {
    return(
        <Card>
        {parseInt(auth.userid, [10]) === feed.userid ?
            <div className="longmenu"><ArticleMenuOptions title={feed.title} article={feed.article} itemid={feed.itemid} updateArticle={updateArticle} deleteArticle={deleteArticle} /></div>
            : null
        }
            <CardBody>
              <CardTitle><h4>{feed.title}</h4></CardTitle>
              <div className="name-date">
              <CardSubtitle>{feed.firstname} {feed.lastname}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(feed.createdon)))}</CardSubtitle>
              </div>
            </CardBody>
            <div className="article-feed">
                <CardBody>
                    <CardText>{feed.article}</CardText>
                </CardBody>
            </div>
            <Link to={`/article/${feed.itemid}`} >
                <div className="article-link">
                    <CardBody onClick={async () => await fetchArticleAndComments(feed.itemid)}>
                        <span className="fa fa-comment fa-lg"></span>
                     </CardBody>
                 </div>
             </Link>
        </Card>
    );
 }
    
}


function RenderPostedItem({auth, feed, fetchImageAndComments, fetchArticleAndComments, updatePostedArticle, deleteImage, deletePostedArticle}) {
    if (feed.imageurl != null) {
        return(
            <Card>
            {parseInt(auth.userid, [10]) === feed.userid ?
                <div className="longmenu"><DeleteDialog itemid={feed.itemid} deleteImage={deleteImage} /></div>
                : null
            }
                <CardBody>
                  <CardTitle><h4>{feed.title}</h4></CardTitle>
                  <div className="name-date">
                  <CardSubtitle>{feed.firstname} {feed.lastname}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(feed.createdon)))}</CardSubtitle>
                  </div>
                </CardBody>
                <CardImg width="100%" src={feed.imageurl} alt={feed.title} />
                <Link to={`/item/${feed.itemid}`} >
                    <div className="article-link">
                        <CardBody onClick={async () => await fetchImageAndComments(feed.itemid)}>
                            <span className="fa fa-comment fa-lg"></span>
                        </CardBody>
                    </div>
                </Link>
            </Card>
        );
    }
    if (feed.article != null) {
        return(
            <Card>
            {parseInt(auth.userid, [10]) === feed.userid ?
                <div className="longmenu"><PostedArticleMenuOptions title={feed.title} article={feed.article} itemid={feed.itemid} 
                    updatePostedArticle={updatePostedArticle} deletePostedArticle={deletePostedArticle} /></div>
                : null
            }
                <CardBody>
                  <CardTitle><h4>{feed.title}</h4></CardTitle>
                <div className="name-date">
                  <CardSubtitle>{feed.firstname} {feed.lastname}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(feed.createdon)))}</CardSubtitle>
                </div>
                </CardBody>
                <div className="article-feed">
                    <CardBody>
                        <CardText>{feed.article}</CardText>
                    </CardBody>
                </div>
                <Link to={`/article/${feed.itemid}`} >
                    <div className="article-link">
                        <CardBody onClick={async () => await fetchArticleAndComments(feed.itemid)}>
                            <span className="fa fa-comment fa-lg"></span>
                        </CardBody>
                    </div>
                </Link>
            </Card>
        );
    }
    else{
        return(
            <div></div>
        );
    }
}



class Feed extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const feed = this.props.feeds.feeds.map((feed, index) => {
            return (
                <ul key={index} className="list-unstyled">
                    <li>
                        <div className="row centreItem">
                            <div className="col-12 col-md-6 m-1">
                                <RenderFeedItem feed={feed} fetchImageAndComments={this.props.fetchImageAndComments}
                                    fetchArticleAndComments={this.props.fetchArticleAndComments} auth={this.props.auth}
                                    updateArticle={this.props.updateArticle} deleteImage={this.props.deleteImage} deleteArticle={this.props.deleteArticle} />
                            </div>
                        </div>
                    </li>
                </ul>
            );
        });

        const singleFeed = this.props.feeds.feed.map((feed, index) => {
            return (
                <ul key={index} className="list-unstyled">
                    <li>
                        <div className="row centreItem">
                            <div className="col-12 col-md-6 m-1">
                                <RenderPostedItem feed={feed} fetchImageAndComments={this.props.fetchImageAndComments}
                                    fetchArticleAndComments={this.props.fetchArticleAndComments} auth={this.props.auth}
                                    updatePostedArticle={this.props.updatePostedArticle} deleteImage={this.props.deleteImage} 
                                    deletePostedArticle={this.props.deletePostedArticle} />
                            </div>
                        </div>
                    </li>
                </ul>
            );           
        });
        

        if (this.props.feeds.isLoading) {
            return(
                <div className="container spinner">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.feeds.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{this.props.feeds.errMess}</h4>
                    </div>
                </div>
            );
        }
        else
        return (
            <div>
                <div>
                    <RenderPostForm postGif={this.props.postGif} postArticle={this.props.postArticle} />
                </div>
                <div className=" containerBorder">
                    {singleFeed}
                    {feed}
                </div>
            </div>
        );
    }   
}



export default Feed;