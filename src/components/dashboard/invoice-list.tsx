import { Invoice } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { DeleteInvoiceButton } from './delete-invoice-button';
import { MarkAsPaidButton } from './mark-as-paid-button';

export function InvoiceList({ invoices }: { invoices: Invoice[] }) {
  if (invoices.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="mb-4">Aucune facture pour le moment</p>
        <Button asChild>
          <Link href="/dashboard/invoices/new">
            Créer votre première facture
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3 px-5">
      {invoices.map((invoice) => (
        <div
          key={invoice.id}
          className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-950 transition"
        >
          <div className="flex-1">
            <div className="font-medium">{invoice.clientName}</div>
            <div className="text-sm text-muted-foreground">
              {invoice.clientEmail}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Échéance : {new Date(invoice.dueDate).toLocaleDateString('fr-FR')}
            </div>
          </div>

          <div className="text-right mr-4">
            <div className="font-semibold">
              {invoice.amount.toFixed(2)} {invoice.currency}
            </div>
            <div className="mt-1">
              {invoice.status === 'OVERDUE' && (
                <Badge variant="destructive">En retard</Badge>
              )}
              {invoice.status === 'PAID' && (
                <Badge className="bg-green-600">Payée</Badge>
              )}
              {invoice.status === 'PENDING' && (
                <Badge variant="secondary">En attente</Badge>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            {invoice.status !== 'PAID' && (
              <MarkAsPaidButton invoiceId={invoice.id} />
            )}
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/invoices/${invoice.id}/edit`}>
                Modifier
              </Link>
            </Button>
            <DeleteInvoiceButton invoiceId={invoice.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
