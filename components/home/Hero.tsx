import type { FC } from 'react'
import Image from 'next/image'
import bg from '../../public/img/home/bg.jpg'

const Hero: FC = () => (
  <section className="full-width-escape">
    <Image src={bg} alt="" priority />
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="container p-2 py-8 mx-auto md:py-16">
        <h1 className="text-5xl font-bold text-transparent md:text-7xl bg-gradient-to-r from-gray-200 to-gray-300 bg-clip-text font-display">
          Michael
          <br /> Ward
        </h1>
      </div>
    </div>
  </section>
)

export default Hero
