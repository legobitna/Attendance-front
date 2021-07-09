import React from "react";
import { Switch, Route } from "react-router-dom";
import CourseListPage from "../containers/CourseListPage";
import AddEditCoursePage from "../containers/AddEditCoursePage/index.js";
import HomePage from "../containers/HomePage";
import AttendancePage from "../containers/AttendancePage";
import CohortListPage from "../containers/CohortListPage";
import AddEditCohortPage from "../containers/AddEditCohortPage";
import StudentListPage from "../containers/StudentListPage";
import AddEditStudentPage from "../containers/AddEditStudentPage";
import CallZoomPage from "../containers/CallZoomPage";
import Practice from "../containers/Practice";
import { makeStyles } from "@material-ui/core/styles";
import PeopleIcon from "@material-ui/icons/People";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import BookIcon from "@material-ui/icons/Book";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import SingleStudentPage from "../containers/SingleStudentPage";
import SingleCohortPage from "../containers/SingleCohortPage";
import SingleCoursePage from "../containers/SingleCoursePage";
import AlertMsg from "../components/AlertMsg";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const Routes = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar
          style={{ backgroundColor: "#d74742" }}
          onClick={() => history.push("/")}
        >
          <img
            src="./images/tab-icon.png"
            style={{
              width: "65px",
              paddingRight: "10px",
            }}
          />
          <Typography
            variant="h2"
            noWrap
            style={{
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            CoderSchool
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <AlertMsg />

        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/attendance" exact component={AttendancePage} />

          <Route path="/course" exact component={CourseListPage} />
          <Route path="/course/new" exact component={AddEditCoursePage} />
          <Route path="/course/:id" exact component={SingleCoursePage} />
          <Route path="/course/edit/:id" exact component={AddEditCoursePage} />

          <Route path="/cohort" exact component={CohortListPage} />
          <Route path="/cohort/new" exact component={AddEditCohortPage} />
          <Route path="/cohort/:id" exact component={SingleCohortPage} />
          <Route path="/cohort/edit/:id" exact component={AddEditCohortPage} />

          <Route path="/student" exact component={StudentListPage} />
          <Route path="/student/new" exact component={AddEditStudentPage} />
          <Route path="/student/:id" exact component={SingleStudentPage} />
          <Route
            path="/student/edit/:id"
            exact
            component={AddEditStudentPage}
          />

          <Route path="/callapi" exact component={CallZoomPage} />
          <Route path="/practice" exact component={Practice} />
        </Switch>
      </main>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />

        <List>
          <ListItem button component={Link} to="/attendance">
            <ListItemIcon>
              <BeenhereIcon />
            </ListItemIcon>
            <ListItemText primary="Attendance" />
          </ListItem>

          <ListItem button component={Link} to="/course">
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            <ListItemText primary="Course List" />
          </ListItem>

          <ListItem button component={Link} to="/cohort">
            <ListItemIcon>
              <ChromeReaderModeIcon />
            </ListItemIcon>
            <ListItemText primary="Cohort List" />
          </ListItem>

          <ListItem button component={Link} to="/student">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Student List" />
          </ListItem>

          <ListItem button component={Link} to="/callapi">
            <ListItemIcon>
              <VideoCallIcon />
            </ListItemIcon>
            {/* <ListItemText primary="Call Zoom Api" /> */}
            <ListItemText primary="Call Zoom Api" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Routes;
