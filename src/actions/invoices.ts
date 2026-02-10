'use server';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const createInvoiceSchema = z.object({
  clientName: z.string().min(2),
  clientEmail: z.string().email(),
  amount: z.string().transform((val) => parseFloat(val)),
  currency: z.string().default('EUR'),
  dueDate: z.string().transform((val) => new Date(val)),
});

export async function createInvoice(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: 'Non authentifié' };
  }

  const validated = createInvoiceSchema.safeParse({
    clientName: formData.get('clientName'),
    clientEmail: formData.get('clientEmail'),
    amount: formData.get('amount'),
    currency: formData.get('currency') || 'EUR',
    dueDate: formData.get('dueDate'),
  });

  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  const { clientName, clientEmail, amount, currency, dueDate } = validated.data;

  // Déterminer le status initial
  const status = dueDate < new Date() ? 'OVERDUE' : 'PENDING';

  await db.invoice.create({
    data: {
      userId: session.user.id,
      clientName,
      clientEmail,
      amount,
      currency,
      dueDate,
      status,
    },
  });

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function updateInvoice(invoiceId: string, formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: 'Non authentifié' };
  }

  // Vérifier ownership
  const invoice = await db.invoice.findUnique({
    where: { id: invoiceId },
    select: { userId: true },
  });

  if (!invoice || invoice.userId !== session.user.id) {
    return { error: 'Facture introuvable' };
  }

  const validated = createInvoiceSchema.safeParse({
    clientName: formData.get('clientName'),
    clientEmail: formData.get('clientEmail'),
    amount: formData.get('amount'),
    currency: formData.get('currency') || 'EUR',
    dueDate: formData.get('dueDate'),
  });

  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  const { clientName, clientEmail, amount, currency, dueDate } = validated.data;

  // Recalculer le status
  const status = dueDate < new Date() ? 'OVERDUE' : 'PENDING';

  await db.invoice.update({
    where: { id: invoiceId },
    data: {
      clientName,
      clientEmail,
      amount,
      currency,
      dueDate,
      status,
    },
  });

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function deleteInvoice(invoiceId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: 'Non authentifié' };
  }

  // Vérifier ownership
  const invoice = await db.invoice.findUnique({
    where: { id: invoiceId },
    select: { userId: true },
  });

  if (!invoice || invoice.userId !== session.user.id) {
    return { error: 'Facture introuvable' };
  }

  await db.invoice.delete({
    where: { id: invoiceId },
  });

  revalidatePath('/dashboard');
  return { success: true };
}

export async function markInvoiceAsPaid(invoiceId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: 'Non authentifié' };
  }

  // Vérifier ownership
  const invoice = await db.invoice.findUnique({
    where: { id: invoiceId },
    select: { userId: true },
  });

  if (!invoice || invoice.userId !== session.user.id) {
    return { error: 'Facture introuvable' };
  }

  await db.invoice.update({
    where: { id: invoiceId },
    data: { status: 'PAID' },
  });

  revalidatePath('/dashboard');
  return { success: true };
}
