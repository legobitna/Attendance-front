import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTable, useSortBy, useFilters } from "react-table";
import moment, { duration } from "moment";
import "moment-duration-format";
import CohortSidebar from "../../components/cohortSidebar";
import { useSelector, useDispatch } from "react-redux";
import { cohortActions } from "../../redux/actions/cohort.actions";
import LogModal from "../../components/logModal";
import { Filter, DefaultColumnFilter } from "../../components/filters";
import { SelectColumnFilter } from "../../components/filters";
import { studentActions } from "../../redux/actions";
import Button from "@material-ui/core/Button";

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
    tbody {
      background-color: white;
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
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState({});

  const handleOpen = (originalData) => {
    setRowData(originalData);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Render the UI for your table
  return (
    <>
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
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  if (cell.column.id == "checkbox") {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  }
                  return (
                    <td
                      {...cell.getCellProps()}
                      onClick={() => handleOpen(row.original)}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <LogModal handleClose={handleClose} open={open} rowData={rowData} />
    </>
  );
}

const AttendancePage = () => {
  const dispatch = useDispatch();
  const rawAttendanceList = useSelector(
    (state) => state.attendance.attendanceList
  );
  const rawNotFoundList = useSelector((state) => state.attendance.notFoundList);
  const [selected, setSelected] = useState([]);

  const [selectedSession, setSelectedSession] = useState("");

  useEffect(() => {
    setSelected([]);
  }, [selectedSession]);

  const toggleRow = (user, selectedSession) => {
    let selectedList = [...selected];
    let exist = selectedList.findIndex((item) => item.id == user.id);

    if (exist !== -1) {
      selectedList.splice(exist, 1);
    } else {
      selectedList.push(user);
    }

    setSelected([...selectedList]);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Student List",

        columns: [
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Zoom Id",
            accessor: "zoomId",
          },
          {
            Header: "Join Time",
            accessor: "record.join_time",
            disableFilters: true,
            minWidth: 400,
          },
          {
            Header: "Leave Time",
            accessor: "record.leave_time",
            disableFilters: true,
            minWidth: 400,
          },
          {
            Header: "Duration",
            accessor: "record.duration",
            disableFilters: true,
          },
          {
            Header: "Student Status",
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
            Header: "Attendance Status",
            accessor: "record.attendance",
            Filter: SelectColumnFilter,
            filter: "equals",
            Cell: (row) => (
              <span>
                <span
                  style={{
                    color:
                      row.value === "attend"
                        ? "#57d500"
                        : row.value === "late"
                        ? "#ffbf00"
                        : "#ff2e00",
                    transition: "all .5s ease",
                  }}
                >
                  &#x25cf;
                </span>{" "}
                {row.value === "attend"
                  ? "Attend"
                  : row.value === "late"
                  ? `Late`
                  : "Miss"}
              </span>
            ),
          },
        ],
      },
    ],
    [selected]
  );
  const notFoundColumns = React.useMemo(
    () => [
      {
        Header: "Not Found List",

        columns: [
          {
            id: "checkbox",
            accessor: "",
            disableFilters: true,
            Cell: ({ cell }) => {
              return (
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selected.some(
                    (item) => item.id == cell.row.original.id
                  )}
                  onChange={() => toggleRow(cell.row.original)}
                />
              );
            },
          },
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Zoom Id",
            accessor: "user_email",
          },
          {
            Header: "Join Time",
            accessor: "join_time",
            disableFilters: true,
            minWidth: 400,
          },
          {
            Header: "Leave Time",
            accessor: "leave_time",
            disableFilters: true,
            minWidth: 400,
          },
          {
            Header: "Duration",
            accessor: "duration",
            disableFilters: true,
          },
          {
            Header: "Student Status",
            accessor: "status",
            Filter: SelectColumnFilter,
            filter: "equals",
          },
          {
            Header: "attendance Status",
            accessor: "attendance",
            Filter: SelectColumnFilter,
            filter: "equals",
            Cell: (row) => (
              <span>
                <span
                  style={{
                    color:
                      row.value === "attend"
                        ? "#57d500"
                        : row.value === "late"
                        ? "#ffbf00"
                        : "#ff2e00",
                    transition: "all .5s ease",
                  }}
                >
                  &#x25cf;
                </span>{" "}
                {row.value === "attend"
                  ? "Attend"
                  : row.value === "late"
                  ? `Late`
                  : "Miss"}
              </span>
            ),
          },
        ],
      },
    ],
    [selected]
  );
  const attendanceList = rawAttendanceList.map((item) => {
    let finalData = { ...item };

    if (item.record) {
      const ictJoinTime = moment
        .utc(item.record.join_time)
        .local()
        .format("MMM-DD-YYYY h:mm A");

      const ictLeaveTime = moment
        .utc(item.record.leave_time)
        .local()
        .format("MMM-DD-YYYY h:mm A");

      const durationTime = moment
        .duration(item.record.duration, "seconds")
        .format("hh:mm:ss");
      finalData.record.join_time = ictJoinTime;
      finalData.record.leave_time = ictLeaveTime;
      finalData.record.duration = durationTime;
    } else {
      finalData.record = { log: [] };
    }
    return finalData;
  });

  const notFoundList = rawNotFoundList.map((item) => {
    let finalData = { ...item };

    const ictJoinTime = moment
      .utc(item.join_time)
      .local()
      .format("MMM-DD-YYYY h:mm A");

    const ictLeaveTime = moment
      .utc(item.leave_time)
      .local()
      .format("MMM-DD-YYYY h:mm A");

    const durationTime = moment
      .duration(item.duration, "seconds")
      .format("hh:mm:ss");
    finalData.join_time = ictJoinTime;
    finalData.leave_time = ictLeaveTime;
    finalData.duration = durationTime;

    return finalData;
  });

  const addStudent = () => {
    const find = selected.find((item) => item.user_email == "");
    if (find) {
      alert(
        "Only User with Zoom ID can be added." +
          "\n" +
          "Please check if the selected person has Zoom ID!"
      );
      return;
    }
    dispatch(studentActions.registerStudentList(selected, selectedSession));
    setSelected([]);
  };

  useEffect(() => {
    dispatch(cohortActions.getCohort());
  }, []);

  return (
    <div className="main-container">
      {console.log("selected", selected)}
      <h1
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "bold",
          color: "#1a2156",
        }}
      >
        Attendance List
      </h1>
      <div>
        {" "}
        <Styles>
          <Table
            columns={columns}
            data={attendanceList}
            className="-striped -highlight"
          />
        </Styles>
      </div>

      {notFoundList.length > 0 ? (
        <>
          <h1
            style={{
              marginTop: "50px",
              marginBottom: "15px",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: "bold",
              color: "#1a2156",
            }}
          >
            Not Registered Yet
          </h1>

          <Button
            variant="contained"
            style={{
              backgroundColor: "#2a7592",
              color: "white",
              marginBottom: "15px",
              fontFamily: "Montserrat, sans-serif",
            }}
            onClick={() => addStudent()}
          >
            Add student
          </Button>

          <div>
            {" "}
            <Styles>
              <Table columns={notFoundColumns} data={notFoundList} />
            </Styles>
          </div>
        </>
      ) : (
        <></>
      )}
      <CohortSidebar setSelectedSession={setSelectedSession} />
    </div>
  );
};

export default AttendancePage;
