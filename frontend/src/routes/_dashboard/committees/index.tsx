import CommitteePage from '@/features/committees/pages/Committee-Page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/committees/')({
  component: CommitteePage,
})
