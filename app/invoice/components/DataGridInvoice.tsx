import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import {
  DataGrid,
  ExportCsv,
  GridColDef,
  GridColumnGroupingModel,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { BillingTransaction, IData } from "@/app/types/IBillingTransaction ";
import { fNumber } from "@/utils/format-number";
import { fDateJs } from "@/utils/format-time";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

type Pros = {
  data: IData;
};

export default function DataGridInvoice({ data }: Pros) {
  const columns: GridColDef[] = [
    {
      headerName: "เลขที่เอกสาร",
      field: "doc_no",
      flex: 1.5,
      resizable: false,
      sortable: false,
    },
    {
      headerName: "ประเภท",
      field: "bill_type",
      flex: 1,
      resizable: false,
      sortable: false,
      filterable: false,
    },
    {
      headerName: "ครบกำหนด",
      field: "real_duedate",
      flex: 1,
      valueGetter: (value) => `${fDateJs(value)}`,
      resizable: false,
      sortable: false,
      filterable: false,
    },
    {
      headerName: "ค้างชำระ",
      field: "sum_debt_amount",
      flex: 1,
      align: "right",
      headerAlign: "right",
      resizable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const value = params.value;
        const formatted = fNumber(value); // สมมุติคุณมีฟังก์ชัน format อยู่แล้ว

        return (
          <span style={{ color: value < 0 ? "red" : "inherit" }}>
            {formatted}
          </span>
        );
      },
    },
  ];

  return (
    <Box>
      <DataGrid
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            fontSize: "0.65rem", // ขนาด font หัวตาราง
            fontWeight: "bold",
          },
          "& .MuiDataGrid-cell": {
            fontSize: "0.56rem", // ขนาด font ของ cell ทั่วไป
          },
        }}
        rows={data.detail}
        columns={columns}
        getRowId={(row) => row.doc_no} // ระบุว่าใช้ field ไหนเป็น ID
        rowHeight={35}
        disableAutosize
        disableColumnResize
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
        showToolbar
        disableRowSelectionOnClick
        pagination
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
          density: "compact",
        }}
        pageSizeOptions={[15, 25, 50, 100]}
        localeText={{
          toolbarExport: "ส่งออก",
          toolbarExportCSV: "ส่งออก CSV",
          toolbarFilters: "ค้นหา",
          toolbarFiltersLabel: "ค้นหา",
          toolbarQuickFilterPlaceholder: "ค้นหา",
          paginationRowsPerPage: "แถวต่อหน้า",
          noResultsOverlayLabel: "เราไม่พบผลลัพธ์ของคุณ",
          toolbarQuickFilterLabel: "",
        }}
        slots={{
          toolbar: () => (
            <GridToolbarContainer>
              <Stack sx={{ flex: 1, mx: 0.5, my: 0.5 }}>
                <Typography fontWeight={"bold"} fontSize={"0.85rem"}>
                  {data.branch_name}
                </Typography>
                <Typography fontWeight={"bold"} fontSize={"0.75rem"}>
                  รายการรอเรียกเก็บ{" "}
                  <Typography
                    fontWeight={"bold"}
                    fontSize={"0.75rem"}
                    component={"span"}
                    color="error"
                  >
                    {fNumber(data.sum_debt_amount)}
                  </Typography>
                </Typography>
              </Stack>
              {/* <ExportCsv render={<IconButton />}>
                <FileDownloadIcon fontSize="small" />
              </ExportCsv> */}
              <GridToolbarQuickFilter />
            </GridToolbarContainer>
          ),
        }}
      />
    </Box>
  );
}
