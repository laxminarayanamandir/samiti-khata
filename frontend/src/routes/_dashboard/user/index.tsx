import UserPage from '@/features/user/pages/User-Page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/user/')({
  component: UserPage,
})
