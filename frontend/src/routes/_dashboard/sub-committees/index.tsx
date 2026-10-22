import SubCommitteePage from '@/features/committees/pages/SubCommittee-Page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/sub-committees/')({
  component: SubCommitteePage,
})
