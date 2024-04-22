import React, { useState } from 'react';
import SubForm from './SubForm';

import { DialogTitle } from './CustomDialogTitle';
import { Dialog, DialogContent, Button, MenuItem, ListItemIcon } from '@material-ui/core';
import { useDialogStyles } from '../styles/muiStyles';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const SubFormModal = ({ type, handleCloseMenu }) => {
  const classes = useDialogStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenMenu = () => {
    handleClickOpen();
    handleCloseMenu();
  };

  return (
    <div>
      {type !== 'menu' ? (
        <>
          <Button
            color='primary'
            variant='contained'
            onClick={handleClickOpen}
            fullWidth
            className={classes.createSubBtn}
            size='large'
            startIcon={<AddCircleIcon />}
          >
            Create New Communities
          </Button>
          <Button
            color='primary'
            variant='contained'
            // onClick={handleClickOpen}
            href='/market'
            fullWidth
            className={classes.createSubBtn}
            size='large'
            startIcon={<AddCircleIcon />}
          >
            Market Place
          </Button>
        </>
      ) : (
        <MenuItem onClick={handleOpenMenu}>
          <ListItemIcon>
            <AddCircleIcon style={{ marginRight: 7 }} />
            Create Subreddish
          </ListItemIcon>
        </MenuItem>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='sm'
        classes={{ paper: classes.dialogWrapper }}
        fullWidth
      >
        <DialogTitle onClose={handleClose}>Create a new community</DialogTitle>
        <DialogContent>
          <SubForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubFormModal;
