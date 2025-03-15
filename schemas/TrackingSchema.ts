import * as z from "zod";

export const DetailSchema = z.object({
  "doc_date": z.coerce.date(),
  "doc_no": z.string(),
  "branch_name": z.string(),
  "item_code": z.string(),
  "item_name": z.string(),
  "unit_code": z.string(),
  "used_qty": z.string(),
  "price": z.string(),
});
export type Detail = z.infer<typeof DetailSchema>;

export const HistorySchema = z.object({
  date_time: z.string(),
  status: z.number(),
  status_message: z.string(),
});
export type History = z.infer<typeof HistorySchema>;

export const TuckLocationSchema = z.object({
  "gps_id": z.string(),
  "truck_name": z.string(),
  "truck_license": z.string(),
  "time": z.coerce.date(),
  "gps_speed": z.number(),
  "mileage": z.number(),
  "sub_district_th": z.string(),
  "district_th": z.string(),
  "province_th": z.string(),
  "station_name": z.string(),
});
export type TuckLocation = z.infer<typeof TuckLocationSchema>;

export const TrackingSchema = z.object({
  doc_no: z.string(),
  show_detail: z.boolean().default(false),
  customer_telephone: z.string(),
  telephone: z.string(),
  location_name: z.string(),
  doc_confirm: z.string(),
  shipment_id: z.string(),
  ref_doc_no: z.string(),
  status: z.number(),
  license_plate: z.string(),
  truck_gps_code: z.string(),
  history: z.array(HistorySchema),
  history_booking: z.array(HistorySchema),
  tuck_location: z.union([TuckLocationSchema, z.null()]),
  images: z.array(z.string()),
  detail: z.array(DetailSchema),
});
export type Tracking = z.infer<typeof TrackingSchema>;
