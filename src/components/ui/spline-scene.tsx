'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Use our local CustomSpline implementation to bypass @splinetool/react-spline resolution issues
const Spline = dynamic(() => import('./custom-spline'), {
  ssr: false,
})

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  )
}
