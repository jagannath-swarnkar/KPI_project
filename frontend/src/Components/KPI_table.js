import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import {
  Paper,
  Dialog,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  Table,
  TableBody
} from "@material-ui/core";
import Post_kpi from "./post_kpi";
import Axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";

const StyledTableCell = withStyles(theme => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

export default function CustomizedTables(props) {
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    Axios.get("http://localhost:8000/get_kpi_target", {
      params: { token: reactLocalStorage.get("token") }
    })
      .then(res => {
        setRows(res.data);
      })
      .catch(err => console.log("err in getting kpi target", err));
  }, []);

  return (
    <TableContainer component={Paper} style={{ marginBottom: "100px" }}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead style={{ width: "100%", backgroundColor: "red" }}>
          <TableRow>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="right">
              {props.emp_detail.employee_name}
            </StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableHead style={{ backgroundColor: "black" }}>
          <TableRow>
            <StyledTableCell>KPIs</StyledTableCell>
            <StyledTableCell align="right">percentage</StyledTableCell>
            <StyledTableCell align="right">target</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.kpi_name}>
              <StyledTableCell component="th" scope="row">
                {row.kpi_name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.percentage}</StyledTableCell>
              <StyledTableCell align="right">{row.target}</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <div title="add new kpi" style={{ margin: "10px" }}>
        <AddCircleOutlineIcon
          style={{ fontSize: "50px" }}
          onClick={handleClickOpen}
        />
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth="fit-content"
        >
          <Post_kpi
            kpi={props.kpi}
            new_kpi_target={d => {
              setRows(d);
              setOpen(false);
            }}
          />
        </Dialog>
      </div>
    </TableContainer>
  );
}
