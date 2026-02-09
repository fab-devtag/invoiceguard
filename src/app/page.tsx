import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold">InvoiceGuard</h1>
          <div className="space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Connexion</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Commencer</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Récupérez vos paiements
            <br />
            sans effort
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            InvoiceGuard détecte vos factures impayées et envoie automatiquement
            des relances professionnelles à vos clients.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild>
              <Link href="/signup">Commencer gratuitement</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Se connecter</Link>
            </Button>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 border rounded-lg">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-semibold mb-2">Automatique</h3>
              <p className="text-sm text-muted-foreground">
                Relances envoyées automatiquement à J+3, J+10 et J+30
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="font-semibold mb-2">Professionnel</h3>
              <p className="text-sm text-muted-foreground">
                Emails de relance polis et efficaces
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="font-semibold mb-2">Rentable</h3>
              <p className="text-sm text-muted-foreground">
                Récupérez plus d'argent, plus rapidement
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2026 InvoiceGuard. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}
