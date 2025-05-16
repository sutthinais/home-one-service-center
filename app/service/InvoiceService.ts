import { CONFIG } from "@/config/dotenv";
import axios from "axios";

export async function CreditWaitingArcustomer(to_id: string) {
  if (!to_id) {
    throw new Error("to_id is required");

  }
  const response = await axios.get(
    `${CONFIG.NEXT_PUBLIC_API_URL}/line/senCreditWaitingArcustomerToFlexLineMessageRoute?to_id=${to_id}`
  );

  return response.data;
}
