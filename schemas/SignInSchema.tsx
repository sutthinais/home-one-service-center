import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const SignInSchema = z.object({
  tax_id: z.string(),
  user_id: z.string(),
});

export type SignInFormData = z.infer<typeof SignInSchema>;
