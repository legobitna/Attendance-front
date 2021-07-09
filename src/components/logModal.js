import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 550,
  },
}));

const LogModal = ({ open, handleClose, rowData }) => {
  const classes = useStyles();
  let row = [];
  if (!rowData.record) {
    if (rowData.log) {
      row = rowData.log;
    }
  } else {
    row = rowData.record.log;
  }

  return (
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
          <h2 id="transition-modal-title">Log</h2>
          {row.length > 0
            ? row.map((record) => {
                return (
                  <p id="transition-modal-description">
                    Join Time:{" "}
                    {moment
                      .utc(record.join_time)
                      .local()
                      .format("MMM-DD-YYYY h:mm A")}{" "}
                    / Leave Time :
                    {moment
                      .utc(record.leave_time)
                      .local()
                      .format("MMM-DD-YYYY h:mm A")}
                  </p>
                );
              })
            : "No Log Data"}
        </div>
      </Fade>
    </Modal>
  );
};

export default LogModal;
