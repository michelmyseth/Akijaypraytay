import React from "react";
import { GetServerSideProps } from "next";
import { Users } from "../../../data/types/users";
import { Props } from "../../../data/types/props";
import { checkingConnection } from "../../../util/checkingConnection";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

export default function TableHeader(props) {
  const { valueToOrderBy, orderDirection, handleRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };
  return (
    <div>
      <TableHead>
        <TableRow>
          <TableCell key="_id">
            <TableSortLabel
              active={valueToOrderBy === "_id"}
              direction={valueToOrderBy === "_id" ? orderDirection : "asc"}
              onClick={createSortHandler("_id")}
            >
              ID
            </TableSortLabel>
          </TableCell>

          <TableCell key="name">
            <TableSortLabel
              active={valueToOrderBy === "name"}
              direction={valueToOrderBy === "name" ? orderDirection : "asc"}
              onClick={createSortHandler("name")}
            >
              Name items
            </TableSortLabel>
          </TableCell>
          <TableCell key="loaner">
            <TableSortLabel
              active={valueToOrderBy === "loaner"}
              direction={valueToOrderBy === "loaner" ? orderDirection : "asc"}
              onClick={createSortHandler("loaner")}
            >
              loaner
            </TableSortLabel>
          </TableCell>
          <TableCell key="borrower">
            <TableSortLabel
              active={valueToOrderBy === "borrower"}
              direction={valueToOrderBy === "borrower" ? orderDirection : "asc"}
              onClick={createSortHandler("borrower")}
            >
              borrower
            </TableSortLabel>
          </TableCell>
          <TableCell key="return_date">
            <TableSortLabel
              active={valueToOrderBy === "return_date"}
              direction={
                valueToOrderBy === "return_date" ? orderDirection : "asc"
              }
              onClick={createSortHandler("return_date")}
            >
              return_date
            </TableSortLabel>
          </TableCell>
          <TableCell key="status">
            <TableSortLabel
              active={valueToOrderBy === "status"}
              direction={valueToOrderBy === "status" ? orderDirection : "asc"}
              onClick={createSortHandler("status")}
            >
              status
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userToken = context.req.cookies.token;

  const checkConnectionValidity = await checkingConnection(userToken);
  // console.log("DB", checkConnectionValidity);

  return checkConnectionValidity;
};
