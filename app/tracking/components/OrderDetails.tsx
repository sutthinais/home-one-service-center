import { Card, CardContent, Typography, Divider } from "@mui/material";

const OrderDetails: React.FC = () => {
  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography variant="h6">นาย นพดล นาครินทร์</Typography>
        <Typography variant="body2">SPX Express - TH252505331270Z</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2">รายละเอียดคำสั่งซื้อ</Typography>
      </CardContent>
    </Card>
  );
};

export default OrderDetails;
