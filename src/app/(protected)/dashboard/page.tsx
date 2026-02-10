import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { InvoiceList } from '@/components/dashboard/invoice-list';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      stripeSubscriptionStatus: true,
      _count: {
        select: {
          invoices: true,
        },
      },
    },
  });

  const hasActiveSubscription = user?.stripeSubscriptionStatus === 'active';

  const invoices = await db.invoice.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  const overdueInvoices = invoices.filter((inv) => inv.status === 'OVERDUE');

  const totalOverdue = overdueInvoices.reduce(
    (sum, inv) => sum + inv.amount,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {!hasActiveSubscription && (
        <Card className="mb-6 border-orange-800 bg-orange-950">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">🔒 Abonnement requis</h3>
                <p className="text-sm text-muted-foreground">
                  Souscrivez à un abonnement pour activer les relances
                  automatiques
                </p>
              </div>
              <Button asChild>
                <Link href="/billing">S'abonner</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Total factures
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{invoices.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Factures en retard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {overdueInvoices.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Montant impayé
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {totalOverdue.toFixed(2)} €
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Mes factures</CardTitle>
          <Button asChild>
            <Link href="/dashboard/invoices/new">Créer une facture</Link>
          </Button>
        </CardHeader>
        <InvoiceList invoices={invoices} />
      </Card>
    </div>
  );
}
