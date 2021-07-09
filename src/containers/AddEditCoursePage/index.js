import React, { useState, useEffect } from "react";
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { courseActions } from "../../redux/actions/course.actions";
import { routeActions } from "../../redux/actions/route.actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "25ch",
    },
  },
}));

const AddEditCoursePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const addOrEdit = params.id ? "Edit" : "Add";
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const selectedCourse = useSelector((state) => state.course.selectedCourse);

  const [formData, setFormData] = useState({
    name: "",
    // week: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (addOrEdit === "Add") {
      dispatch(courseActions.registerCourse(formData));
      history.goBack();
    } else if (addOrEdit === "Edit") {
      dispatch(courseActions.updateCourse(params.id, formData));
      console.log("handleSubmit update", formData);
      // history.goBack();
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  // useEffect(() => {
  //   dispatch(courseActions.getCourse());
  // }, []);

  useEffect(() => {
    if (params && params.id && selectedCourse && selectedCourse._id) {
      setFormData((formData) => ({
        ...formData,
        name: selectedCourse.name,
        // week: selectedCourse.week,
      }));
    }
  }, [params, selectedCourse]);

  useEffect(() => {
    if (redirectTo) {
      if (redirectTo === "__GO_BACK__") {
        history.goBack();
        dispatch(routeActions.redirect(""));
      } else {
        history.push(redirectTo);
        dispatch(routeActions.redirect(""));
      }
    }
  }, [redirectTo, dispatch, history]);

  return (
    <>
      <div className="main-container">
        <h3 style={{ fontFamily: "Montserrat, sans-serif", color: "#606060" }}>
          {addOrEdit} Course
        </h3>

        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            required
            id="filled-required"
            label="Course Name"
            name="name"
            value={formData.name}
            variant="outlined"
            onChange={handleChange}
          />
          {/* <TextField
            required
            id="filled-required"
            label="Information"
            name="information"
            variant="outlined"
            onChange={handleChange}
          /> */}

          <td></td>
          <Button
            variant="contained"
            style={{ backgroundColor: "#d74742", color: "white" }}
            type="submit"
          >
            {addOrEdit}
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "#A9A9A9", color: "white" }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddEditCoursePage;
