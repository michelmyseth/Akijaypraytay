import React from "react";
import { GetServerSideProps } from "next";
import { Exchange, Users } from "../../data/types/users";
import { Props } from "../../data/types/props";
import { checkingConnection } from "../../util/checkingConnection";
import { Container, TableContainer, Grid } from "@material-ui/core";
import TableHeader from "./component/tableHeader";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import Navbar from "../../components/Navbar";
const History: React.FC<Props> = ({ userData, isToken }) => {
  const [orderDirection, setOrderDirection] = React.useState("");
  const [valueToOrderBy, setValueToOrderBy] = React.useState("");
  const [selectStatus, setSelectStatus] = React.useState("All");
  const [selectData, setSelectData] = React.useState<Exchange[]>(
    userData.exchange.filter((element) => {
      if (element.status === "Pending") {
        return element;
      }
    })
  );
  const [defaultStatus, setDefaultStatus] = React.useState(userData.exchange);
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
  React.useEffect(() => {
    const data: Exchange[] = userData.exchange.filter((element) => {
      if (element.status === selectStatus) {
        return element;
      } else if (selectStatus === "All") {
        return element;
      }
    });
    setSelectData(data);
  }, [selectStatus, defaultStatus]);
  // console.log(selectData);
  return (
    <>
      <Navbar isConnect={isToken} />
      <Container id="containerHistory" maxWidth="lg">
        <Grid container>
          <br />
          <br />
          <br />
          <Grid item xs={2} className="text-center">
            <Button
              id="Allbutton"
              onClick={() => {
                setSelectStatus("All");
              }}
              variant="contained"
              color="primary"
            >
              All
            </Button>
          </Grid>
          <Grid item xs={2} className="text-center">
            <Button
              id="Allbutton"
              onClick={() => {
                setSelectStatus("Waiting");
              }}
              variant="contained"
              color="primary"
            >
              Waiting
            </Button>
          </Grid>
          <Grid item xs={2} className="text-center">
            <Button
              id="Allbutton"
              onClick={() => {
                setSelectStatus("Pending");
              }}
              variant="contained"
              color="primary"
            >
              Pending
            </Button>
          </Grid>
          <Grid item xs={2} className="text-center">
            <Button
              id="Allbutton"
              onClick={() => {
                setSelectStatus("Returned");
              }}
              variant="contained"
              color="primary"
            >
              Returned
            </Button>
          </Grid>
          <Grid item xs={2} className="text-center">
            <Button
              id="Allbutton"
              onClick={() => {
                setSelectStatus("Not returned");
              }}
              variant="contained"
              color="primary"
            >
              Not returned
            </Button>
          </Grid>
          <Grid item xs={2} className="text-center">
            <Button
              id="Allbutton"
              onClick={() => {
                setSelectStatus("Abort");
              }}
              variant="contained"
              color="primary"
            >
              Abort
            </Button>
            <br />
          </Grid>
          <br />
          <br />
        </Grid>
      </Container>
      <Container>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHeader
              valueToOrderBy={valueToOrderBy}
              orderDirection={orderDirection}
              handleRequestSort={handleRequestSort}
            />
            <TableBody>
              {sortedRowInformation(
                selectData,
                getComparator(orderDirection, valueToOrderBy)
              ).map((data, index) => (
                <TableRow key={index}>
                  <TableCell align="center" scope="row">
                    {data._id}
                  </TableCell>
                  <TableCell align="center">{data.item.name}</TableCell>
                  <TableCell align="center">{data.loaner}</TableCell>
                  <TableCell align="center">{data.borrower}</TableCell>
                  <TableCell align="center">{data.return_date}</TableCell>
                  <TableCell align="center">{data.status}</TableCell>
                  <TableCell align="center">
                    <a
                      id="Allbutton"
                      className="btn btn-outline "
                      href={`/tracking/sender/${data._id}/`}
                    >
                      See details
                    </a>
                  </TableCell>
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
