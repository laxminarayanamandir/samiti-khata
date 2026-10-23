import ReceiptBookPage from '@/features/receipt-books/pages/Receipt-Book-Page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/receipt-books/')({
  component: ReceiptBookPage,
})