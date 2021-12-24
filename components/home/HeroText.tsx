import Bg from '../../public/img/home/bg.svg'

const HeroText = () => (
  <section className="container max-w-3xl mx-auto text-left text-white text-shadow-xl">
    <div className="relative mx-4 sm:mx-8">
      <div className="overflow-hidden rounded-xl">
        <Bg />
      </div>
      <div className="absolute top-0 bottom-0 left-0 flex flex-col justify-top py-4 mx-auto my-auto max-h-[100%]">
        <div className="px-4 m-4">
          <h1 className="pb-4 mb-2 text-2xl font-bold border-b-2 border-white sm:mb-4 sm:text-5xl font-display">
            Michael Ward
          </h1>
          <h2 className="text-xl sm:text-4xl font-display">Web Tech Expert</h2>
        </div>
      </div>
    </div>
  </section>
)

export default HeroText
