import { useEffect, useState, useRef } from 'react'
/* @ts-ignore no available TS definitions for vanta */
import CLOUDS from 'vanta/dist/vanta.clouds.min'
import * as THREE from 'three'

import type { FC } from 'react'

const HeroLightBg: FC = () => {
  const [vantaEffect, setVantaEffect] = useState(0)
  /** Reference for the JSX element that will contain the clouds effect */
  const cloudsRef = useRef(null)

  useEffect(() => {
    /** If the vantaEffect exists, don't reapply it */
    if (!vantaEffect) setVantaEffect(CLOUDS({ el: cloudsRef.current, THREE }))
    return () => {
      /* @ts-ignore no available TS definitions for vanta */
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return (
    <div
      className="absolute top-0 bottom-0 left-0 right-0 z-10"
      ref={cloudsRef}
    ></div>
  )
}

export default HeroLightBg
