import { signup } from '@/actions/auth';
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
import { redirect } from 'next/navigation';

export default function SignupPage() {
  async function handleSignup(formData: FormData) {
    'use server';
    const result = await signup(formData);

    if (result.error) {
      // TODO: Afficher l'erreur (on fera avec toast plus tard)
      console.error(result.error);
      return;
    }

    redirect('/login');
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Créer un compte</CardTitle>
        <CardDescription>
          Commencez à récupérer vos paiements dès aujourd'hui
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom (optionnel)</Label>
            <Input id="name" name="name" type="text" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="vous@exemple.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="Minimum 6 caractères"
            />
          </div>

          <Button type="submit" className="w-full">
            Créer mon compte
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            Vous avez déjà un compte ?{' '}
            <Link href="/login" className="underline">
              Se connecter
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
