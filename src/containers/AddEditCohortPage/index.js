import React, { useState, useEffect } from "react";
import "../../App.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useSelector, useDispatch } from "react-redux";
import { courseActions } from "../../redux/actions/course.actions";
import { cohortActions } from "../../redux/actions/cohort.actions";
import { useHistory, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { routeActions } from "../../redux/actions/route.actions";
import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(3),
      width: "25ch",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  },
}));

const AddEditCohortPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const courseList = useSelector((state) => state.course.courses);
  const history = useHistory();
  const params = useParams();
  const addOrEdit = params.id ? "Edit" : "Add";
  const selectedCohort = useSelector((state) => state.cohort.selectedCohort);
  const redirectTo = useSelector((state) => state.route.redirectTo);

  const [formData, setFormData] = useState({
    name: "",
    courseId: "",
    week: 0,
    meetingId: 0,
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleChangeStartDate = (startDate) => {
    setFormData({
      ...formData,
      startDate,
    });
  };

  const handleChangeEndDate = (endDate) => {
    setFormData({
      ...formData,
      endDate,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (addOrEdit === "Add") {
      dispatch(cohortActions.registerCohort(formData));
      history.goBack();
    } else if (addOrEdit === "Edit") {
      dispatch(cohortActions.updateCohort(params.id, formData));
      console.log("handleSubmit update", formData);
      // history.goBack();
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  useEffect(() => {
    dispatch(courseActions.getCourse());
  }, []);

  useEffect(() => {
    if (params && params.id && selectedCohort && selectedCohort._id) {
      setFormData((formData) => ({
        ...formData,
        name: selectedCohort.name,
        courseId: selectedCohort.courseId,
        week: selectedCohort.week,
        meetingId: selectedCohort.meetingId,
        // startDate: selectedCohort.startDate,
        // endDate: selectedCohort.endDate,
      }));
    }
  }, [params, selectedCohort]);

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
          {addOrEdit} Cohort
        </h3>
        {console.log("selectedCohort", selectedCohort)}
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <FormControl required className={classes.formControl}>
            <InputLabel id="demo-simple-select-required-label">
              Course Name
            </InputLabel>

            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              className={classes.selectEmpty}
            >
              {courseList.map((item) => (
                <MenuItem value={item._id}>{item.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>

          <TextField
            required
            id="filled-required"
            label="Cohort Name"
            name="name"
            value={formData.name}
            variant="outlined"
            onChange={handleChange}
          />
          <td></td>
          <FormControl required className={classes.formControl}>
            <TextField
              id="filled-required"
              label="week"
              name="week"
              value={formData.week}
              variant="outlined"
              type="number"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl required className={classes.formControl}>
            <TextField
              id="filled-required"
              label="Zoom Meeting Id"
              name="meetingId"
              value={formData.meetingId}
              variant="outlined"
              type="number"
              onChange={handleChange}
            />
          </FormControl>
          <td></td>

          <p>Start Date</p>
          <DatePicker
            name="startDate"
            value={formData.startDate}
            selected={formData.startDate}
            onChange={handleChangeStartDate}
            required
          />
          <p>End Date</p>
          <DatePicker
            name="endDate"
            value={formData.endDate}
            selected={formData.endDate}
            onChange={handleChangeEndDate}
            required
          />
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

export default AddEditCohortPage;
