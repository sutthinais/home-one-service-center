import { BillingTransaction } from "@/app/types/IBillingTransaction ";
import { fDateJs } from "@/utils/format-time";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

type Pros = {
  rows: BillingTransaction[];
};

export default function TableInvoice({ rows }: Pros) {
  return (
    <TableContainer component={Paper}>
      <Table
        size="small"
        aria-label="simple table"
        sx={{
          tableLayout: "fixed",
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              fontSize: "1rem",
            }}
          >
            <TableCell sx={{ width: "40%", fontSize: "0.75rem" }}>
              เลขที่เอกสาร
            </TableCell>
            <TableCell sx={{ width: "15%", fontSize: "0.75rem" }}>
              ประเภท
            </TableCell>
            <TableCell sx={{ width: "25%", fontSize: "0.75rem" }}>
              ครบกำหนด
            </TableCell>
            <TableCell sx={{ width: "20%", fontSize: "0.75rem" }} align="right">
              ยอดรวม
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.doc_no}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell
                sx={{
                  fontSize: "0.55rem",
                }}
                component="th"
                scope="row"
              >
                {row.doc_no}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "0.55rem",
                }}
                component="th"
              >
                {row.bill_type}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "0.55rem",
                }}
                component="th"
              >
                {fDateJs(row.real_duedate)}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "0.55rem",
                  color: Number(row.sum_debt_amount) < 0 ? "red" : "",
                }}
                align="right"
              >
                {row.sum_debt_amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
