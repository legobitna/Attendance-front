import React, { useEffect } from "react";
import "../../App.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { useTable, useSortBy, useFilters } from "react-table";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { studentActions } from "../../redux/actions";
import { Filter, DefaultColumnFilter } from "../../components/filters";
import { SelectColumnFilter } from "../../components/filters";
import { CSVLink, CSVDownload } from "react-csv";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const generateSortingIndicator = (column) => {
  return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
};

const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border-radius: 20px;
    border: solid 1px #ddd;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    thead {
      background: rgba(42, 117, 146, 1);
      border-bottom: solid 1px rgba(0, 0, 0, 0.2);
      color: white;
    }
    tbody tr:hover {
      background-color: rgb(255, 179, 179);
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      :last-child {
        border-right: 0;
      }
    }
  }
`;
function Table({ columns, data }) {
  const history = useHistory();
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
    },
    useFilters,
    useSortBy
  );

  const handleClickOnStudent = (id) => {
    history.push(`/student/${id}`);
  };

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                <div {...column.getSortByToggleProps()}>
                  {column.render("Header")}
                  {generateSortingIndicator(column)}
                </div>
                <Filter column={column} />
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              onClick={() => handleClickOnStudent(row.original._id)}
            >
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

const StudentListPage = ({ data, Header }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const rawStudentList = useSelector((state) => state.student.students);
  const student = useSelector((state) => state.student.students);
  console.log("student:", student);

  const columns = React.useMemo(
    () => [
      {
        Header: "Current Student List",

        columns: [
          {
            Header: "Name",
            accessor: "name",
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
            accessor: "cohortNameList",
          },
          {
            Header: "Foreigner",
            accessor: "foreigner",
            Filter: SelectColumnFilter,
            filter: "equals",
          },
          {
            Header: "Gender",
            accessor: "gender",
            Filter: SelectColumnFilter,
            filter: "equals",
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
            disableFilters: true,
          },
          {
            Header: "Salary",
            accessor: "salary",
            disableFilters: true,
          },
          {
            Header: "CV Url",
            accessor: "cvUrl",
            disableFilters: true,
          },
          {
            Header: "Status",
            accessor: "status",
            Filter: SelectColumnFilter,
            filter: "equals",
            Cell: (row) => (
              <span>
                <span
                  style={{
                    color:
                      row.value === "status"
                        ? "#ff2e00"
                        : row.value === "onGoing"
                        ? "#4e42f5"
                        : "#f54b42",
                    transition: "all .5s ease",
                  }}
                >
                  &#x25cf;
                </span>{" "}
                {row.value === "status"
                  ? "Student Status"
                  : row.value === "onGoing"
                  ? "on Going"
                  : ""}
              </span>
            ),
          },
          {
            Header: "Show on Website",
            accessor: "showOnWebsite",
            Filter: SelectColumnFilter,
            filter: "equals",
          },
          {
            Header: "Note",
            accessor: "note",
            disableFilters: true,
          },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(studentActions.getStudent());
  }, [dispatch]);

  let studentList = rawStudentList.map((std) => {
    let newstd = { ...std };
    newstd.cohortNameList = std.cohortList.map((item) => item.name + ",");
    newstd.zoomId = std.zoomId.map((item) => item + ",");
    return newstd;
  });

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className="main-container">
          <h3
            style={{ fontFamily: "Montserrat, sans-serif", color: "#606060" }}
          >
            Add Student
          </h3>
          <Button
            variant="contained"
            style={{ backgroundColor: "#d74742", color: "white" }}
            type="submit"
            onClick={() => history.push("/student/new")}
          >
            Add
          </Button>

          <div className="list-container">
            <h1
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "bold",
                color: "#1a2156",
              }}
            >
              Current Student List
            </h1>
            {/* <CSVLink
              data={studentList}
              filename={"studentList.csv"}
              className="btn btn-primary"
              style={{ backgroundColor: "#2a7592", color: "white" }}
              target="_blank"
            >
              Download the List
            </CSVLink> */}

            <CSVLink
              headers={Header}
              data={studentList}
              filename="users.csv"
              target="_blank"
              className="btn btn-primary"
              style={{ backgroundColor: "#2a7592", color: "white" }}
            >
              EXPORT EXCEL
            </CSVLink>

            <Styles>
              <Table columns={columns} data={studentList} />
            </Styles>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentListPage;
