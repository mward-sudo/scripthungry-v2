import type { ReactElement } from 'react'

interface Hero {
  (): ReactElement<any, any>
}

const Hero: Hero = () => (
  <section className="py-[12.5vh] full-width-escape bg-primary text-neutral">
    <div className="container px-4 mx-auto">
      <h1 className="pb-4 mt-16 mb-2 text-4xl font-bold sm:mb-4 sm:text-5xl lg:text-7xl font-display">
        Michael Ward
      </h1>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display">
        Web Tech Expert
      </h2>
    </div>
  </section>
)

export default Hero
