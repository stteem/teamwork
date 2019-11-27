import React from 'react';
import { Card, CardImg, CardTitle, CardBody, CardSubtitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './loadingComponent';

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

function RenderFeedItem({ feed, onClick }) {
 if (validURL(feed.item)) {
    return(
        <Card>
            <CardBody>
              <CardTitle>{feed.title}</CardTitle>
            </CardBody>
            <Link to={`/home/${feed.id}`} >
                <CardImg width="100%" src={feed.item} alt={feed.title} />
            </Link>
        </Card>
    );
 }
 else {
    return(
        <Card>
            <CardBody>
              <CardTitle>{feed.title}</CardTitle>
                <CardSubtitle></CardSubtitle>
            </CardBody>
            <CardBody>
            <CardText>{feed.item}</CardText>
            </CardBody>
        </Card>
    );
 }
    
}

const Feed = (props) => {

    const feeds = props.feeds.feeds.map((feed) => {
        return (
            <div className="row centreItem">
                <div key={feed.id} className="col-12 col-md-8 m-1">
                    <RenderFeedItem feed={feed} />
                </div>
            </div>
        );
    });

    if (props.feeds.isLoading) {
        return(
            <div className="container spinner">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.feeds.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.feeds.errMess}</h4>
                </div>
            </div>
        );
    }
    else
        return (
            <div className="container containerBorder">
                {feeds}
            </div>
        );
}



export default Feed;