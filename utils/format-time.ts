import { format, getTime, formatDistanceToNow } from "date-fns";
import { th } from "date-fns/locale";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import thDay from "dayjs/locale/th";

// ----------------------------------------------------------------------

export function fDateJs(date: Date, newFormat?: string) {
  const fm = newFormat || "DD MMM BBBB";
  dayjs.extend(buddhistEra);
  return dayjs(date).locale(thDay).format(fm);
}

export function fDate(date: Date, newFormat?: string) {
  const fm = newFormat || "dd MMM yyyy";
  return date
    ? format(new Date(date), fm, {
        locale: th,
      })
    : "";
}

export function fDateTime(date: Date, newFormat: string) {
  const fm = newFormat || "dd MMM yyyy p";

  return date
    ? format(new Date(date), fm, {
        locale: th,
      })
    : "";
}

export function fTime(date: Date) {
  return date ? format(new Date(date), "HH:mm") : "";
}

export function fTimestamp(date: Date) {
  return date ? getTime(new Date(date)) : "";
}

export function fToNow(date: Date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: th,
      })
    : "";
}

export function fGenerateYear(count: number) {
  return Array.from(
    { length: count },
    (_, i) => Number(new Date().getFullYear()) + 543 - i
  );
}
