import type { FC } from 'react'
import HeroVideo from './HeroVideo'

const Hero: FC = () => (
  <section className="full-width-escape">
    <HeroVideo />
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="container flex flex-col justify-between h-full p-2 py-4 mx-auto md:py-16">
        <div>
          <h1 className="text-4xl font-bold text-transparent md:text-7xl bg-gradient-to-t from-gray-200 to-blue-300 bg-clip-text font-display">
            Michael Ward
          </h1>
        </div>
        <div>
          <h2 className="text-2xl text-right text-transparent md:text-4xl bg-gradient-to-t from-gray-200 to-blue-300 bg-clip-text font-display">
            Ignite your business
          </h2>
        </div>
      </div>
    </div>
  </section>
)

export default Hero
