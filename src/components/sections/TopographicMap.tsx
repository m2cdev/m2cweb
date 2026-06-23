"use client";

import { useRef, useMemo, useEffect, useState, memo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useActiveInView } from "@/hooks/useActiveInView";
import { Html, useTexture } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion, useScroll, MotionValue, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { useIsLowTier } from "@/providers/DeviceTierProvider";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const PHASES = [
  {
    id: 0,
    label: "Your revenue pipeline",
    sub: "is leaking.",
    pStart: 0,
    pEnd: 0.07,
    type: "intro",
  },
  {
    id: 1,
    label: "Broken sales motions that stall your momentum.",
    sub: "Leaking revenue.",
    solution: "Diagnose",
    solutionSub: "We audit your full sales motion and identify where deals are breaking down.",
    pStart: 0.08,
    pEnd: 0.26,
    pFix: 0.124,
    type: "leak",
    pipeZ: 70,
  },
  {
    id: 2,
    label: "Marketing & Sales initiatives working in silos.",
    sub: "Broken alignment.",
    solution: "Build",
    solutionSub: "We prototype the solution and pressure test it with your team at no cost.",
    pStart: 0.26,
    pEnd: 0.45,
    pFix: 0.309,
    type: "leak",
    pipeZ: 10,
  },
  {
    id: 3,
    label: "Follow-ups that fall through the cracks.",
    sub: "Missed pipeline.",
    solution: "Pilot",
    solutionSub: "3 to 6 month engagement. One measurable outcome. If we don't hit it, we keep working, a risk-free POC.",
    pStart: 0.45,
    pEnd: 0.63,
    pFix: 0.494,
    type: "leak",
    pipeZ: -50,
  },
  {
    id: 4,
    label: "Processes that become more inefficient as you get bigger.",
    sub: "Diminishing returns.",
    solution: "Scale",
    solutionSub: "Once we prove it works, we build it out. Full solution, no limits.",
    pStart: 0.63,
    pEnd: 0.85,
    pFix: 0.679,
    type: "leak",
    pipeZ: -110,
  },
  {
    id: 6,
    label: "We're essentially plumbers for your pipeline",
    sub: "If there's a leak, we fix it.",
    pStart: 0.88,
    pEnd: 1.0,
    type: "outro",
  },
];

const LEAK_PHASES = PHASES.filter((p) => p.type === "leak") as (typeof PHASES[0] & { pipeZ: number; pFix: number; solution: string; solutionSub: string })[];

// ─────────────────────────────────────────────────────────────────────────────
// CAMERA - pure straight-line tunnel drive along Z axis
// Think: car on a highway, eyes forward, no turns, smooth zoom.
// ─────────────────────────────────────────────────────────────────────────────

// Pipeline runs from Z=120 → Z=-165 (total 285 units)
// Camera stays at constant X=0, Y=16 (hovering above pipe), zooms forward
// Outro: rises smoothly above for the overhead reveal
const PIPE_START_Z = 120;
const PIPE_END_Z   = -165;
const OUTRO_START = 0.88;
const OUTRO_SPLIT = 0.32;
const OUTRO_ENTRY_POS = new THREE.Vector3(0, 12, PIPE_END_Z + 18);
const OUTRO_OVERVIEW_POS = new THREE.Vector3(0, 88, -24);
const OUTRO_SWEEP_START_Z = 94;
const OUTRO_SWEEP_END_Z = -168;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function getCamPos(t: number): THREE.Vector3 {
  if (t < OUTRO_START) {
    // Balanced zoom: close enough to see details clearly, pulled back enough to read
    const descend = Math.max(0, Math.min(1, t / 0.10));
    const y = 48 - descend * 37; // Ends at Y=11
    const z = PIPE_START_Z + (PIPE_END_Z - PIPE_START_Z) * Math.min(t / OUTRO_START, 1);
    return new THREE.Vector3(0, y, z + 16); 
  }

  // Outro: rise to a vertical overview, then sweep top-to-bottom over all seals.
  const ot = (t - OUTRO_START) / (1 - OUTRO_START);
  if (ot < OUTRO_SPLIT) {
    const k = ot / OUTRO_SPLIT;
    return new THREE.Vector3(
      lerp(OUTRO_ENTRY_POS.x, OUTRO_OVERVIEW_POS.x, k),
      lerp(OUTRO_ENTRY_POS.y, OUTRO_OVERVIEW_POS.y, k),
      lerp(OUTRO_ENTRY_POS.z, OUTRO_OVERVIEW_POS.z, k),
    );
  }

  const sweep = (ot - OUTRO_SPLIT) / (1 - OUTRO_SPLIT);
  const y = 88 + Math.sin(sweep * Math.PI) * 3;
  const z = lerp(OUTRO_SWEEP_START_Z, OUTRO_SWEEP_END_Z, sweep);
  return new THREE.Vector3(0, y, z);
}

