import Image from 'next/image'

import bg from '../../public/img/home/bg.png'

const HeroText = () => (
  <section
    className="container relative max-w-5xl text-center text-white text-shadow-xl"
    style={{ margin: '-10% auto -10%' }}
  >
    <Image src={bg} layout="responsive" alt="" />
    <div
      className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-between mx-auto my-auto bg-white dark:bg-black bg-opacity-40"
      style={{ height: '50.5%', aspectRatio: '1/1' }}
    >
      <h1 className="pt-4 text-2xl sm:text-3xl md:text-4xl">Michael Ward</h1>
      <h2 className="my-4 text-2xl font-bold sm:text-3xl md:my-32 xl:my-20 md:text-6xl xl:text-7xl font-display">
        Your Web Technology Expert
      </h2>

      <div className="hidden pb-4 full-width-escape sm:block">
        <h3 className="mt-4 sm:text-2xl md:text-3xl md:mt-0">
          Full-stack development
          <br />
          <small>React, Next.js, PHP, Laravel, eCommerce</small>
        </h3>
      </div>
    </div>
  </section>
)

export default HeroText
