import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({
  open,
  setOpen,
}: {
  open: {
    title: string;
    open: boolean;
  };
  setOpen: React.Dispatch<
    React.SetStateAction<{
      title: string;
      open: boolean;
    }>
  >;
}) {
  const handleClose = () => {
    setOpen({
      title: "",
      open: false,
    });
  };

  return (
    <React.Fragment>
      <Dialog
        open={open.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{open.title}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
