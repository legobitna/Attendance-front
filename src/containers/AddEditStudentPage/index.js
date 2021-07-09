import React, { useState, useEffect } from "react";
import "../../App.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { studentActions } from "../../redux/actions/student.actions";
import { cohortActions } from "../../redux/actions";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import ChipInput from "material-ui-chip-input";
import _ from "lodash";
import { routeActions } from "../../redux/actions/route.actions";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(item, cohortNameList, theme) {
  return {
    fontWeight:
      cohortNameList.indexOf(item.name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
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
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
  },
}));

const genders = [
  {
    value: "M",
    label: "Male",
  },
  {
    value: "F",
    label: "Female",
  },
];

const foreigners = [
  {
    value: true,
    label: "Foreigner",
  },
  {
    value: false,
    label: "Vietnamese",
  },
];

const showOnWebsites = [
  {
    value: true,
    label: "True",
  },
  {
    value: false,
    label: "False",
  },
];

const studentStatus = [
  {
    value: "onGoing",
    label: "On Going",
  },
  {
    value: "finshed",
    label: "Finished",
  },
];

const AddEditStudentPage = () => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const cohortList = useSelector((state) => state.cohort.cohorts);
  const history = useHistory();
  const [gender, setGender] = useState();
  const [foreigner, setForeigner] = useState();
  const [showOnWebsite, setShowOnWebsite] = useState();
  const [status, setStatus] = useState();
  const [cohortNameList, setCohortNameList] = useState([]);
  const params = useParams();
  const addOrEdit = params.id ? "Edit" : "Add";
  const selectedStudent = useSelector((state) => state.student.selectedStudent);
  const redirectTo = useSelector((state) => state.route.redirectTo);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cohortList: [],
    foreigner: false,
    gender: "",
    studentId: 0,
    zoomId: [],
    discordId: "",
    salary: null,
    cvUrl: "",
    status: "",
    showOnWebsite: false,
    note: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("form data:", formData);
    console.log("handle change e", e);
  };

  const handleChangeCohortList = (e) => {
    setCohortNameList(e.target.value);

    console.log("e.target.value:", {
      _id: cohortNameList.map((element) => element._id),
    });
  };

  const handleAddChip = (chip) => {
    setFormData({ ...formData, zoomId: [...formData.zoomId, chip] });
  };

  const handleDeleteChip = (chip) => {
    console.log("formData chip", formData);
    setFormData({
      ...formData,
      zoomId: _.without([...formData.zoomId], chip),
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   formData.cohortList = cohortNameList.map((element) => element._id);

  //   dispatch(studentActions.registerStudent(formData));

  //   history.goBack();
  //   console.log("handle sumbit:", formData);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.cohortList = cohortNameList.map((element) => element._id);

    if (addOrEdit === "Add") {
      dispatch(studentActions.registerStudent(formData));
      history.goBack();
    } else if (addOrEdit === "Edit") {
      dispatch(studentActions.updateStudent(params.id, formData));
      console.log("handleSubmit update", formData);
      // history.goBack();
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  useEffect(() => {
    dispatch(cohortActions.getCohort());
  }, []);

  useEffect(() => {
    if (params && params.id && selectedStudent && selectedStudent._id) {
      setFormData((formData) => ({
        ...formData,
        name: selectedStudent.name,
        email: selectedStudent.email,
        phone: selectedStudent.phone,
        cohortList: selectedStudent.cohortList,
        foreigner: selectedStudent.foreigner,
        gender: selectedStudent.gender,
        studentId: selectedStudent.studentId,
        zoomId: selectedStudent.zoomId,
        discordId: selectedStudent.discordId,
        salary: selectedStudent.salary,
        cvUrl: selectedStudent.cvUrl,
        status: selectedStudent.status,
        showOnWebsite: selectedStudent.showOnWebsite,
        note: selectedStudent.note,
      }));
    }
  }, [params, selectedStudent]);

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
          {addOrEdit} Student
        </h3>
        {console.log("selectedStudent", selectedStudent)}

        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <td></td>
          <TextField
            required
            id="filled-required"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            required
            id="filled-required"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <FormControl required className={classes.formControl}>
            <TextField
              // required
              id="filled-required"
              label="Phone"
              name="phone"
              type="number"
              value={formData.phone}
              onChange={handleChange}
            />
          </FormControl>
          <td></td>

          <FormControl className={classes.formControl}>
            <InputLabel
              id="demo-mutiple-chip-label"
              //  htmlFor={idRef.current}
            >
              Cohort Name List
            </InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              // displayEmpty
              value={cohortNameList}
              onChange={handleChangeCohortList}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip
                      key={value._id}
                      label={value.name}
                      className={classes.chip}
                    />
                  ))}{" "}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {cohortList.map((item) => (
                <MenuItem
                  key={item._id}
                  value={item}
                  style={getStyles(item, cohortNameList, theme)}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            id="standard-select-currency"
            select
            label="Foreigner"
            value={foreigner}
            onChange={handleChange}
          >
            {foreigners.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="standard-select-currency"
            select
            label="Gender"
            value={formData.gender}
            onChange={handleChange}
          >
            {genders.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <td></td>
          <TextField
            // required
            id="filled-required"
            label="Student ID"
            name="studentId"
            type="number"
            onChange={handleChange}
          />

          <ChipInput
            label="Zoom ID"
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip, index) => handleDeleteChip(chip, index)}
            name="zoomId"
            value={formData.zoomId}
          />

          <TextField
            id="filled-required"
            label="Discord ID"
            name="discordId"
            onChange={handleChange}
          />
          <td></td>
          <TextField
            id="filled-required"
            label="Company"
            name="company"
            onChange={handleChange}
          />
          <FormControl required className={classes.formControl}>
            <TextField
              id="filled-required"
              label="Salary(USD)"
              name="salary"
              type="number"
              onChange={handleChange}
            />
          </FormControl>
          <TextField
            id="filled-required"
            label="CV Url"
            name="cvUrl"
            onChange={handleChange}
          />
          <td></td>
          <TextField
            id="standard-select-currency"
            select
            label="Status"
            value={status}
            onChange={handleChange}
          >
            {studentStatus.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="standard-select-currency"
            select
            label="Show on Website"
            value={showOnWebsite}
            onChange={handleChange}
          >
            {showOnWebsites.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="filled-required"
            label="Note"
            name="note"
            onChange={handleChange}
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

export default AddEditStudentPage;
