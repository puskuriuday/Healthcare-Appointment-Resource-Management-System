import React, { useEffect, useState } from 'react'
import { billingApi } from '../api/endpoints'
import { Invoice } from '../types'

export const BillingPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  useEffect(() => { billingApi.invoices().then(setInvoices) }, [])
  return (
    <div>
      <h2>Invoices</h2>
      <table>
        <thead><tr><th>ID</th><th>Status</th><th>Total</th></tr></thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.id}>
              <td>{inv.id}</td>
              <td>{inv.status}</td>
              <td>{(inv.totalAmountCents/100).toFixed(2)} {inv.currency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
