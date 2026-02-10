'use client';

import { markInvoiceAsPaid } from '@/actions/invoices';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function MarkAsPaidButton({ invoiceId }: { invoiceId: string }) {
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleMarkAsPaid() {
    setIsUpdating(true);
    await markInvoiceAsPaid(invoiceId);
  }

  return (
    <Button
      variant="default"
      size="sm"
      onClick={handleMarkAsPaid}
      disabled={isUpdating}
      className="bg-green-600 hover:bg-green-700"
    >
      {isUpdating ? 'Mise à jour...' : 'Marquer payée'}
    </Button>
  );
}
