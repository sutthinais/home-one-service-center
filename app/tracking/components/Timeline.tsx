import { Card, CardContent, Typography } from "@mui/material";
import {
  Timeline as MUITimeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";

const Timeline: React.FC = () => {
  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <MUITimeline>
          <TimelineItem>
            <TimelineOppositeContent>10:00</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>พัสดุอยู่ระหว่างการนำส่ง</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>08:21</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              พัสดุถึงสาขาปลายทาง: ศรีสะเกษ, ขุนหาญ, สิ
            </TimelineContent>
          </TimelineItem>
          {/* ... รายการเหตุการณ์อื่น ๆ */}
        </MUITimeline>
      </CardContent>
    </Card>
  );
};

export default Timeline;
