import React, { useEffect } from "react";
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
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import "../../App.css";
import styled from "styled-components";
import { useTable } from "react-table";
import "moment-duration-format";
import { useDispatch, useSelector } from "react-redux";
import { studentActions } from "../../redux/actions";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

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

const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`;
function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const Practice = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const studentList = useSelector((state) => state.student.students);
  console.log("studentList:", studentList);

  const columns = React.useMemo(
    () => [
      {
        Header: "Current Student List",
        columns: [
          {
            Header: "Name",
            accessor: "name",
            style: { background: "white" },
          },
          {
            Header: "Email",
            accessor: "email",
          },
          {
            Header: "Phone",
            accessor: "phone",
          },
          {
            Header: "Cohort Name",
            accessor: "cohortList[0].name",
          },
          {
            Header: "Foreigner",
            accessor: "foreigner",
          },
          {
            Header: "Gender",
            accessor: "gender",
          },
          {
            Header: "Student Id",
            accessor: "studentId",
          },
          {
            Header: "Zoom ID",
            accessor: "zoomId",
          },
          {
            Header: "Discord ID",
            accessor: "discordId",
          },
          {
            Header: "Company",
            accessor: "company",
          },
          {
            Header: "Salary",
            accessor: "salary",
          },
          {
            Header: "CV Url",
            accessor: "cvUrl",
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Show on Website",
            accessor: "showOnWebsite",
          },
          {
            Header: "Note",
            accessor: "note",
          },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(studentActions.getStudent());
  }, []);

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar style={{ backgroundColor: "#FF0000" }}>
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
          <div className={classes.drawerContainer}>
            <List>
              {["Inbox", "Starred", "Send email", "Drafts"].map(
                (text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                )
              )}
            </List>
            <Divider />
          </div>
        </Drawer>

        <main className={classes.content}>
          <>
            <div className="main-container">
              <h4>Add Student</h4>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                onClick={() => history.push("/student/new")}
              >
                Add
              </Button>
            </div>

            <div className="list-container">
              <h2>Current Student List</h2>
              <Styles>
                <Table columns={columns} data={studentList} />
              </Styles>
            </div>
          </>
        </main>
      </div>
    </div>
  );
};

export default Practice;
