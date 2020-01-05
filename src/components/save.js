
<RenderComments comments={props.comments}
    postComment={props.postComment}
    itemId={props.item._id} />




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