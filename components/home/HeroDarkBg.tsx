import { useRef, useState, useEffect } from 'react'
/* @ts-ignore no available TS definitions for vanta */
import RINGS from 'vanta/dist/vanta.rings.min'
import * as THREE from 'three'

import type { FC } from 'react'

const HeroDarkBg: FC = () => {
  const [vantaEffect, setVantaEffect] = useState(0)
  /** Reference for the JSX element that will contain the rings effect */
  const ringsRef = useRef(null)

  useEffect(() => {
    /** If the vantaEffect exists, don't reapply it */
    if (!vantaEffect) setVantaEffect(RINGS({ el: ringsRef.current, THREE }))
    return () => {
      /* @ts-ignore no available TS definitions for vanta */
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 z-0 dark:z-20">
      <div
        className="absolute top-0 bottom-0 left-0 right-0 z-10"
        ref={ringsRef}
      ></div>
      <div className="absolute top-0 bottom-0 left-0 right-0 z-20 bg-black bg-opacity-70"></div>
    </div>
  )
}

export default HeroDarkBg
