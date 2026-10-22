import IncomePage from '@/features/income/pages/Income-Page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/income/')({
  component: IncomePage,
})
