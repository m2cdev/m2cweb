'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { Application } from '@splinetool/runtime'

interface CustomSplineProps {
  scene: string
  className?: string
  onLoad?: (app: Application) => void
}

export default function CustomSpline({ scene, className, onLoad }: CustomSplineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!canvasRef.current) return

    let app: Application

    async function init() {
      try {
        const { Application } = await import('@splinetool/runtime')
        app = new Application(canvasRef.current!)
        await app.load(scene)
        setLoading(false)
        if (onLoad) onLoad(app)
      } catch (err) {
        console.error('Failed to load Spline scene:', err)
      }
    }

    init()

    return () => {
      if (app) app.dispose()
    }
  }, [scene, onLoad])

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-sm z-10">
          <span className="loader"></span>
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        style={{ 
          width: '100%', 
          height: '100%',
          display: loading ? 'none' : 'block' 
        }} 
      />
    </div>
  )
}
