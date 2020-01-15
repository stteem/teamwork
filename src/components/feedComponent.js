import React from 'react';
import { Card, CardImg, CardTitle, CardBody, CardSubtitle, CardText, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './loadingComponent';



function RenderFeedItem({ feed, fetchImageAndComments, fetchArticleAndComments }) {
 if (feed.imageurl != null) {
    return(
        <Card onClick={async () => await fetchImageAndComments(feed.itemid)}>
            <CardBody>
              <CardTitle>{feed.title}</CardTitle>
            </CardBody>
            <Link to={`/item/${feed.itemid}`} >
                <CardImg width="100%" src={feed.imageurl} alt={feed.title} />
                <div className="article-link">
                    <CardBody>
                        <span className="fa fa-comment fa-lg"></span>
                    </CardBody>
                </div>
            </Link>
        </Card>
    );
 }
 else {
    return(
        <Card onClick={async () => await fetchArticleAndComments(feed.itemid)}>
            <CardBody>
              <CardTitle>{feed.title}</CardTitle>
            </CardBody>
            <CardBody>
                <CardText>{feed.article}</CardText>
            </CardBody>
            <CardBody>
                <CardText>{feed.firstname} {feed.lastname} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(feed.createdon)))}</CardText>
            </CardBody>
            <Link to={`/article/${feed.itemid}`} >
                <div className="article-link">
                    <CardBody>
                        <span className="fa fa-comment fa-lg"></span>
                     </CardBody>
                 </div>
             </Link>
        </Card>
    );
 }
    
}


function RenderPostedGifItem({feed, fetchImageAndComments, fetchArticleAndComments}) {
    if (feed.imageurl != null) {
        return(
            <Card onClick={async () => await fetchImageAndComments(feed.itemid)}>
                <CardBody>
                  <CardTitle>{feed.title}</CardTitle>
                </CardBody>
                <Link to={`/item/${feed.itemid}`} >
                    <CardImg width="100%" src={feed.imageurl} alt={feed.title} />
                    <div className="article-link">
                        <CardBody>
                            <span className="fa fa-comment fa-lg"></span>
                        </CardBody>
                    </div>
                </Link>
            </Card>
        );
    }
    if (feed.article != null) {
        return(
            <Card onClick={async () => await fetchArticleAndComments(feed.itemid)} >
                <CardBody>
                  <CardTitle>{feed.title}</CardTitle>
                    <CardSubtitle></CardSubtitle>
                </CardBody>
                <CardBody>
                    <CardText>{feed.article}</CardText>
                </CardBody>
                <CardBody>
                    <CardText>{feed.firstname} {feed.lastname} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(feed.createdon)))}</CardText>
                </CardBody>
                <Link to={`/article/${feed.itemid}`} >
                    <div className="article-link">
                        <CardBody>
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
                <div className="row centreItem">
                    <div key={index} className="col-12 col-md-10 m-1">
                        <RenderFeedItem feed={feed} fetchImageAndComments={this.props.fetchImageAndComments}
                            fetchArticleAndComments={this.props.fetchArticleAndComments} />
                    </div>
                </div>
            );
        });

        const singleFeed = this.props.feeds.feed.map((feed) => {
            return (
                <div className="row centreItem">
                    <div key={feed.itemid} className="col-12 col-md-10 m-1">
                        <RenderPostedGifItem feed={feed} fetchImageAndComments={this.props.fetchImageAndComments}
                            fetchArticleAndComments={this.props.fetchArticleAndComments} />
                    </div>
                </div>
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
            <div className="container containerBorder">
                {singleFeed}
                {feed}
            </div>
        );
    }   
}



export default Feed;