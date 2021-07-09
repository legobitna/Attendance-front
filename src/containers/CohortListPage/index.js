import React, { useEffect } from "react";
import "../../App.css";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { useTable } from "react-table";
import { useHistory } from "react-router-dom";
import { cohortActions } from "../../redux/actions/cohort.actions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
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
    ,
    th {
      background-color: "#d74742";
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
  } = useTable({
    columns,
    data,
  });

  const handleClickOnCohort = (id) => {
    history.push(`/cohort/${id}`);
    console.log("handle click:", handleClickOnCohort);
  };

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
            <tr
              {...row.getRowProps()}
              onClick={() => handleClickOnCohort(row.original._id)}
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

const CohortListPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cohortList = useSelector((state) => state.cohort.cohorts);

  const columns = React.useMemo(
    () => [
      {
        Header: "Current Cohort List",
        columns: [
          {
            Header: "Cohort Name",
            accessor: "name",
          },
          {
            Header: "Course Name",
            accessor: "courseId.name",
          },
          {
            Header: "Week",
            accessor: "week",
          },
          {
            Header: "Zoom Meeting Id",
            accessor: "meetingId",
          },
          {
            Header: "Start Date",
            accessor: "startDate",
          },
          {
            Header: "End Date",
            accessor: "endDate",
          },
        ],
      },
    ],
    []
  );

  const newData = cohortList.map((item) => {
    const ictStartDate = moment
      .utc(item.startDate)
      .local()
      .format("YYYY-MMM-DD");

    const ictEndDate = moment.utc(item.endDate).local().format("YYYY-MMM-DD");

    // To prevent two times of time converting process, make an empty object
    const finalData = { ...item };

    finalData.startDate = ictStartDate;
    if (ictStartDate == "Invalid date") {
      finalData.startDate = "";
    }
    // console.log("ictStartDate", ictStartDate);

    finalData.endDate = ictEndDate;
    if (ictEndDate == "Invalid date") {
      finalData.endDate = "";
    }
    // console.log("ictEndDate", ictEndDate);

    return finalData;
  });

  const data = newData;

  useEffect(() => {
    dispatch(cohortActions.getCohort());
  }, []);

  return (
    <>
      <div className="main-container">
        {console.log("cohortList", cohortList)}
        <h3 style={{ fontFamily: "Montserrat, sans-serif", color: "#606060" }}>
          Add Cohort
        </h3>
        <Button
          variant="contained"
          style={{ backgroundColor: "#d74742", color: "white" }}
          type="submit"
          onClick={() => history.push("/cohort/new")}
        >
          Add
        </Button>
      </div>
      <div className="list-container">
        <h1
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "bold",
            color: "#1a2156",
          }}
        >
          Current Cohort List
        </h1>
        <Styles>
          <Table columns={columns} data={data} />
        </Styles>
      </div>
    </>
  );
};

export default CohortListPage;
