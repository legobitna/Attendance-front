import React, { useEffect } from "react";
import "../../App.css";
import styled from "styled-components";
import { useTable } from "react-table";
import { courseActions } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

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

  const handleClickOnCourse = (id) => {
    history.push(`/course/${id}`);
    console.log("handle click:", handleClickOnCourse);
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
              onClick={() => handleClickOnCourse(row.original._id)}
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

const CourseListPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const courseList = useSelector((state) => state.course.courses);

  const columns = React.useMemo(
    () => [
      {
        Header: "Current Course List",
        columns: [
          {
            Header: "Course Name",
            accessor: "name",
          },
          // {
          //   Header: "Week",
          //   accessor: "week",
          // },
          // {
          //   Header: "Information",
          //   accessor: "information",
          // },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(courseActions.getCourse());
  }, [dispatch]);

  return (
    <>
      <div className="main-container">
        <h3 style={{ fontFamily: "Montserrat, sans-serif", color: "#606060" }}>
          Add Course
        </h3>
        <Button
          variant="contained"
          style={{ backgroundColor: "#d74742", color: "white" }}
          type="submit"
          onClick={() => history.push("/course/new")}
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
          Current Course List
        </h1>
        <Styles>
          <Table columns={columns} data={courseList} />
        </Styles>
      </div>
    </>
  );
};

export default CourseListPage;
