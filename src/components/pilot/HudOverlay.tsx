'use client'
import React from 'react'

export function HudOverlay({ active, x, y }: { active: boolean, x: number, y: number }) {
  return (
    <div className={`fixed inset-0 pointer-events-none z-20 transition-opacity duration-1000 ${active ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* BRAKETTS AROUND ROBOT */}
      {active && (
        <div style={{
            position: 'absolute',
            left: x,
            top: y,
            width: 270,
            height: 195,
            transform: 'translate(-50%, -50%)',
            zIndex: 30
        }}>
            <Bracket corner="top-left" />
            <Bracket corner="top-right" />
            <Bracket corner="bottom-left" />
            <Bracket corner="bottom-right" />
        </div>
      )}

      {/* TOP LEFT READOUT */}
      <div className="absolute top-12 left-12 flex flex-col gap-1.5 font-mono text-[10px] tracking-[0.2em] text-[#62D2A2]">
        <div className="flex items-center gap-2">
            <span className="opacity-40">[</span>
            <span>MISSION: CUSTOM PILOT</span>
            <span className="opacity-40">]</span>
        </div>
        <div className="flex items-center gap-2">
            <span className="opacity-40">[</span>
            <span>STATUS: CLEARED FOR LAUNCH</span>
            <span className="opacity-40">]</span>
        </div>
        <div className="flex items-center gap-2">
            <span className="opacity-40">[</span>
            <span>RISK LEVEL: ZERO</span>
            <span className="opacity-40">]</span>
        </div>
      </div>

      {/* BOTTOM RIGHT READOUT */}
      <div className="absolute bottom-12 right-12 flex flex-col gap-1.5 font-mono text-[10px] tracking-[0.1em] text-white/40 text-right">
        <div>TIMELINE ................. 3–6 WEEKS</div>
        <div>COMMITMENT ............... NONE</div>
        <div>SLOTS / QTR .............. 04</div>
        <div className="text-[#62D2A2]">OUTCOME GUARANTEE ........ YES</div>
      </div>

      {/* HAIRLINES */}
      <div className={`absolute top-[18%] left-0 w-full h-[1px] bg-[#62D2A2]/10 transition-transform duration-1000 ${active ? 'scale-x-100' : 'scale-x-0'}`} />
      <div className={`absolute bottom-[18%] left-0 w-full h-[1px] bg-[#62D2A2]/10 transition-transform duration-1000 ${active ? 'scale-x-100' : 'scale-x-0'}`} />
    </div>
  )
}

function Bracket({ corner }: { corner: string }) {
    const styles: any = {
        position: 'absolute',
        width: 15,
        height: 15,
        border: '1.5px solid #62D2A2',
        opacity: 0.6
    }

    if (corner === 'top-left') {
        styles.top = 0; styles.left = 0; styles.borderRight = 'none'; styles.borderBottom = 'none';
    } else if (corner === 'top-right') {
        styles.top = 0; styles.right = 0; styles.borderLeft = 'none'; styles.borderBottom = 'none';
    } else if (corner === 'bottom-left') {
        styles.bottom = 0; styles.left = 0; styles.borderRight = 'none'; styles.borderTop = 'none';
    } else if (corner === 'bottom-right') {
        styles.bottom = 0; styles.right = 0; styles.borderLeft = 'none'; styles.borderTop = 'none';
    }

    return <div style={styles} />
}
