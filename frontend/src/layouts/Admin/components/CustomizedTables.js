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
import axios from "../../../api/axios";
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

export default function CustomizedTables({ rows, headers, type }) {
    const deleteStudent = async (id) => {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/admin/students/delete/${id}`
        );
        console.log("Object deleted successfully");
        // Handle any additional logic after deleting the object
      } catch (error) {
        console.log("Error deleting object: ", error);
        // Handle error cases
      }
    };
  
    const deleteTeacher = async (id) => {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/admin/teachers/delete/${id}`
        );
        console.log("Object deleted successfully");
        // Handle any additional logic after deleting the object
      } catch (error) {
        console.log("Error deleting object: ", error);
        // Handle error cases
      }
    };
  
    const handleDelete = (id) => {
      if (type === "student") {
        deleteStudent(id); 
        
      } else if (type === "teacher") {
        deleteTeacher(id);
      }
      console.log("===================deletestudent")
      console.log("===================type",type)
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
              <StyledTableRow key={row.id}>
                {headers.map((header) => (
                  <StyledTableCell align="left">{row[header]}</StyledTableCell>
                ))}
                <StyledTableCell>
                  <Link to={"show/" + row.id}>
                    <VisibilityIcon color="action" />
                  </Link>
                  <Link to={"edit/" + row.id}>
                    <EditIcon color="primary" />
                  </Link>
                  <DeleteIcon
                    color="error"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(row.id)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  