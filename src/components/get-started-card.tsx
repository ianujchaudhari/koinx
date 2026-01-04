import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export function GetStartedCard() {
  return (
    <div className="bg-[#0052FE] text-white rounded-lg p-4 sm:p-6">
      <h2 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4">Get Started with KoinX for FREE</h2>
      <p className="text-sm sm:text-base mb-4 sm:mb-6">
        With our range of features that you can equip for free, KoinX allows you to be more educated and aware of your tax
        reports.
      </p>
      <Image
        src="/get-started-illustration.svg"
        alt="Get Started Illustration"
        width={128}
        height={128}
        className="mx-auto mb-4 sm:mb-6 w-28 h-28 sm:w-32 sm:h-32 object-contain"
      />
      <Button variant="secondary" size="lg" className="w-full font-semibold text-sm">
        Get Started for FREE <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}

