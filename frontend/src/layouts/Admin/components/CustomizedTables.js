import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
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

    export default function CustomizedTables({ rows, headers }) {
    const handleDelete = () => {//fonction mta3 el delete
        console.log("delete");
    };

    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                {headers.map((header) => (
                <StyledTableCell>{header}</StyledTableCell>
                ))}
                <StyledTableCell>Action</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <StyledTableRow key={row.ID}>
                {headers.map((header) => (
                    <StyledTableCell align="left">{row[header]}</StyledTableCell>
                ))}
                <StyledTableCell>
                    <Link to={"show/" + row.ID}>
                    <VisibilityIcon color="action" />
                    </Link>
                    <Link to={"edit/" + row.ID}>
                    <EditIcon color="primary" />
                    </Link>
                    <DeleteIcon
                    color="error"
                    style={{ cursor: "pointer" }}
                    onClick={handleDelete}
                    />
                </StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}
