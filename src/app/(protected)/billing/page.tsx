import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BillingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Abonnement</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Starter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-4">15€/mois</div>
            <p className="text-muted-foreground mb-4">Parfait pour démarrer</p>
            <ul className="space-y-2 text-sm mb-6">
              <li>✓ Jusqu'à 20 factures</li>
              <li>✓ Relances automatiques</li>
              <li>✓ Support email</li>
            </ul>
            {/* On ajoutera le bouton Stripe plus tard */}
          </CardContent>
        </Card>

        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Pro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-4">29€/mois</div>
            <p className="text-muted-foreground mb-4">
              Pour les professionnels
            </p>
            <ul className="space-y-2 text-sm mb-6">
              <li>✓ Factures illimitées</li>
              <li>✓ Relances automatiques</li>
              <li>✓ Support prioritaire</li>
            </ul>
            {/* On ajoutera le bouton Stripe plus tard */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
