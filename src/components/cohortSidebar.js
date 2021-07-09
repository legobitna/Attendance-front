import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import GroupIcon from "@material-ui/icons/Group";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { attendanceActions } from "../redux/actions/attendance.actions";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const drawerWidth = 205;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
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
  submenu: {
    paddingLeft: "3em",
    fontSize: "0.5rem",
    color: "grey",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const CohortSidebar = ({ setSelectedSession }) => {
  const classes = useStyles();
  const cohortList = useSelector((state) => state.cohort.cohorts);
  const dispatch = useDispatch();
  const [open, setOpen] = useState("");

  const handleClick = (name) => {
    setOpen(name);
  };

  const getAttendance = (sessionId) => {
    setSelectedSession(sessionId);
    dispatch(attendanceActions.getAttendanceBySessionId(sessionId));
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="right"
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {cohortList.map((cohort, index) => (
          <>
            <ListItem button onClick={() => handleClick(cohort.name)}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary={cohort.name} />
              {open === cohort.name ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open === cohort.name} timeout="auto" unmountOnExit>
              <List component="div" disablePadding className={classes.nested}>
                {cohort.sessions.map((session, index) => (
                  <ListItem
                    button
                    key={session.startDate}
                    onClick={() => getAttendance(session._id)}
                  >
                    {session.date}
                    <ListItemIcon>
                      <AccessTimeIcon />
                    </ListItemIcon>
                    <ListItemText primary={session.startDate} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </>
        ))}
      </List>
    </Drawer>
  );
};

export default CohortSidebar;
