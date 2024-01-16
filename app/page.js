import ChipComponent from '@/components/ChipComponent'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#E5E5E5]">
      {/* navbar */}
      <div className='flex items-center justify-between h-[72px] bg-white md:px-16 px-10'>
        <Image src={'assets/logo.svg'} width={87} height={28} />
        <Link target="_blank" className="cursor-pointer" href={'https://www.linkedin.com/in/paarth17032000'}>
          <Image src={'assets/profile.svg'} width={46} height={46} />
        </Link>
      </div>
      {/* chip component */}
      <div className='flex justify-center w-full mt-20'>
        <ChipComponent />
      </div>
    </main>
  )
}
