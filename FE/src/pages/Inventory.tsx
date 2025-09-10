import React, { useEffect, useState } from 'react'
import { inventoryApi } from '../api/endpoints'
import { InventoryItem } from '../types'

export const InventoryPage: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([])
  useEffect(() => { inventoryApi.list().then(setItems) }, [])
  return (
    <div>
      <h2>Inventory</h2>
      <ul>
        {items.map(i => <li key={i.id}>{i.name} ({i.rtype})</li>)}
      </ul>
    </div>
  )
}
