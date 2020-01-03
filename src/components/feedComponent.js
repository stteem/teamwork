import React from 'react';
import { Card, CardImg, CardTitle, CardBody, CardSubtitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './loadingComponent';



function RenderFeedItem({ feed, onClick }) {
 if (feed.imageurl != null) {
    return(
        <Card>
            <Link to={`/home/${feed.itemid}`} >
            <CardBody>
              <CardTitle>{feed.title}</CardTitle>
            </CardBody>
                <CardImg width="100%" src={feed.imageurl} alt={feed.title} />
            </Link>
        </Card>
    );
 }
 else {
    return(
        <Card>
            <Link to={`/home/${feed.itemid}`} >
            <CardBody>
              <CardTitle>{feed.title}</CardTitle>
                <CardSubtitle></CardSubtitle>
            </CardBody>
            <CardBody>
                <CardText>{feed.article}</CardText>
            </CardBody>
            </Link>
        </Card>
    );
 }
    
}


function RenderGifItem({feed, onClick}) {
    if (feed.imageurl != null) {
        return(
            <Card>
                <CardBody>
                  <CardTitle>{feed.title}</CardTitle>
                </CardBody>
                <Link to={`/home/${feed.itemid}`} >
                    <CardImg width="100%" src={feed.imageurl} alt={feed.title} />
                </Link>
            </Card>
        );
    }
    if (feed.article != null) {
        return(
            <Card>
                <CardBody>
                  <CardTitle>{feed.title}</CardTitle>
                    <CardSubtitle></CardSubtitle>
                </CardBody>
                <CardBody>
                    <CardText>{feed.article}</CardText>
                </CardBody>
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


    render() {

        const feed = this.props.feeds.feeds.map((feed) => {
            return (
                <div className="row centreItem">
                    <div key={feed.itemid} className="col-12 col-md-8 m-1">
                        <RenderFeedItem feed={feed} />
                    </div>
                </div>
            );
        });

        const singleFeed = this.props.feeds.feed.map((feed) => {
            return (
                <div className="row centreItem">
                    <div key={feed.itemid} className="col-12 col-md-8 m-1">
                        <RenderGifItem feed={feed} />
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