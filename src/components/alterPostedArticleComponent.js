import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ArticleMenu from './articleMenuIconComponent';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

//Dialog dependencies
//import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';




const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    /*border: '2px solid #000',*/
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '500px',
  },
}));

export default function UpdateArticleMenuOptions(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState(props.title);
  const [article, setArticle] = React.useState(props.article);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


  const handleArticleSubmit = (event) => {
    event.preventDefault();
    props.updatePostedArticle(props.itemid, title, article);
    setOpen(false);
  }

  const handleArticleDelete = () => {
    props.deletePostedArticle(props.itemid);
    setOpenDialog(false);
  }

  return (
    <div>
      <ArticleMenu handleOpen={handleOpen} handleOpenDialog={handleOpenDialog} >
        react-transition-group
      </ArticleMenu>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <div className="closemodal" onClick={handleClose}><Button color="link">X</Button></div>
            <h2 id="transition-modal-title">Edit Article</h2>
            <Form onSubmit={handleArticleSubmit}>
                <FormGroup>
                    <Label htmlFor="title">Title</Label>
                    <Input type="text" id="title" name="title"
                        value={title} onChange={e => setTitle(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="article">Article</Label>
                    <Input type="textarea" name="article" id="article" rows="10"
                      value={article} onChange={e => setArticle(e.target.value)} />
                </FormGroup>
               
                <Button type="submit" value="submit" color="primary">Update</Button>
            </Form>
          </div>
        </Fade>
      </Modal>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Article?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this article?.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleArticleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}