import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { cohortActions } from "../../redux/actions";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import DeleteCohortModal from "../../components/deleteCohortModal";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 60,
  },
  paper: {
    padding: theme.spacing(1),
    margin: 20,
    textAlign: "center",
    color: "black",
    width: 250,
  },
}));

const SingleCohortPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const cohort = useSelector((state) => state.cohort.selectedCohort);

  console.log("cohort:", cohort);

  const ictStartDate = () => {
    moment.utc(cohort.startDate).local().format("YYYY-MMM-DD");
    if (cohort.startDate == null) {
      cohort.startDate = "";
    }
  };

  const ictEndDate = () => {
    moment.utc(cohort.endDate).local().format("YYYY-MMM-DD");
    if (cohort.endDate == null) {
      cohort.endDate = "";
    }
  };

  useEffect(() => {
    if (params?.id) {
      dispatch(cohortActions.getSingleCohort(params.id));
    }
  }, [dispatch, params]);

  return (
    <>
      <div className="main-container">
        {console.log("selectedCohort", cohort)}
        <h3 style={{ fontFamily: "Montserrat, sans-serif", color: "#606060" }}>
          {cohort.name}'s Information
        </h3>
        <form className={classes.root}>
          <div>
            <Grid container spacing={1}>
              <Grid
                container
                item
                xs={12}
                spacing={1}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Grid item xs={4}>
                  <Paper className={classes.paper}>
                    Cohort Name:
                    <h6>{cohort.name}</h6>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper}>
                    Course Name:
                    <h6>{cohort.courseId && cohort.courseId.name}</h6>
                  </Paper>
                </Grid>
              </Grid>

              <Grid
                container
                item
                xs={12}
                spacing={1}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Grid item xs={4}>
                  <Paper className={classes.paper}>
                    Week: <p>{cohort.week}</p>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper}>
                    Zoom Meeting Id: <p>{cohort.meetingId}</p>
                  </Paper>
                </Grid>
              </Grid>

              <Grid
                container
                item
                xs={12}
                spacing={1}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Grid item xs={4}>
                  <Paper className={classes.paper}>
                    Start Date: <p> {ictStartDate}</p>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper}>
                    End Date: <p> {ictEndDate}</p>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button
              component={Link}
              to={`/cohort/edit/${cohort._id}`}
              variant="contained"
              style={{
                backgroundColor: "#2a7592",
                color: "white",
                // marginLeft: "-130px",
                marginRight: "40px",
              }}
              type="submit"
            >
              Edit
            </Button>

            <DeleteCohortModal />
          </div>
        </form>
      </div>
    </>
  );
};

export default SingleCohortPage;
