import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Podaj imię (min. 2 znaki)."),
  company: z.string().optional(),
  phone: z
    .string()
    .min(9, "Podaj poprawny numer telefonu.")
    .regex(/^[\d\s+()-]{9,}$/, "Podaj poprawny numer telefonu."),
  email: z.string().email("Podaj poprawny adres e-mail."),
  industry: z.string().optional(),
  website: z.string().optional(),
  message: z.string().min(10, "Opisz krótko, czego potrzebujesz (min. 10 znaków)."),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, { message: "Wymagana zgoda na kontakt." }),
  honeypot: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export type SubmitContactResult =
  | { ok: true }
  | { ok: false; error: string };
