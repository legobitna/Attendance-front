import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { courseActions } from "../../redux/actions";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import DeleteCourseModal from "../../components/deleteCourseModal";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 60,
  },
  paper: {
    padding: theme.spacing(1),
    margin: 2,
    textAlign: "center",
    color: "black",
    width: 260,
  },
}));

const SingleCoursePage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const course = useSelector((state) => state.course.selectedCourse);

  useEffect(() => {
    if (params?.id) {
      dispatch(courseActions.getSingleCourse(params.id));
    }
  }, [dispatch, params]);

  return (
    <>
      <div className="main-container">
        <h3 style={{ fontFamily: "Montserrat, sans-serif", color: "#606060" }}>
          {course.name}'s Information
        </h3>
        <form className={classes.root}>
          <Grid container spacing={3}>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  Cohort Name: <h6>{course.name}</h6>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "30px",
            }}
          >
            <Button
              component={Link}
              to={`/course/edit/${course._id}`}
              variant="contained"
              style={{
                backgroundColor: "#2a7592",
                color: "white",
              }}
              type="submit"
            >
              Edit
            </Button>
            <DeleteCourseModal />
          </div>
        </form>{" "}
      </div>
    </>
  );
};

export default SingleCoursePage;
