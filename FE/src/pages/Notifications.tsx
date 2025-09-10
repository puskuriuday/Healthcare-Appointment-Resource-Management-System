import React, { useEffect, useState } from 'react'
import { notificationApi } from '../api/endpoints'
import { Notification } from '../types'

export const NotificationsPage: React.FC = () => {
  const [list, setList] = useState<Notification[]>([])
  const load = () => notificationApi.list().then(setList)
  useEffect(() => { load() }, [])
  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {list.map(n => (
          <li key={n.id}>
            {n.channel} - {n.status}
          </li>
        ))}
      </ul>
    </div>
  )
}
