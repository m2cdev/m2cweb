'use client'
import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

export function RobotCockpit({
  x, y, scale, opacity
}: {
  x: number, y: number, scale: number, opacity: number
}) {
  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: `translate(-50%, -50%) scale(${scale})`,
      opacity,
      width: 260,
      height: 185,
      borderRadius: '5px',
      overflow: 'hidden',
      background: 'rgba(5, 7, 10, 0.95)',
      backdropFilter: 'blur(4px)',
      border: '1px solid rgba(98, 210, 162, 0.3)',
      boxShadow: 'inset 0 0 40px rgba(0,0,0,0.9), 0 0 30px rgba(10,22,40,0.4)',
      pointerEvents: 'none',
      zIndex: 25,
      transition: 'opacity 0.5s ease',
    }}>

      {/* Glass glare — top-left highlight on cockpit window */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '45%',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)',
        zIndex: 30, borderRadius: '5px 5px 0 0', pointerEvents: 'none'
      }} />

      <Suspense fallback={
        <div style={{
          width: '100%', height: '100%', background: '#05070a',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            width: 20, height: 20,
            border: '1.5px solid #62D2A2',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <style>{`
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          `}</style>
        </div>
      }>
        <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <Spline
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            style={{
                width: '100%',
                height: '100%',
                transform: 'scale(1.4) translateY(12%)',
                transformOrigin: 'center top'
            }}
            />
        </div>
      </Suspense>
    </div>
  )
}
