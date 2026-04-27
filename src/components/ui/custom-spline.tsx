'use client'

import { lazy, Suspense } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface Props {
  scene: string
  className?: string
  onLoad?: (app: any) => void
}

export default function CustomSpline({ scene, className, onLoad }: Props) {
  return (
    <Suspense fallback={null}>
      <Spline scene={scene} className={className} onLoad={onLoad} />
    </Suspense>
  )
}
