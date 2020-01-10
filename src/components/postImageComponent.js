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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFileInputChange = this.onFileInputChange.bind(this);
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

    handleSubmit(event) {
        event.preventDefault();
        this.toggleModal();
        this.props.postGif(this.title.value, this.state.file);
    }


    /*handleSubmit(event) {
        this.props.postGif({title: this.title.value, image: event.target.files[0]});
    }*/


	render() {
		return(
			<div>
				<div className="container postdiv">
		            <div className="row">
		            <div className="articleField"></div>
		            <Button className="gifbutton" onClick={this.toggleModal}><FontAwesomeIcon icon={ faImage } style={{ color: 'purple' }} size="lg" />  Post Gif</Button>
		            <Button className="gifbutton" onClick={this.toggleArticleModal}><FontAwesomeIcon icon={ faKeyboard } style={{ color: 'violet' }} size="lg" />  Post Article</Button>
		            </div>
		        </div>
		         <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Post Gif</ModalHeader>
                    <ModalBody>
                    	<Form onSubmit={this.handleSubmit}>
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

                            <Button type="submit" value="submit" color="primary">Post</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isArticleModalOpen} toggle={this.toggleArticleModal}>
                    <ModalHeader toggle={this.toggleArticleModal}>Post Article</ModalHeader>
                    <ModalBody>
                    	<Form onSubmit={this.handleArticlePost}>
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
                           
                            <Button type="submit" value="submit" color="primary">Post</Button>
                        </Form>
                    </ModalBody>
                </Modal>
			</div>
		)
	}
}

export default RenderPostForm;