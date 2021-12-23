import Image from 'next/image'

import bg from '../../public/img/home/bg.png'

const HeroText = () => (
  <section className="container relative max-w-3xl mx-auto text-center text-white text-shadow-xl">
    <Image src={bg} layout="responsive" alt="" className="opacity-50" />
    <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center py-4 mx-auto my-auto max-h-[100%]">
      <div className="px-4 py-4 m-4 bg-black dark:bg-white dark:bg-opacity-20 sm:py-12 rounded-xl bg-opacity-20">
        <h1 className="mb-4 text-3xl font-bold sm:mb-8 sm:text-5xl font-display">
          Michael Ward
        </h1>
        <h2 className="text-3xl sm:text-5xl font-display">
          Web Technology Expert
        </h2>
      </div>
    </div>
  </section>
)

export default HeroText
