import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { studentActions } from "../../redux/actions";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import DeleteStudentModal from "../../components/deleteStudentModal";
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
    width: 220,
  },
}));

const SingleStudentPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const student = useSelector((state) => state.student.selectedStudent);
  const classes = useStyles();
  // console.log("student:", student);

  useEffect(() => {
    if (params?.id) {
      dispatch(studentActions.getSingleStudent(params.id));
    }
  }, [dispatch, params]);

  return (
    <>
      <div className="main-container">
        <h3 style={{ fontFamily: "Montserrat, sans-serif", color: "#606060" }}>
          {student.name}'s Information
        </h3>
        <form className={classes.root}>
          <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  Name: <h6>{student.name}</h6>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  Email: <h6>{student.email}</h6>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  Phone: <h6>{student.phone}</h6>
                </Paper>
              </Grid>
            </Grid>

            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  Cohort Name List:{" "}
                  {student?.cohortList?.map((item) => (
                    <div key={item._id} value={item.name}>
                      {item.name}
                    </div>
                  ))}
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  Foreigner: <p>{student.foreigner}</p>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  Gender: <p>{student.gender}</p>
                </Paper>
              </Grid>
            </Grid>

            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  Student ID: <p>{student._id}</p>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  Zoom ID: {/* {student.zoomId + ","} */}
                  {student?.zoomId?.map((item) => (
                    <div key={item} value={item}>
                      {item}
                    </div>
                  ))}
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  Discord ID: <p>{student.discordId}</p>
                </Paper>
              </Grid>
            </Grid>

            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  Company:<p>{student.company}</p>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  Salary:<p>{student.salary}</p>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  CV Url: <p>{student.cvUrl}</p>
                </Paper>
              </Grid>
            </Grid>

            <Grid container item xs={12} spacing={3}>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  Status:<p>{student.status}</p>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  Show On Website: <p>{student.showOnWebsite}</p>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  Note: <p>{student.note}</p>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              component={Link}
              to={`/student/edit/${student._id}`}
              variant="contained"
              style={{
                backgroundColor: "#2a7592",
                color: "white",
                marginRight: "20px",
              }}
              type="submit"
            >
              Edit
            </Button>

            <DeleteStudentModal />
          </div>
        </form>
      </div>
    </>
  );
};

export default SingleStudentPage;
