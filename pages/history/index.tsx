import React from "react";
import { GetServerSideProps } from "next";
import { Users } from "../../data/types/users";
import { Props } from "../../data/types/props";
import { checkingConnection } from "../../util/checkingConnection";
import { Container, TableContainer } from "@material-ui/core";
import TableHeader from "./component/tableHeader";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";

const History: React.FC<Props> = ({ userData }) => {
  const [orderDirection, setOrderDirection] = React.useState("");
  const [valueToOrderBy, setValueToOrderBy] = React.useState("");

  const handleRequestSort = (event, property) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const sortedRowInformation = (rowArray, comparator) => {
    const stabilizedRowArray = rowArray.map((el, index) => [el, index]);
    stabilizedRowArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedRowArray.map((el) => el[0]);
  };

  return (
    <>
      <Container maxWidth="lg">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHeader
              valueToOrderBy={valueToOrderBy}
              orderDirection={orderDirection}
              handleRequestSort={handleRequestSort}
            />
            <TableBody>
              {sortedRowInformation(
                userData.exchange,
                getComparator(orderDirection, valueToOrderBy)
              ).map((data, index) => (
                <TableRow key={index}>
                  <TableCell align="right" scope="row">
                    {data._id}
                  </TableCell>
                  <TableCell align="right">{data.item.name}</TableCell>
                  <TableCell align="right">{data.loaner}</TableCell>
                  <TableCell align="right">{data.borrower}</TableCell>
                  <TableCell align="right">{data.return_date}</TableCell>
                  <TableCell align="right">{data.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default History;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userToken = context.req.cookies.token;

  const checkConnectionValidity = await checkingConnection(userToken);
  // console.log("DB", checkConnectionValidity);

  return checkConnectionValidity;
};
