'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
        <a href="#" onClick={handleLinkClick} className="flex items-center">
          <Image src="/Logo.svg" alt="KoinX Logo" width={96} height={24} className="h-6 w-auto" priority />
        </a>
        <div className="flex items-center gap-4 md:gap-8">
          <nav className={`${
            isMenuOpen 
              ? "absolute top-full left-0 right-0 bg-white border-b p-4 flex flex-col gap-4 shadow-lg" 
              : "hidden"
            } md:static md:flex md:flex-row md:items-center md:border-0 md:p-0 md:gap-6 lg:gap-8 md:shadow-none`}>
            <a href="#" onClick={handleLinkClick} className="text-sm font-semibold text-[#0F1629] hover:text-primary">
              Crypto Taxes
            </a>
            <a href="#" onClick={handleLinkClick} className="text-sm font-semibold text-[#0F1629] hover:text-primary">
              Free Tools
            </a>
            <a href="#" onClick={handleLinkClick} className="text-sm font-semibold text-[#0F1629] hover:text-primary">
              Resource Center
            </a>
          </nav>
          <Button className="bg-[#0052FE] hover:bg-[#0052FE]/90 text-sm font-semibold px-4">
            Get Started
          </Button>
          <button 
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  )
}

