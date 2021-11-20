import HeroDarkBg from './HeroDarkBg'
import HeroLightBg from './HeroLightBg'
import HeroText from './HeroText'
import type { FC } from 'react'

const Hero: FC = () => (
  <div className="full-width-escape">
    {/* Shows in dark mode */}
    <HeroDarkBg />
    {/* Shows in light mode */}
    <HeroLightBg />
    <HeroText />
  </div>
)

export default Hero
