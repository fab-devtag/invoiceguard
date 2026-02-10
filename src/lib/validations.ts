import { z } from 'zod';

export const invoiceSchema = z.object({
  clientName: z.string().min(2, 'Nom du client requis'),
  clientEmail: z.string('Email invalide'),
  amount: z.number().positive('Le montant doit être positif'),
  currency: z.string().default('EUR'),
  dueDate: z.date(),
});

export const invoiceUpdateSchema = invoiceSchema.partial();
