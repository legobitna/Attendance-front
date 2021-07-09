import React from "react";
import { Input, CustomInput } from "reactstrap";

export const Filter = ({ column }) => {
  return (
    <div style={{ marginTop: 7 }}>
      {column.canFilter && column.render("Filter")}
    </div>
  );
};

export const DefaultColumnFilter = ({
  column: {
    filterValue,
    setFilter,
    preFilteredRows: { length },
  },
}) => {
  return (
    <Input
      value={filterValue || ""}
      style={{
        width: "200px",
        fontSize: "1rem",
        padding: "0.5rem 0.7rem",
        backgroundColor: "white",
        borderRadius: "5px",
        border: "1px solid rgba(0, 0, 0, 0.2)",
        maxWidth: "100%",
      }}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`search among (${length}) lists`}
    />
  );
};

export const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <CustomInput
      id="custom-select"
      type="select"
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </CustomInput>
  );
};
