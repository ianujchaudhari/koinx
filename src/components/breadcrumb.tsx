import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export function Breadcrumb() {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
      <Link href="/cryptocurrencies" className="hover:text-primary">
        Cryptocurrencies
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-black">Bitcoin</span>
    </div>
  )
}

