import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import PeopleIcon from "@material-ui/icons/People";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import BookIcon from "@material-ui/icons/Book";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Navbar = () => {
  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = useState(null);
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{ backgroundColor: "#d74742" }}>
          <Typography variant="h2" noWrap>
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
      >
        <Toolbar />
        {/* <Toolbar />
        <Divider /> */}
        <div className={classes.drawerContainer}>
          {/* <List>
            {["Attendance", "Course", "Cohort", "Student"].map(
              (text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
          </List> */}
          <List
          // id="simple-menu"
          // anchorEl={anchorEl}
          // keepMounted
          // open={Boolean(anchorEl)}
          // onClose={handleClose}
          >
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
              <ListItemText primary="Call Zoom Api" />
            </ListItem>
          </List>
          <Divider />
          {/* <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */}
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
