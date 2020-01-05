import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Label,
     Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm } from 'react-redux-form';
import { Loading } from './loadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';



function RenderItem({item}) {

    return(
        <Card>
            <CardBody>
              <CardTitle>{item.gifTitle}</CardTitle>
            </CardBody>
                <CardImg width="100%" src={item.url} alt={item.gifTitle} />
        </Card>
    );
}


   

    const ItemDetail = (props) => {

        if (props.item.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.item.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.item.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.item.item.data != null)        
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem active><Link to='/home'>Home</Link></BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="row">
                        <RenderItem item={props.item} />
                        
                    </div>
                </div>
            );
        else
            return(
                <div></div>
            );
    }

export default ItemDetail;