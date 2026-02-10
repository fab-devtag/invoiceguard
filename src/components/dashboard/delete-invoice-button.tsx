'use client';

import { deleteInvoice } from '@/actions/invoices';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function DeleteInvoiceButton({ invoiceId }: { invoiceId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette facture ?')) {
      return;
    }

    setIsDeleting(true);
    await deleteInvoice(invoiceId);
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? 'Suppression...' : 'Supprimer'}
    </Button>
  );
}
