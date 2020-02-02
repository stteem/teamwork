import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { faKeyboard } from '@fortawesome/free-solid-svg-icons'
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Input, CustomInput, Label, Button } from 'reactstrap';



/*const RenderPostForm = () => {
	return(
		<div className="container postdiv">
            <div className="row">
            </div>
        </div>    
    );
}*/

class RenderPostForm extends Component {

	constructor(props) {
        super(props);
        
        this.state = {
          isArticleModalOpen: false,
          isModalOpen: false,
          file: null
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.toggleArticleModal = this.toggleArticleModal.bind(this);
        this.handleImageSubmit = this.handleImageSubmit.bind(this);
        this.onFileInputChange = this.onFileInputChange.bind(this);
        this.handleArticleSubmit = this.handleArticleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    toggleArticleModal() {
    	this.setState({
          isArticleModalOpen: !this.state.isArticleModalOpen
        });
    }

    onFileInputChange(e) {
        console.log(e.target.files[0]);
        this.setState({file: e.target.files[0]});
        console.log('state', this.state.file);
    }

    handleImageSubmit(event) {
        event.preventDefault();
        this.toggleModal();
        this.props.postGif(this.title.value, this.state.file);
    }

    handleArticleSubmit(event) {
        event.preventDefault();
        if (this.title.value !== '' || this.article.value !== '') {
            this.toggleArticleModal();
            this.props.postArticle(this.title.value, this.article.value);
        }
        else return false;
    }


    /*handleSubmit(event) {
        this.props.postGif({title: this.title.value, image: event.target.files[0]});
    }*/


	render() {
		return(
			<div>
				<div className="postdiv">
		            <div className="row">
                        <div className="col-12 col-md-12 m-1">
        		            <Button className="gifbutton" onClick={this.toggleModal}><FontAwesomeIcon icon={ faImage } style={{ color: 'purple' }} size="lg" /><strong> Gif</strong></Button>
        		            <Button className="gifbutton" onClick={this.toggleArticleModal}><FontAwesomeIcon icon={ faKeyboard } style={{ color: 'violet' }} size="lg" /><strong> Article</strong></Button>
                        </div>
                    </div>
		        </div>
		         <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Post Gif</ModalHeader>
                    <ModalBody>
                    	<Form onSubmit={this.handleImageSubmit}>
                            <FormGroup>
                                <Label htmlFor="title">Title</Label>
                                <Input type="text" id="title" name="title"
                                    innerRef={(input) => this.title=input}
                                    onChange={this.onChangeInput} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="image">Gif of Life</Label>
                            </FormGroup>
                            <CustomInput type="file" id="image" name="image" label="Yo, pick a gif!"
                                onChange={this.onFileInputChange} />

                            <Button type="submit" value="submit" className="buttn">Post</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isArticleModalOpen} toggle={this.toggleArticleModal}>
                    <ModalHeader toggle={this.toggleArticleModal}>Post Article</ModalHeader>
                    <ModalBody>
                    	<Form onSubmit={this.handleArticleSubmit}>
                            <FormGroup>
                                <Label htmlFor="title">Title</Label>
                                <Input type="text" id="title" name="title"
                                    innerRef={(input) => this.title = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="article">Article</Label>
        						<Input type="textarea" name="article" id="article" rows="10"
        						innerRef={(input) => this.article=input} />
                            </FormGroup>
                           
                            <Button type="submit" value="submit" className="buttn" >Post</Button>
                        </Form>
                    </ModalBody>
                </Modal>
			</div>
		)
	}
}

export default RenderPostForm;