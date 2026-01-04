import { ChevronRight } from 'lucide-react'

export function Breadcrumb() {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
      <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-primary">
        Cryptocurrencies
      </a>
      <ChevronRight className="h-4 w-4" />
      <span className="text-black">Bitcoin</span>
    </div>
  )
}

