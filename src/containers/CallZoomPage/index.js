import React, { useState } from "react";
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { attendanceActions } from "../../redux/actions/attendance.actions";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(3),
      width: "25ch",
    },
  },
}));

const CallZoomPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [meetingId, setMeetingId] = useState(0);
  const loading = useSelector((state) => state.attendance.loading);
  const result = useSelector((state) => state.attendance.result);
  const handleChange = (e) => setMeetingId(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(attendanceActions.generateAttendance(meetingId));
  };

  return (
    <div className="main-container">
      <h1
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "bold",
          color: "#1a2156",
        }}
      >
        Call Zoom Api
      </h1>
      <h6 style={{ fontFamily: "Montserrat, sans-serif", marginTop: "3%" }}>
        This page is for generating attendance data manually <br />
        when you don't see your attendance data after you finishing the meeting
        (usually webhook fail or token problem). <br />
        Once again, before generating, make sure you already register your
        cohort and zoom meeting ID on the cohort list page.
      </h6>

      {loading ? (
        <ClipLoader color="#f86c6b" size={150} loading={loading} />
      ) : (
        <>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              required
              id="filled-required"
              label="Meeting ID"
              variant="outlined"
              onChange={handleChange}
            />

            <Button
              variant="contained"
              color="secondary"
              type="submit"
              style={{
                backgroundColor: "#d74742",
                color: "white",
              }}
            >
              Generate
            </Button>
            <h2>{result}</h2>
          </form>
        </>
      )}
    </div>
  );
};

export default CallZoomPage;
