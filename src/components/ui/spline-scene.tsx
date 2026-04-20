'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Use our local CustomSpline implementation to bypass the official react wrapper resolution issues
const Spline = dynamic(() => import('./custom-spline'), {
  ssr: false,
})

interface SplineSceneProps {
  scene: string
  className?: string
  onLoad?: (app: any) => void
}

export function SplineScene({ scene, className, onLoad }: SplineSceneProps) {
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
        onLoad={onLoad}
      />
    </Suspense>
  )
}
