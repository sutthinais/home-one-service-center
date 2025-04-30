import { Box, Paper } from "@mui/material";
import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { BillingTransaction } from "@/app/types/IBillingTransaction ";
import { fNumber } from "@/utils/format-number";

type Pros = {
  rows: BillingTransaction[];
};

export default function DataGridInvoice({ rows }: Pros) {
  const columns: GridColDef[] = [
    {
      headerName: "เลขที่เอกสาร",
      field: "doc_no",
      width: 180,
    },
    {
      headerName: "ยอดเงิน",
      field: "sum_debt_amount",
      width: 180,
      align: "right",
      valueGetter: (value) => `${fNumber(value)}`,
    },
  ];
  return (
    <Box>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.doc_no} // ระบุว่าใช้ field ไหนเป็น ID
        initialState={{
          //   pagination: {
          //     paginationModel: {
          //       pageSize: 15,
          //     },
          //   },
          density: "compact",
        }}
        // pageSizeOptions={[15, 25, 50, 100]}
      />
    </Box>
  );
}