function getCamLook(t: number): THREE.Vector3 {
  if (t < OUTRO_START) {
    const descend = Math.max(0, Math.min(1, t / 0.10));
    const lookY = Math.max(-2.5, -3.5 + descend * 1.0);
    const z = PIPE_START_Z + (PIPE_END_Z - PIPE_START_Z) * Math.min(t / OUTRO_START, 1);
    return new THREE.Vector3(0, lookY, z - 30); // Natural look ahead
  }

  const ot = (t - OUTRO_START) / (1 - OUTRO_START);
  if (ot < OUTRO_SPLIT) {
    const k = ot / OUTRO_SPLIT;
    return new THREE.Vector3(
      0,
      lerp(-3.5, -2.5, k),
      lerp(PIPE_END_Z - 50, -24, k),
    );
  }

  const sweep = (ot - OUTRO_SPLIT) / (1 - OUTRO_SPLIT);
  const z = lerp(OUTRO_SWEEP_START_Z, OUTRO_SWEEP_END_Z, sweep);
  return new THREE.Vector3(0, -2.5, z);
}

// ─────────────────────────────────────────────────────────────────────────────
// CAMERA RIG - pure linear, no orbiting, just forward flight
// ─────────────────────────────────────────────────────────────────────────────

function CameraRig({ sv }: { sv: MotionValue<number> }) {
  const sceneCamera = useThree((state) => state.camera);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const smoothP = useRef(0);
  const camPos  = useRef(new THREE.Vector3(0, 90, 148));
  const camLook = useRef(new THREE.Vector3(0, -2, 60));

  useEffect(() => {
    cameraRef.current = sceneCamera as THREE.PerspectiveCamera;
  }, [sceneCamera]);

  useFrame(() => {
    const camera = cameraRef.current;
    if (!camera) return;

    const progress = sv.get();
    const mob = window.innerWidth < 768;
    smoothP.current += (progress - smoothP.current) * (mob ? 0.18 : 0.065);
    const t = Math.max(0, Math.min(1, smoothP.current));

    const targetPos  = getCamPos(t);
    const targetLook = getCamLook(t);

    camPos.current.lerp(targetPos, mob ? 0.28 : 0.12);
    camLook.current.lerp(targetLook, mob ? 0.28 : 0.12);

    camera.position.copy(camPos.current);
    camera.lookAt(camLook.current);

    // FOV: wide on entry descent, 50 during cruise
    const targetFov = t < 0.10 ? 60 : t < OUTRO_START ? 50 : 44;
    camera.fov += (targetFov - camera.fov) * 0.08;
    camera.updateProjectionMatrix();
  });

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// TERRAIN
// ─────────────────────────────────────────────────────────────────────────────

const Terrain = memo(function Terrain() {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(340, 480, 80, 120);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const h =
        Math.sin(x * 0.035 + 0.8) * Math.cos(z * 0.025) * 8 +
        Math.sin(x * 0.075 + 1.2) * Math.cos(z * 0.05 + 0.6) * 3.5 +
        Math.sin(x * 0.18 + 2.1) * Math.cos(z * 0.12 + 1.4) * 1.2;
      pos.setY(i, h - 14.0); // significantly lower to ensure pipe is never cliped
    }
    pos.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <mesh geometry={geo} receiveShadow>
      <meshStandardMaterial
        color="#0c1a14"
        roughness={0.92}
        metalness={0.04}
      />
    </mesh>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// CONTOUR GRID
// ─────────────────────────────────────────────────────────────────────────────

const CONTOUR_GEOS = (() => {
  const out: THREE.BufferGeometry[] = [];
  for (let row = -230; row < 150; row += 10) {
    const pts: THREE.Vector3[] = [];
    for (let s = 0; s <= 50; s++) {
      const x = -160 + (s / 50) * 320;
      const h =
        Math.sin(x * 0.035 + 0.8) * Math.cos(row * 0.025) * 8 +
        Math.sin(x * 0.075 + 1.2) * Math.cos(row * 0.05 + 0.6) * 3.5 +
        Math.sin(x * 0.18 + 2.1) * Math.cos(row * 0.12 + 1.4) * 1.2;
      pts.push(new THREE.Vector3(x, h - 13.8, row));
    }
    out.push(new THREE.BufferGeometry().setFromPoints(pts));
  }
  return out;
})();

const CONTOUR_MAT = new THREE.LineBasicMaterial({
  color: "#1a3828",
  transparent: true,
  opacity: 0.4,
});

const ContourGrid = memo(function ContourGrid() {
  return (
    <group position={[0, -0.6, 0]}>
      {CONTOUR_GEOS.map((g, i) => (
        <line key={i} geometry={g} material={CONTOUR_MAT} />
      ))}
    </group>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// PIPELINE
// ─────────────────────────────────────────────────────────────────────────────

const PIPE_Y = -2.5;
const PIPE_R = 2.8;
const PIPE_ZONES = [120, 70, 10, -50, -110, -165];

const segGeoPool = PIPE_ZONES.slice(0, -1).map((zStart, i) => {
  const zEnd = PIPE_ZONES[i + 1];
  // Full length - no gaps. The patch sleeve sits on top of the pipe at leak joints.
  const len = Math.abs(zStart - zEnd) + 2; // +2 for slight overlap to eliminate any seam
  return new THREE.CylinderGeometry(PIPE_R, PIPE_R, len, 28);
});

const fullPipeLength = Math.abs(PIPE_START_Z - PIPE_END_Z) + 8;
const pipeSpineCoreGeo = new THREE.CylinderGeometry(PIPE_R + 0.35, PIPE_R + 0.35, fullPipeLength, 32);
const pipeSpineGlowGeo = new THREE.CylinderGeometry(PIPE_R + 1.15, PIPE_R + 1.15, fullPipeLength, 36);

const patchGeo = new THREE.CylinderGeometry(PIPE_R + 0.8, PIPE_R + 0.8, 7, 28);
const crackOuterGeo = new THREE.CylinderGeometry(PIPE_R + 0.12, PIPE_R + 0.12, 5.5, 28, 1, true);
const crackRingGeo = new THREE.TorusGeometry(PIPE_R + 0.3, 0.35, 10, 32);

function Pipeline({ sv }: { sv: MotionValue<number> }) {
  const spineGlowRef = useRef<THREE.Mesh>(null);
  const segMatRefs = useRef<(THREE.MeshStandardMaterial | null)[]>(
    new Array(PIPE_ZONES.length - 1).fill(null)
  );
  const [fixedMask, setFixedMask] = useState(0);
  const [visibleMask, setVisibleMask] = useState(0);
  const lastFixed = useRef(0);
  const lastVisible = useRef(0);

  useFrame(() => {
    const progress = sv.get();

    if (spineGlowRef.current) {
      (spineGlowRef.current.material as THREE.MeshBasicMaterial).opacity =
        progress >= OUTRO_START ? 0.14 : 0.08;
    }

    PIPE_ZONES.slice(0, -1).forEach((_, i) => {
      const mat = segMatRefs.current[i];
      if (!mat) return;
      const leakPhase = LEAK_PHASES[i - 1];
      const isFixed = leakPhase ? progress >= leakPhase.pFix : true;
      const isPreLeak = i === 0;
      const healthy = isFixed || isPreLeak;
      mat.color.set(healthy ? "#2daa72" : "#416358");
      mat.emissive.set(healthy ? "#0d4028" : "#1a3a30");
      mat.emissiveIntensity = healthy ? 0.8 : 0.28;
    });

    let nextFixed = 0;
    let nextVisible = 0;
    LEAK_PHASES.forEach((phase, idx) => {
      if (progress >= phase.pFix) nextFixed |= (1 << idx);
      if (progress >= phase.pStart - 0.05) nextVisible |= (1 << idx);
    });
    if (nextFixed !== lastFixed.current) {
      lastFixed.current = nextFixed;
      setFixedMask(nextFixed);
    }
    if (nextVisible !== lastVisible.current) {
      lastVisible.current = nextVisible;
      setVisibleMask(nextVisible);
    }
  });

  return (
    <group>
      {/* Base spine to remove harsh black glitching and keep the line readable */}
      <mesh ref={spineGlowRef} position={[0, PIPE_Y, (PIPE_START_Z + PIPE_END_Z) / 2]} rotation={[Math.PI / 2, 0, 0]} geometry={pipeSpineGlowGeo}>
        <meshBasicMaterial color="#59d6a4" transparent opacity={0.08} />
      </mesh>
      <mesh position={[0, PIPE_Y, (PIPE_START_Z + PIPE_END_Z) / 2]} rotation={[Math.PI / 2, 0, 0]} geometry={pipeSpineCoreGeo}>
        <meshStandardMaterial color="#2d6f58" emissive="#11392d" emissiveIntensity={0.4} roughness={0.34} metalness={0.86} />
      </mesh>

      {/* Segments */}
      {PIPE_ZONES.slice(0, -1).map((zStart, i) => {
        const zEnd = PIPE_ZONES[i + 1];
        const midZ = (zStart + zEnd) / 2;
        return (
          <mesh
            key={i}
            geometry={segGeoPool[i]}
            position={[0, PIPE_Y, midZ]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial
              ref={(m) => { segMatRefs.current[i] = m; }}
              color="#2daa72"
              emissive="#0d4028"
              emissiveIntensity={0.8}
              roughness={0.28}
              metalness={0.88}
            />
          </mesh>
        );
      })}

      {/* Leak joints */}
      {LEAK_PHASES.map((phase, idx) => {
        const isFixed = (fixedMask & (1 << idx)) !== 0;
        const isVisible = (visibleMask & (1 << idx)) !== 0;
        if (!isVisible) return null;

        return (
          <group key={phase.id} position={[0, PIPE_Y, phase.pipeZ]}>
            {isFixed ? (
              /* Repair patch */
              <mesh geometry={patchGeo}>
                <meshStandardMaterial
                  color="#62D2A2"
                  emissive="#42D2A2"
                  emissiveIntensity={3}
                  roughness={0.12}
                  metalness={0.92}
                />
              </mesh>
            ) : (
              <>
                {/* Crack sleeve */}
                <mesh geometry={crackOuterGeo}>
                  <meshStandardMaterial
                    color="#c0392b"
                    emissive="#F96B6B"
                    emissiveIntensity={2.5}
                    roughness={0.35}
                    metalness={0.6}
                    transparent
                    opacity={0.9}
                    side={THREE.BackSide}
                  />
                </mesh>
                {/* Hot ring */}
                <PulsingCrack />
                {/* Red glow */}
                <pointLight color="#F96B6B" intensity={60} distance={35} />
              </>
            )}
            {/* Green confirmation glow after fix */}
            {isFixed && (
              <pointLight color="#62D2A2" intensity={40} distance={30} />
            )}
          </group>
        );
      })}
    </group>
  );
}

function PulsingCrack() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 2 + Math.sin(clock.elapsedTime * 7) * 1.2;
  });
  return (
    <mesh ref={ref} geometry={crackRingGeo}>
      <meshStandardMaterial
        color="#FF2222"
        emissive="#FF2222"
        emissiveIntensity={2}
        roughness={0.08}
        metalness={0.1}
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DRIP PARTICLES
// ─────────────────────────────────────────────────────────────────────────────

const DRIP_COUNT = 50;
const DRIP_SEEDS = Array.from({ length: DRIP_COUNT }, (_, i) => {
  const unit = (offset: number) => {
    const value = Math.sin((i + 1) * (offset + 12.9898)) * 43758.5453;
    return value - Math.floor(value);
  };

  return {
    x: unit(1),
    y: unit(2),
    z: unit(3),
    vx: unit(4),
    vy: unit(5),
    vz: unit(6),
    resetX: unit(7),
    resetZ: unit(8),
  };
});

function LeakDrips({ z, phase, sv }: { z: number; phase: LeakPhase; sv: MotionValue<number> }) {
  const ref = useRef<THREE.Points>(null);
  const { geo, vel } = useMemo(() => {
    const arr = new Float32Array(DRIP_COUNT * 3);
    const v: number[] = [];
    for (let i = 0; i < DRIP_COUNT; i++) {
      const seed = DRIP_SEEDS[i];
      arr[i * 3] = (seed.x - 0.5) * 3.5;
      arr[i * 3 + 1] = seed.y * 1.5;
      arr[i * 3 + 2] = (seed.z - 0.5) * 3;
      v.push(
        (seed.vx - 0.5) * 0.06,
        -0.06 - seed.vy * 0.05,
        (seed.vz - 0.5) * 0.04,
      );
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return { geo: g, vel: v };
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const progress = sv.get();
    const active = progress >= phase.pStart && progress < phase.pFix && progress < 0.89;
    ref.current.visible = active;
    if (!active) return;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < DRIP_COUNT; i++) {
      let py = pos.getY(i) + vel[i * 3 + 1];
      let px = pos.getX(i) + vel[i * 3];
      let pz = pos.getZ(i) + vel[i * 3 + 2];
      if (py < -12) {
        const seed = DRIP_SEEDS[i];
        px = (seed.resetX - 0.5) * 3;
        py = 1;
        pz = (seed.resetZ - 0.5) * 3;
      }
      pos.setXYZ(i, px, py, pz);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geo} position={[0, PIPE_Y, z]}>
      <pointsMaterial color="#FF4040" size={0.16} transparent opacity={0.85} sizeAttenuation />
    </points>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GOOGLE MAPS STYLE LEAK PINS - teardrop, red→green, with inline label
// ─────────────────────────────────────────────────────────────────────────────

const PIN_SPHERE_GEO = new THREE.SphereGeometry(0.9, 20, 20);
const PIN_CONE_GEO   = new THREE.ConeGeometry(0.62, 2.0, 16);

type LeakPhase = typeof LEAK_PHASES[0];

function LeakPin({ phase, sv }: { phase: LeakPhase; sv: MotionValue<number> }) {
  const { size } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const coneRef   = useRef<THREE.Mesh>(null);
  const lightRef  = useRef<THREE.PointLight>(null);

  const isMobile = size.width < 768;
  const [isVisible, setIsVisible] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [showDetailedCopy, setShowDetailedCopy] = useState(false);
  const lastVisible = useRef(false);
  const lastSolved = useRef(false);
  const lastDetailed = useRef(false);

  useFrame(({ clock }) => {
    const progress = sv.get();
    const nextVisible = progress >= phase.pStart - 0.04;
    const nextSolved = progress >= phase.pFix;
    const nextDetailed = progress >= OUTRO_START || nextSolved;

    if (nextVisible !== lastVisible.current) {
      lastVisible.current = nextVisible;
      setIsVisible(nextVisible);
    }
    if (nextSolved !== lastSolved.current) {
      lastSolved.current = nextSolved;
      setIsSolved(nextSolved);
    }
    if (nextDetailed !== lastDetailed.current) {
      lastDetailed.current = nextDetailed;
      setShowDetailedCopy(nextDetailed);
    }

    if (!groupRef.current) return;
    groupRef.current.visible = nextVisible;
    if (!nextVisible || !sphereRef.current || !coneRef.current) return;

    const targetColor = nextSolved ? '#62D2A2' : '#F96B6B';
    const targetEmissive = nextSolved ? '#3dbd8a' : '#cc3333';
    const targetIntensity = nextSolved ? 3.5 : 4.0;
    const sm = sphereRef.current.material as THREE.MeshStandardMaterial;
    const cm = coneRef.current.material as THREE.MeshStandardMaterial;
    const pulse = 1 + Math.sin(clock.elapsedTime * (nextSolved ? 1.5 : 5)) * 0.3;
    sm.color.set(targetColor);
    sm.emissive.set(targetEmissive);
    sm.emissiveIntensity = targetIntensity * pulse;
    cm.color.set(targetColor);
    cm.emissive.set(targetEmissive);
    cm.emissiveIntensity = (targetIntensity - 1) * pulse;
    if (lightRef.current) {
      lightRef.current.color.set(targetColor);
      lightRef.current.intensity = nextSolved ? 30 : 45;
    }
  });

  // Pin sits directly above the pipe
  const pinX = 0;
  const pinY = PIPE_Y + 11.5; // elevated above logo (PIPE_Y + 6)

  return (
    <group ref={groupRef} position={[pinX, pinY, phase.pipeZ]} scale={isMobile ? 0.5 : 1} visible={false}>
      {/* Sphere (pin head) */}
      <mesh ref={sphereRef} geometry={PIN_SPHERE_GEO} position={[0, 0.9, 0]}>
        <meshStandardMaterial
          color="#F96B6B"
          emissive="#cc3333"
          emissiveIntensity={4.0}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>
      {/* Cone (pin tail, pointing down) */}
      <mesh ref={coneRef} geometry={PIN_CONE_GEO} position={[0, -0.55, 0]} rotation={[Math.PI, 0, 0]}>
        <meshStandardMaterial
          color="#F96B6B"
          emissive="#cc3333"
          emissiveIntensity={3.0}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>
      <pointLight ref={lightRef} color="#F96B6B" intensity={45} distance={28} />
      {/* Desktop only - mobile uses MobilePhaseOverlay outside the Canvas */}
      {!isMobile && isVisible && (
        <Html
          position={[3.1, 2.1, 0]}
          style={{ pointerEvents: 'none', whiteSpace: 'normal' }}
          distanceFactor={22}
        >
          <div style={{ fontFamily: 'Outfit, Inter, sans-serif', userSelect: 'none', width: 'min(580px, calc(100vw - 160px))', maxWidth: '85vw' }}>
            {isSolved ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{ fontSize: 'clamp(12px, 2vw, 18px)', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#62D2A2', fontFamily: 'monospace', fontWeight: 700 }}>✓ sealed</span>
                <span style={{ fontSize: 'clamp(20px, 4.2vw, 35px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.05 }}>{phase.solution}</span>
                {showDetailedCopy && (
                  <>
                    <span style={{ fontSize: 'clamp(15px, 3.2vw, 28px)', color: 'rgba(255,255,255,0.86)', lineHeight: 1.2, fontWeight: 600, width: '100%', maxWidth: '100%' }}>{phase.solutionSub}</span>
                    {phase.id === 2 && (
                      <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'row', gap: '32px', pointerEvents: 'auto', width: '100%' }}>
                        <div style={{ background: 'rgba(98, 210, 162, 0.1)', borderLeft: '3px solid #62D2A2', padding: '16px 20px', width: '300px', backdropFilter: 'blur(12px)', borderRadius: '0 12px 12px 0' }}>
                          <h4 style={{ color: '#ffffff', fontSize: '18px', fontWeight: 900, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Rep Enablement</h4>
                          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.5, fontWeight: 500 }}>Transforming reps into surgical deal-closers with repeatable playbooks.</p>
                        </div>
                        <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderLeft: '3px solid rgba(255,255,255,0.4)', padding: '16px 20px', width: '350px', backdropFilter: 'blur(12px)', borderRadius: '0 12px 12px 0' }}>
                          <h4 style={{ color: '#ffffff', fontSize: '18px', fontWeight: 900, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Rev Ops</h4>
                          <div style={{ height: '1px', background: 'rgba(255,255,255,0.2)', margin: '12px 0' }} />
                          <div style={{ marginBottom: '16px' }}>
                            <p style={{ fontSize: '16px', color: '#fff', fontWeight: 800, marginBottom: '4px' }}>Existing Tech Stack</p>
                            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px', lineHeight: 1.4 }}>Optimizing CRM for speed.</p>
                            <a href="/services/implementations" className="hover:text-primary transition-colors" style={{ fontSize: '13px', color: '#62D2A2', fontWeight: 900, textDecoration: 'none', borderBottom: '1px solid rgba(98, 210, 162, 0.3)' }}>VIEW IMPLEMENTATION →</a>
                          </div>
                          <div>
                            <p style={{ fontSize: '16px', color: '#fff', fontWeight: 800, marginBottom: '4px' }}>Custom Tools</p>
                            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px', lineHeight: 1.4 }}>Bespoke software solutions.</p>
                            <a href="/services/custom-buildouts" className="hover:text-primary transition-colors" style={{ fontSize: '13px', color: '#62D2A2', fontWeight: 900, textDecoration: 'none', borderBottom: '1px solid rgba(98, 210, 162, 0.3)' }}>VIEW BUILDOUTS →</a>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{ fontSize: 'clamp(12px, 2vw, 18px)', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#F96B6B', fontFamily: 'monospace', fontWeight: 700 }}>● leak detected</span>
                <span style={{ fontSize: 'clamp(20px, 4.2vw, 35px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.05 }}>{phase.label}</span>
                <span style={{ fontSize: 'clamp(15px, 3.2vw, 28px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.2, fontWeight: 600 }}>{phase.sub}</span>
              </div>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AMBIENT COLOR - shifts atmosphere between red (danger) and green (fixed)
// ─────────────────────────────────────────────────────────────────────────────

function AtmosphericLight({ sv }: { sv: MotionValue<number> }) {
  const ref = useRef<THREE.PointLight>(null);
  const smooth = useRef(0);

  useFrame(() => {
    // How "red" is the current moment?
    const progress = sv.get();
    let danger = 0;
    for (const phase of LEAK_PHASES) {
      if (progress >= phase.pStart && progress < (phase.pFix || phase.pEnd)) {
        const t = (progress - phase.pStart) / (phase.pEnd - phase.pStart);
        danger = Math.max(danger, Math.sin(t * Math.PI));
      }
    }
    smooth.current += (danger - smooth.current) * 0.03;
    if (!ref.current) return;
    ref.current.color.setRGB(
      0.18 + smooth.current * 0.45,
      0.12 - smooth.current * 0.06,
      0.08,
    );
    ref.current.intensity = 18 + smooth.current * 25;
  });

  return <pointLight ref={ref} position={[0, 50, 0]} distance={180} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// M2C FLOATING ICON - billboard sprite that leads the camera like a guide
// ─────────────────────────────────────────────────────────────────────────────

function M2CLeader({ sv }: { sv: MotionValue<number> }) {
  const ref = useRef<THREE.Group>(null);
  const texture = useTexture("/m2c-icon-float.png");

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const progress = sv.get();
    ref.current.visible = progress < 0.88;
    if (!ref.current.visible) return;
    const t = Math.max(0, Math.min(0.88, progress)); 
    const z = PIPE_START_Z + (PIPE_END_Z - PIPE_START_Z) * (t / 0.88);
    // Float 10 units ahead of the camera focus to perfectly coincide with the pFix math calculation
    const bob = Math.sin(clock.elapsedTime * 2.2) * 0.35;
    ref.current.position.set(0, PIPE_Y + 7.0 + bob, z - 10);
    // face camera exactly
    ref.current.rotation.y = 0;
  });

  return (
    <group ref={ref}>
      {/* Outer Glow halo */}
      <mesh>
        <circleGeometry args={[2.8, 64]} />
        <meshBasicMaterial
          color="#62D2A2"
          transparent
          opacity={0.04}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Inner Glow halo */}
      <mesh position={[0, 0, 0.005]}>
        <circleGeometry args={[1.9, 64]} />
        <meshBasicMaterial
          color="#62D2A2"
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Icon sprite */}
      <mesh position={[0, 0, 0.01]}>
        <circleGeometry args={[1.35, 64]} />
        <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
      </mesh>
      {/* Subtle point glow */}
      <pointLight color="#62D2A2" intensity={25} distance={25} />
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCENE
// ─────────────────────────────────────────────────────────────────────────────

function Scene({ sv, lowTier = false }: { sv: MotionValue<number>; lowTier?: boolean }) {
  const [isOutro, setIsOutro] = useState(false);
  const [hidePipeline, setHidePipeline] = useState(false);
  const lastOutro = useRef(false);
  const lastHide = useRef(false);
  const fogRef = useRef<THREE.Fog>(null);

  useEffect(() => {
    return sv.onChange((v) => {
      const nextOutro = v >= 0.89;
      const nextHide = v >= OUTRO_START + 0.025;
      if (nextOutro !== lastOutro.current) {
        lastOutro.current = nextOutro;
        setIsOutro(nextOutro);
      }
      if (nextHide !== lastHide.current) {
        lastHide.current = nextHide;
        setHidePipeline(nextHide);
      }
    });
  }, [sv]);

  useFrame(() => {
    if (!fogRef.current) return;
    const v = sv.get();
    fogRef.current.near = v >= 0.89 ? 300 : 120;
    fogRef.current.far = v >= 0.89 ? 700 : 260;
  });

  return (
    <>
      <ambientLight intensity={0.22} color="#d0f0e0" />
      <directionalLight position={[20, 45, 15]} intensity={0.6} color="#c8ead8" />
      <pointLight position={[0, 30, -60]} color="#62D2A2" intensity={22} distance={120} />
      <AtmosphericLight sv={sv} />

      <CameraRig sv={sv} />
      <Terrain />
      <ContourGrid />
      
      {!hidePipeline && <Pipeline sv={sv} />}

      {/* Floating M2C icon - leads the camera through the pipeline */}
      {!hidePipeline && <M2CLeader sv={sv} />}

      {/* Drip particles - stop during outro */}
      {LEAK_PHASES.map((phase) => (
        <LeakDrips
          key={phase.id}
          z={phase.pipeZ}
          phase={phase}
          sv={sv}
        />
      ))}

      {/* Google Maps teardrop pins */}
      {!hidePipeline && LEAK_PHASES.map((phase) => (
        <LeakPin key={phase.id} phase={phase} sv={sv} />
      ))}

      <fog ref={fogRef} attach="fog" color="#060c0a" near={120} far={260} />

      {!lowTier && (
        <EffectComposer disableNormalPass multisampling={0}>
          <Bloom
            intensity={isOutro ? 1.8 : 1.3}
            luminanceThreshold={0.22}
            luminanceSmoothing={0.9}
            mipmapBlur={false}
          />
        </EffectComposer>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SIDE RAIL PHASE INDICATOR - replaces all text, clean vertical progress rail
// ─────────────────────────────────────────────────────────────────────────────

function StoryOverlay({ progress }: { progress: number }) {
  // Matched exactly to the pFix math: 0.124, 0.309, 0.494, 0.679
  const phasePoints = [0.124, 0.309, 0.494, 0.679];


  if (progress >= OUTRO_START) return null;

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {/* Right-edge vertical progress rail */}
      <div
        className="absolute right-8 top-1/2 hidden -translate-y-1/2 md:flex flex-col items-center"
        style={{ height: "52vh", gap: 0 }}
      >
        {/* Background track */}
        <div
          className="absolute inset-x-0 rounded-full"
          style={{
            width: 2,
            height: "100%",
            background: "rgba(255,255,255,0.07)",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        {/* Active fill */}
        <div
          className="absolute rounded-full transition-none"
          style={{
            width: 2,
            top: 0,
            height: `${Math.min(progress, 0.88) / 0.88 * 100}%`,
            background: "linear-gradient(to bottom, rgba(249,107,107,0.6), #62D2A2)",
            left: "50%",
            transform: "translateX(-50%)",
            transition: "height 0.1s linear",
          }}
        />
        {/* Phase dots */}
        {phasePoints.map((pt, i) => {
          const passed = progress >= pt;
          const fixed  = progress >= pt + 0.12;
          return (
            <div
              key={i}
              className="absolute"
              style={{
                top: `${(pt / 0.88) * 100}%`,
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: fixed ? "#62D2A2" : passed ? "#F96B6B" : "rgba(255,255,255,0.15)",
                  boxShadow: fixed
                    ? "0 0 10px #62D2A2"
                    : passed
                    ? "0 0 10px #F96B6B"
                    : "none",
                  transition: "background 0.5s, box-shadow 0.5s",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOP: Leak counter
// ─────────────────────────────────────────────────────────────────────────────

function LeakCounter({ progress }: { progress: number }) {
  const fixed = LEAK_PHASES.filter((p) => progress >= p.pFix).length;
  const show = progress > 0.1 && progress < OUTRO_START;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-7 left-8 z-20 pointer-events-none"
        >
          <div className="flex flex-col gap-1">
            <span className="text-white/20 font-mono text-[11px] tracking-[0.3em] uppercase">
              Leaks sealed
            </span>
            <div className="flex gap-2 mt-1">
              {LEAK_PHASES.map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-0.5 rounded-full transition-all duration-700"
                  style={{
                    background: i < fixed ? "#62D2A2" : "rgba(255,255,255,0.1)",
                    boxShadow: i < fixed ? "0 0 8px #62D2A2" : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROGRESS hook
// ─────────────────────────────────────────────────────────────────────────────

function FixesOverview({ progress }: { progress: number }) {
  const show = progress >= OUTRO_START + 0.025;

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black z-20 pointer-events-none"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute inset-0 z-30 flex items-center justify-center p-6 md:p-12 pointer-events-none"
          >
            <div className="w-full max-w-4xl text-center flex flex-col items-center">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[#62D2A2] text-xs font-black uppercase tracking-[0.4em] mb-4"
              >
                We&apos;re essentially plumbers for your pipeline
              </motion.p>
              
              <motion.h3 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white text-4xl md:text-7xl font-black leading-[1.0] tracking-tighter mb-6 drop-shadow-2xl"
              >
                If there&apos;s a leak, <br />
                <span className="text-[#62D2A2]">We Fix it.</span>
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white text-xl md:text-2xl font-bold tracking-tight mb-12"
              >
                And Prove that we can before you commit
              </motion.p>

              <div className="flex flex-col gap-6 w-fit mx-auto items-start mb-16">
                {LEAK_PHASES.map((phase, i) => (
                  <motion.div 
                    key={phase.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-center gap-5"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#62D2A2]/10 border border-[#62D2A2]/30 flex items-center justify-center shrink-0">
                      <span className="text-[#62D2A2] text-sm font-black">✓</span>
                    </div>
                    <p className="text-white text-2xl md:text-3xl font-extrabold tracking-tight">{phase.solution}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="pointer-events-auto"
              >
                <a href="/pilot">
                  <button className="bg-[#62D2A2] text-white px-12 py-5 rounded-full font-black text-sm uppercase tracking-[0.2em] hover:bg-[#F96B6B] hover:text-white transition-all duration-300 shadow-[0_0_50px_rgba(98,210,162,0.3)] hover:shadow-[0_0_50px_rgba(249,107,107,0.4)] transform hover:-translate-y-1">
                    How our Pilot Program Works
                  </button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function MobilePhaseOverlay({ progress }: { progress: number }) {
  if (progress >= OUTRO_START) return null;
  let active: typeof LEAK_PHASES[0] | null = null;
  for (const phase of LEAK_PHASES) {
    if (progress >= phase.pStart - 0.04) active = phase;
  }
  if (!active) return null;
  const isSolved = progress >= active.pFix;
  const color = isSolved ? '#62D2A2' : '#F96B6B';
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={active.id + (isSolved ? '-s' : '-l')}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.3 }}
        className="absolute top-20 left-0 right-0 z-30 flex md:hidden justify-center px-6 pointer-events-none"
      >
        <div style={{ textAlign: 'center', maxWidth: '280px' }}>
          <span style={{ fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color, fontFamily: 'monospace', fontWeight: 700, display: 'block', marginBottom: '8px', textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}>
            {isSolved ? '✓ sealed' : '● leak detected'}
          </span>
          <span style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, display: 'block', marginBottom: '6px', textShadow: '0 2px 12px rgba(0,0,0,1), 0 1px 4px rgba(0,0,0,0.9)' }}>
            {isSolved ? active.solution : active.label}
          </span>
          <span style={{ fontSize: '13px', color: '#ffffff', lineHeight: 1.45, fontWeight: 500, display: 'block', textShadow: '0 1px 8px rgba(0,0,0,1), 0 1px 3px rgba(0,0,0,0.9)', opacity: 0.85 }}>
            {isSolved ? active.solutionSub : active.sub}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function useProgressValue(sv: MotionValue<number>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let frame = 0;
    let latest = sv.get();
    let rendered = latest;

    const flush = () => {
      frame = 0;
      if (Math.abs(latest - rendered) < 0.001) return;
      rendered = latest;
      setP(latest);
    };

    const unsubscribe = sv.onChange((v) => {
      latest = v;
      if (!frame) frame = requestAnimationFrame(flush);
    });

    return () => {
      unsubscribe();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sv]);
  return p;
}

function SceneCanvas({ sv, lowTier }: { sv: MotionValue<number>; lowTier: boolean }) {
  return <Scene sv={sv} lowTier={lowTier} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// SCROLL INDICATOR
// ─────────────────────────────────────────────────────────────────────────────

function ScrollCue({ progress }: { progress: number }) {
  if (progress > 0.05) return null;
  return (
    <motion.div
      animate={{ opacity: [0.4, 0.9, 0.4] }}
      transition={{ repeat: Infinity, duration: 2.2 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2"
    >
      <span className="text-white/30 font-mono text-[11px] tracking-[0.35em] uppercase">
        scroll to begin
      </span>
      <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export default function TopographicMap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useProgressValue(scrollYProgress);
  const [isMobile, setIsMobile] = useState(false);
  const providerLowTier = useIsLowTier();
  const [tierReady, setTierReady] = useState(false);
  const [isLowTier, setIsLowTier] = useState(true);
  // Pause the (expensive Bloom-postprocessed) render loop whenever the scene is
  // scrolled out of view or the tab is backgrounded. The section is 1200vh tall,
  // so it stays "active" the whole time it's actually being scrolled through.
  const { ref: viewRef, isActive } = useActiveInView();
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const lowCpu = (navigator.hardwareConcurrency ?? 8) <= 4;
      const lowRam = ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4;
      setIsLowTier(providerLowTier || reducedMotion || (lowCpu && lowRam));
      setTierReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [providerLowTier]);

  return (
    <section
      ref={(node) => {
        sectionRef.current = node;
        viewRef.current = node;
      }}
      className="relative w-full bg-[#060c0a]"
      style={{ height: isMobile ? "700vh" : "1200vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {tierReady && (
          <Canvas
            gl={{
              antialias: !isLowTier,
              alpha: false,
              powerPreference: "high-performance",
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.4,
            }}
            frameloop={isActive ? "always" : "never"}
            dpr={isLowTier ? [0.5, 0.8] : [1, 1.5]}
            performance={{ min: isLowTier ? 0.1 : 0.35, max: isLowTier ? 0.45 : 0.8 }}
            camera={{ fov: 58, near: 0.5, far: 320, position: [30, 140, 160] }}
            shadows={false}
            style={{ background: "#060c0a", position: "absolute", inset: 0 }}
          >
            <SceneCanvas sv={scrollYProgress} lowTier={isLowTier} />
          </Canvas>
        )}

        {/* Edge vignette */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(6,12,10,0.7) 100%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#060c0a] to-transparent z-10 pointer-events-none" />

        {/* UI layers */}
        <LeakCounter progress={progress} />
        <StoryOverlay progress={progress} />
        <MobilePhaseOverlay progress={progress} />
        <FixesOverview progress={progress} />
        <ScrollCue progress={progress} />
      </div>
    </section>
  );
}
