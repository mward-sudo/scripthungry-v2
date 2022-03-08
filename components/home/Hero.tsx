import type { ReactElement } from 'react'

import Lottie from 'lottie-react'
import designAnimation from '../../lottie-assets/design.json'

interface Hero {
  (): ReactElement<any, any>
}

const Hero: Hero = () => (
  <section className="min-h-screen bg-gradient-to-b full-width-escape from-primary via-primary">
    <div className="container flex flex-col gap-[1vh] justify-around px-4 pt-16 pb-24 mx-auto -mt-16 min-h-screen text-center">
      <div>
        <Lottie animationData={designAnimation} className="h-[40vh]" />
      </div>
      <div>
        <h1 className="text-[6vh] font-bold font-display">Web Sites</h1>
        <h2 className="text-[3vh] font-display">by Michael Ward</h2>
      </div>
      <div>
        <button className="btn btn-wide btn-accent lg:btn-xl lg:text-xl">
          Find out more
        </button>
      </div>
    </div>
  </section>
)

export default Hero
