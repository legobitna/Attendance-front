import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { cohortActions } from "../redux/actions";
import { useHistory } from "react-router-dom";

const DeleteCohortModal = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const cohort = useSelector((state) => state.cohort.selectedCohort);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    // console.log("delete E", e);
    dispatch(cohortActions.deleteCohort(cohort._id));
    setOpen(false);
    // console.log("cohort._id", cohort._id);
    history.goBack();
  };
  // console.log("delete", handleDelete);

  useEffect(() => {
    dispatch(cohortActions.getCohort());
  }, []);

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to delete this?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h5>
              Once you delete this cohort, "{cohort.name}", the deleted data can
              not be recovered.
            </h5>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            style={{ backgroundColor: "#d74742", color: "white" }}
            // autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteCohortModal;
