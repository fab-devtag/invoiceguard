import { createInvoice } from '@/actions/invoices';
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

export default function NewInvoicePage() {
  async function handleCreate(formData: FormData) {
    'use server';
    await createInvoice(formData);
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
            <CardTitle>Créer une facture</CardTitle>
            <CardDescription>
              Ajoutez une nouvelle facture à surveiller
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Nom du client</Label>
                <Input
                  id="clientName"
                  name="clientName"
                  type="text"
                  required
                  placeholder="Ex: ACME Corp"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientEmail">Email du client</Label>
                <Input
                  id="clientEmail"
                  name="clientEmail"
                  type="email"
                  required
                  placeholder="contact@acme.com"
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
                    placeholder="1000.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Devise</Label>
                  <Input
                    id="currency"
                    name="currency"
                    type="text"
                    defaultValue="EUR"
                    required
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
                  Créer la facture
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
