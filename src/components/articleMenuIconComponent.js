import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';



const options = [
  'Edit',
  'Delete',
];

const ITEM_HEIGHT = 48;

export default function ArticleMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);

    const option = event.target.getAttribute("value");

    if(option === "Edit"){
      props.handleOpen();
    }
    if (option === "Delete") {
      props.handleOpenDialog();
    }

  };


  return (

    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}
      >
        {options.map(option => (
          <MenuItem key={option} value={option} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>

    </div>
  );
}
