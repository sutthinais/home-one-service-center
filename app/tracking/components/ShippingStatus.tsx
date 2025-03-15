import { Card, CardContent, Typography, LinearProgress } from "@mui/material";

const ShippingStatus: React.FC = () => {
  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography variant="h6">จะได้รับสินค้าภายใน 09 มี.ค.</Typography>
        <LinearProgress variant="determinate" value={70} sx={{ my: 2 }} />
        <Typography variant="body2">
          เข้ารับพัสดุแล้ว - อยู่ระหว่างการจัดส่ง - จัดส่งสำเร็จ
        </Typography>
        <Typography variant="body2">
          <a href="#">
            เข้าเงื่อนไข "เช็กก่อนจ่าย คืนได้ทันที" ข้อมูลเพิ่มเติม
          </a>
        </Typography>
        <Typography variant="body2">
          <a href="#">
            การันตีวันจัดส่งสินค้า: รับโค้ดส่วนลด B30 หากไม่ได้รับสินค้าภายใน
            10-03-2025 ดูเพิ่มเติม
          </a>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ShippingStatus;
