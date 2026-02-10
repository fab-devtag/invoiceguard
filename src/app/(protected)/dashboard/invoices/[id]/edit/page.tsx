import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { updateInvoice } from '@/actions/invoices';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function EditInvoicePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  const { id } = await params;

  if (!session?.user?.id) {
    return null;
  }

  const invoice = await db.invoice.findUnique({
    where: {
      id: id,
      userId: session.user.id,
    },
  });

  if (!invoice) {
    notFound();
  }

  async function handleUpdate(formData: FormData) {
    'use server';
    await updateInvoice(id, formData);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">← Retour</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Modifier la facture</CardTitle>
            <CardDescription>
              Mettre à jour les informations de la facture
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={handleUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Nom du client</Label>
                <Input
                  id="clientName"
                  name="clientName"
                  type="text"
                  required
                  defaultValue={invoice.clientName}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientEmail">Email du client</Label>
                <Input
                  id="clientEmail"
                  name="clientEmail"
                  type="email"
                  required
                  defaultValue={invoice.clientEmail}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Montant</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    required
                    defaultValue={invoice.amount}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Devise</Label>
                  <Input
                    id="currency"
                    name="currency"
                    type="text"
                    required
                    defaultValue={invoice.currency}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Date d'échéance</Label>
                <Input id="dueDate" name="dueDate" type="date" required />
                <p className="text-xs text-muted-foreground">
                  💡 Si la date est passée, la facture sera marquée "en retard"
                  automatiquement
                </p>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  Mettre à jour
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/dashboard">Annuler</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
