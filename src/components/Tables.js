import "../App.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Tables({ error, isLoading, finallArray }) {
  return (
    <div
      style={{
        opacity: !error && isLoading && "0.5",
        pointerEvents: !error && isLoading && "none",
      }}
    >
      {error && <div>{error}</div>}
      {!error && (
        <TableContainer component={Paper}>
          <div className="Loading">
            {isLoading && <CircularProgress color="inherit" />}
          </div>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="left">Profit & Loss</StyledTableCell>
                <StyledTableCell align="left">Account Type</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {finallArray.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.currency + " " + row.profitLoss}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.accountType}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default Tables;
