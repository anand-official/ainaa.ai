import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Problem from '@/components/Problem'
import Manifesto from '@/components/Manifesto'
import SocialProof from '@/components/SocialProof'
import ProductPreview from '@/components/ProductPreview'
import HowItWorks from '@/components/HowItWorks'
import WaitlistCounter from '@/components/WaitlistCounter'
import Footer from '@/components/Footer'
import { getWaitlistCount } from '@/lib/supabase'

export const revalidate = 60

export default async function Home() {
  const waitlistCount = await getWaitlistCount()

  return (
    <main>
      <Navbar />
      <Hero />
      <Marquee />
      <Problem />
      <Manifesto />
      <SocialProof />
      <ProductPreview />
      <HowItWorks />
      <WaitlistCounter initialCount={waitlistCount} />
      <Footer />
    </main>
  )
}
