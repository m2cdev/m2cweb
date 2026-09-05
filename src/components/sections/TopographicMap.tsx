"use client";

import { useRef, useMemo, useEffect, useState, memo, Suspense, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, PerformanceMonitor } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  MotionValue,
  AnimatePresence,
} from "framer-motion";
import * as THREE from "three";
import { useIsLowTier } from "@/providers/DeviceTierProvider";
import { useActiveInView } from "@/hooks/useActiveInView";

// ─────────────────────────────────────────────────────────────────────────────
// PERFORMANCE NOTES (why this file is structured the way it is)
//
// 1. No React state is ever set from inside useFrame. Every per-frame change
//    goes straight to a three.js object or a DOM node through a ref.
// 2. Light count never changes. Every light is mounted once and stays visible;
//    we animate intensity to 0 instead of unmounting. Changing the number of
//    lights forces three.js to recompile every material's shader, which was
//    the source of the hitch at each phase boundary.
// 3. The root component never re-renders on scroll. Overlays subscribe to the
//    scroll MotionValue themselves and only set state on discrete transitions
//    (phase changes), or bind the value directly to a style.
// 4. Labels are plain DOM nodes positioned by projecting the pin's world
//    position each frame. No drei <Html>, no backdrop-filter.
// 5. Lerps are delta-time corrected so low fps never turns into camera lag.
// 6. Quality tier is adaptive: a PerformanceMonitor steps dpr / bloom down
//    when measured fps drops and back up when it recovers.
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

type Phase = {
  id: number;
  label: string;
  sub: string;
  solution?: string;
  solutionSub?: string;
  pStart: number;
  pEnd: number;
  pFix?: number;
  type: "intro" | "leak" | "outro";
  pipeZ?: number;
};

const PHASES: Phase[] = [
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

type LeakPhase = Phase & { pipeZ: number; pFix: number; solution: string; solutionSub: string };
const LEAK_PHASES = PHASES.filter((p) => p.type === "leak") as LeakPhase[];
const LEAK_COUNT = LEAK_PHASES.length;

// ─────────────────────────────────────────────────────────────────────────────
// CAMERA PATH - straight-line drive along Z, then rise for the overhead reveal
// ─────────────────────────────────────────────────────────────────────────────

const PIPE_START_Z = 120;
const PIPE_END_Z = -165;
const OUTRO_START = 0.88;
const OUTRO_SPLIT = 0.32;
const HIDE_PIPELINE_AT = OUTRO_START + 0.025;
const OUTRO_ENTRY_POS = new THREE.Vector3(0, 12, PIPE_END_Z + 18);
const OUTRO_OVERVIEW_POS = new THREE.Vector3(0, 88, -24);
const OUTRO_SWEEP_START_Z = 94;
const OUTRO_SWEEP_END_Z = -168;

const PIPE_Y = -2.5;
const PIPE_R = 2.8;
const PIPE_ZONES = [120, 70, 10, -50, -110, -165];
const PIN_Y = PIPE_Y + 11.5;
const LABEL_OFFSET = new THREE.Vector3(3.1, 2.1, 0);
const LABEL_DISTANCE_FACTOR = 22;

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Frame-rate independent exponential smoothing. `k` is the per-frame factor at 60fps. */
function dampFactor(k: number, dt: number) {
  return 1 - Math.pow(1 - k, dt * 60);
}

function getCamPos(t: number, out: THREE.Vector3): THREE.Vector3 {
  if (t < OUTRO_START) {
    const descend = clamp01(t / 0.1);
    const y = 48 - descend * 37;
    const z = PIPE_START_Z + (PIPE_END_Z - PIPE_START_Z) * Math.min(t / OUTRO_START, 1);
    return out.set(0, y, z + 16);
  }
  const ot = (t - OUTRO_START) / (1 - OUTRO_START);
  if (ot < OUTRO_SPLIT) {
    const k = ot / OUTRO_SPLIT;
    return out.set(
      lerp(OUTRO_ENTRY_POS.x, OUTRO_OVERVIEW_POS.x, k),
      lerp(OUTRO_ENTRY_POS.y, OUTRO_OVERVIEW_POS.y, k),
      lerp(OUTRO_ENTRY_POS.z, OUTRO_OVERVIEW_POS.z, k),
    );
  }
  const sweep = (ot - OUTRO_SPLIT) / (1 - OUTRO_SPLIT);
  return out.set(0, 88 + Math.sin(sweep * Math.PI) * 3, lerp(OUTRO_SWEEP_START_Z, OUTRO_SWEEP_END_Z, sweep));
}

function getCamLook(t: number, out: THREE.Vector3): THREE.Vector3 {
  if (t < OUTRO_START) {
    const descend = clamp01(t / 0.1);
    const lookY = Math.max(-2.5, -3.5 + descend * 1.0);
    const z = PIPE_START_Z + (PIPE_END_Z - PIPE_START_Z) * Math.min(t / OUTRO_START, 1);
    return out.set(0, lookY, z - 30);
  }
  const ot = (t - OUTRO_START) / (1 - OUTRO_START);
  if (ot < OUTRO_SPLIT) {
    const k = ot / OUTRO_SPLIT;
    return out.set(0, lerp(-3.5, -2.5, k), lerp(PIPE_END_Z - 50, -24, k));
  }
  const sweep = (ot - OUTRO_SPLIT) / (1 - OUTRO_SPLIT);
  return out.set(0, -2.5, lerp(OUTRO_SWEEP_START_Z, OUTRO_SWEEP_END_Z, sweep));
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED PER-FRAME STATE
// One object, written by CameraRig first each frame, read by everything else.
// ─────────────────────────────────────────────────────────────────────────────

type FrameState = {
  progress: number; // raw scroll progress
  smooth: number; // camera-smoothed progress
  isMobile: boolean;
};

function useIsMobileViewport() {
  const { size } = useThree();
  return size.width < 768;
}

// ─────────────────────────────────────────────────────────────────────────────
// CAMERA RIG
// ─────────────────────────────────────────────────────────────────────────────

function CameraRig({ sv, fsRef }: { sv: MotionValue<number>; fsRef: React.MutableRefObject<FrameState> }) {
  const isMobile = useIsMobileViewport();
  const camPos = useRef(new THREE.Vector3(0, 90, 148));
  const camLook = useRef(new THREE.Vector3(0, -2, 60));
  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());

  // Runs before every other useFrame in the scene (negative priority).
  useFrame((state, rawDt) => {
    const camera = state.camera as THREE.PerspectiveCamera;
    const dt = Math.min(rawDt, 0.1);
    fsRef.current.progress = sv.get();
    fsRef.current.isMobile = isMobile;
    fsRef.current.smooth += (fsRef.current.progress - fsRef.current.smooth) * dampFactor(isMobile ? 0.18 : 0.065, dt);
    const t = clamp01(fsRef.current.smooth);

    getCamPos(t, targetPos.current);
    getCamLook(t, targetLook.current);
    const k = dampFactor(isMobile ? 0.28 : 0.12, dt);
    camPos.current.lerp(targetPos.current, k);
    camLook.current.lerp(targetLook.current, k);

    camera.position.copy(camPos.current);
    camera.lookAt(camLook.current);

    const targetFov = t < 0.1 ? 60 : t < OUTRO_START ? 50 : 44;
    camera.fov += (targetFov - camera.fov) * dampFactor(0.08, dt);
    camera.updateProjectionMatrix();
  }, -10);

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// TERRAIN + CONTOURS (fully static)
// ─────────────────────────────────────────────────────────────────────────────

function terrainHeight(x: number, z: number) {
  return (
    Math.sin(x * 0.035 + 0.8) * Math.cos(z * 0.025) * 8 +
    Math.sin(x * 0.075 + 1.2) * Math.cos(z * 0.05 + 0.6) * 3.5 +
    Math.sin(x * 0.18 + 2.1) * Math.cos(z * 0.12 + 1.4) * 1.2
  );
}

const Terrain = memo(function Terrain() {
  const isMobile = useIsMobileViewport();
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(340, 480, 80, 120);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      pos.setY(i, terrainHeight(pos.getX(i), pos.getZ(i)) - 14.0);
    }
    pos.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }, []);

  // The terrain fills the screen, so its fragment shader is the single biggest
  // GPU cost. At roughness 0.92 / metalness 0.04 it is effectively diffuse, so
  // phones get the much cheaper Lambert model; the look is indistinguishable.
  return (
    <mesh geometry={geo}>
      {isMobile ? (
        <meshLambertMaterial color="#0c1a14" />
      ) : (
        <meshStandardMaterial color="#0c1a14" roughness={0.92} metalness={0.04} />
      )}
    </mesh>
  );
});

// All contour rows merged into a single LineSegments draw call.
const ContourGrid = memo(function ContourGrid() {
  const geo = useMemo(() => {
    const verts: number[] = [];
    const SEGS = 50;
    for (let row = -230; row < 150; row += 10) {
      for (let s = 0; s < SEGS; s++) {
        const x0 = -160 + (s / SEGS) * 320;
        const x1 = -160 + ((s + 1) / SEGS) * 320;
        verts.push(x0, terrainHeight(x0, row) - 13.8, row, x1, terrainHeight(x1, row) - 13.8, row);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return g;
  }, []);

  return (
    <lineSegments geometry={geo} position={[0, -0.6, 0]}>
      <lineBasicMaterial color="#1a3828" transparent opacity={0.4} />
    </lineSegments>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// LIGHTS - all permanent, intensity animated. Never mounted/unmounted.
// ─────────────────────────────────────────────────────────────────────────────

const COLOR_RED = new THREE.Color("#F96B6B");
const COLOR_GREEN = new THREE.Color("#62D2A2");

// Two pooled lights instead of one per leak. Every point light is evaluated
// per fragment across the full-screen terrain whether or not it reaches
// anything, so light count is the dominant fragment cost on phones. Leak
// zones sit 60 units apart, each light reaches 34, and a zone's light only
// turns on once the camera is ~40 units short of it, so only the two zones
// nearest the camera can ever light visible terrain. The pool follows those
// two; the count never changes, so no shader recompiles.
const LEAK_LIGHT_POOL = 2;

function LeakLights({ fsRef }: { fsRef: React.MutableRefObject<FrameState> }) {
  const refs = useRef<(THREE.PointLight | null)[]>(new Array(LEAK_LIGHT_POOL).fill(null));
  const order = useRef<number[]>(LEAK_PHASES.map((_, i) => i));

  useFrame(({ camera, clock }) => {
    const p = fsRef.current.progress;
    const hide = p >= HIDE_PIPELINE_AT;
    const camZ = camera.position.z;
    const idx = order.current;
    idx.sort((a, b) => Math.abs(LEAK_PHASES[a].pipeZ - camZ) - Math.abs(LEAK_PHASES[b].pipeZ - camZ));
    // Stable slot assignment: nearest two, in zone order, so a set change only
    // ever moves a light that was already out of view.
    const a = Math.min(idx[0], idx[1]);
    const b = Math.max(idx[0], idx[1]);
    const chosen = [a, b];
    for (let slot = 0; slot < LEAK_LIGHT_POOL; slot++) {
      const light = refs.current[slot];
      if (!light) continue;
      const phase = LEAK_PHASES[chosen[slot]];
      light.position.z = phase.pipeZ;
      const visible = p >= phase.pStart - 0.05 && !hide;
      if (!visible) {
        light.intensity = 0;
        continue;
      }
      const fixed = p >= phase.pFix;
      if (fixed) {
        light.color.copy(COLOR_GREEN);
        light.intensity = 70;
      } else {
        light.color.copy(COLOR_RED);
        light.intensity = 95 + Math.sin(clock.elapsedTime * 5) * 12;
      }
    }
  });

  return (
    <>
      {Array.from({ length: LEAK_LIGHT_POOL }, (_, slot) => (
        <pointLight
          key={slot}
          ref={(l) => {
            refs.current[slot] = l;
          }}
          position={[0, PIPE_Y + 5, LEAK_PHASES[slot].pipeZ]}
          color="#F96B6B"
          intensity={0}
          distance={34}
        />
      ))}
    </>
  );
}

function AtmosphericLight({ fsRef }: { fsRef: React.MutableRefObject<FrameState> }) {
  const ref = useRef<THREE.PointLight>(null);
  const smooth = useRef(0);

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.1);
    const p = fsRef.current.progress;
    let danger = 0;
    for (const phase of LEAK_PHASES) {
      if (p >= phase.pStart && p < phase.pFix) {
        const t = (p - phase.pStart) / (phase.pEnd - phase.pStart);
        danger = Math.max(danger, Math.sin(t * Math.PI));
      }
    }
    smooth.current += (danger - smooth.current) * dampFactor(0.03, dt);
    if (!ref.current) return;
    ref.current.color.setRGB(0.18 + smooth.current * 0.45, 0.12 - smooth.current * 0.06, 0.08);
    ref.current.intensity = 18 + smooth.current * 25;
  });

  return <pointLight ref={ref} position={[0, 50, 0]} distance={180} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// PIPELINE - every mesh mounted once, visibility toggled via refs
// ─────────────────────────────────────────────────────────────────────────────

const segGeoPool = PIPE_ZONES.slice(0, -1).map((zStart, i) => {
  const zEnd = PIPE_ZONES[i + 1];
  const len = Math.abs(zStart - zEnd) + 2;
  return new THREE.CylinderGeometry(PIPE_R, PIPE_R, len, 28);
});
const fullPipeLength = Math.abs(PIPE_START_Z - PIPE_END_Z) + 8;
const pipeSpineCoreGeo = new THREE.CylinderGeometry(PIPE_R + 0.35, PIPE_R + 0.35, fullPipeLength, 32);
const pipeSpineGlowGeo = new THREE.CylinderGeometry(PIPE_R + 1.15, PIPE_R + 1.15, fullPipeLength, 36);
const patchGeo = new THREE.CylinderGeometry(PIPE_R + 0.8, PIPE_R + 0.8, 7, 28);
const crackOuterGeo = new THREE.CylinderGeometry(PIPE_R + 0.12, PIPE_R + 0.12, 5.5, 28, 1, true);
const crackRingGeo = new THREE.TorusGeometry(PIPE_R + 0.3, 0.35, 10, 32);

const SEG_HEALTHY = { color: new THREE.Color("#2daa72"), emissive: new THREE.Color("#0d4028"), intensity: 0.8 };
const SEG_LEAKING = { color: new THREE.Color("#416358"), emissive: new THREE.Color("#1a3a30"), intensity: 0.28 };

function Pipeline({ fsRef }: { fsRef: React.MutableRefObject<FrameState> }) {
  const groupRef = useRef<THREE.Group>(null);
  const spineGlowMat = useRef<THREE.MeshBasicMaterial>(null);
  const segMats = useRef<(THREE.MeshStandardMaterial | null)[]>(new Array(PIPE_ZONES.length - 1).fill(null));
  const patchRefs = useRef<(THREE.Mesh | null)[]>(new Array(LEAK_COUNT).fill(null));
  const crackRefs = useRef<(THREE.Group | null)[]>(new Array(LEAK_COUNT).fill(null));
  const ringMats = useRef<(THREE.MeshStandardMaterial | null)[]>(new Array(LEAK_COUNT).fill(null));

  useFrame(({ clock }) => {
    const p = fsRef.current.progress;
    if (groupRef.current) groupRef.current.visible = p < HIDE_PIPELINE_AT;
    if (spineGlowMat.current) spineGlowMat.current.opacity = p >= OUTRO_START ? 0.14 : 0.08;

    for (let i = 0; i < segMats.current.length; i++) {
      const mat = segMats.current[i];
      if (!mat) continue;
      const leak = LEAK_PHASES[i - 1];
      const healthy = i === 0 || !leak || p >= leak.pFix;
      const s = healthy ? SEG_HEALTHY : SEG_LEAKING;
      mat.color.copy(s.color);
      mat.emissive.copy(s.emissive);
      mat.emissiveIntensity = s.intensity;
    }

    const pulse = 2 + Math.sin(clock.elapsedTime * 7) * 1.2;
    for (let i = 0; i < LEAK_COUNT; i++) {
      const phase = LEAK_PHASES[i];
      const visible = p >= phase.pStart - 0.05;
      const fixed = p >= phase.pFix;
      const patch = patchRefs.current[i];
      const crack = crackRefs.current[i];
      if (patch) patch.visible = visible && fixed;
      if (crack) crack.visible = visible && !fixed;
      const rm = ringMats.current[i];
      if (rm && crack?.visible) rm.emissiveIntensity = pulse;
    }
  });

  const midZ = (PIPE_START_Z + PIPE_END_Z) / 2;

  return (
    <group ref={groupRef}>
      <mesh position={[0, PIPE_Y, midZ]} rotation={[Math.PI / 2, 0, 0]} geometry={pipeSpineGlowGeo}>
        <meshBasicMaterial ref={spineGlowMat} color="#59d6a4" transparent opacity={0.08} />
      </mesh>
      <mesh position={[0, PIPE_Y, midZ]} rotation={[Math.PI / 2, 0, 0]} geometry={pipeSpineCoreGeo}>
        <meshStandardMaterial color="#2d6f58" emissive="#11392d" emissiveIntensity={0.4} roughness={0.34} metalness={0.86} />
      </mesh>

      {PIPE_ZONES.slice(0, -1).map((zStart, i) => {
        const zEnd = PIPE_ZONES[i + 1];
        return (
          <mesh key={i} geometry={segGeoPool[i]} position={[0, PIPE_Y, (zStart + zEnd) / 2]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial
              ref={(m) => {
                segMats.current[i] = m;
              }}
              color="#2daa72"
              emissive="#0d4028"
              emissiveIntensity={0.8}
              roughness={0.28}
              metalness={0.88}
            />
          </mesh>
        );
      })}

      {LEAK_PHASES.map((phase, i) => (
        <group key={phase.id} position={[0, PIPE_Y, phase.pipeZ]}>
          {/* Repair patch (shown once fixed) */}
          <mesh
            ref={(m) => {
              patchRefs.current[i] = m;
            }}
            geometry={patchGeo}
            visible={false}
          >
            <meshStandardMaterial color="#62D2A2" emissive="#42D2A2" emissiveIntensity={3} roughness={0.12} metalness={0.92} />
          </mesh>
          {/* Crack sleeve + hot ring (shown while leaking) */}
          <group
            ref={(g) => {
              crackRefs.current[i] = g;
            }}
            visible={false}
          >
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
            <mesh geometry={crackRingGeo}>
              <meshStandardMaterial
                ref={(m) => {
                  ringMats.current[i] = m;
                }}
                color="#FF2222"
                emissive="#FF2222"
                emissiveIntensity={2}
                roughness={0.08}
                metalness={0.1}
              />
            </mesh>
          </group>
        </group>
      ))}
    </group>
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
  return { x: unit(1), y: unit(2), z: unit(3), vx: unit(4), vy: unit(5), vz: unit(6), resetX: unit(7), resetZ: unit(8) };
});

function LeakDrips({ phase, fsRef }: { phase: LeakPhase; fsRef: React.MutableRefObject<FrameState> }) {
  const ref = useRef<THREE.Points>(null);
  const { geo, vel } = useMemo(() => {
    const arr = new Float32Array(DRIP_COUNT * 3);
    const v: number[] = [];
    for (let i = 0; i < DRIP_COUNT; i++) {
      const seed = DRIP_SEEDS[i];
      arr[i * 3] = (seed.x - 0.5) * 3.5;
      arr[i * 3 + 1] = seed.y * 1.5;
      arr[i * 3 + 2] = (seed.z - 0.5) * 3;
      v.push((seed.vx - 0.5) * 0.06, -0.06 - seed.vy * 0.05, (seed.vz - 0.5) * 0.04);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return { geo: g, vel: v };
  }, []);

  useFrame((_, rawDt) => {
    if (!ref.current) return;
    const p = fsRef.current.progress;
    const active = p >= phase.pStart && p < phase.pFix && p < 0.89;
    ref.current.visible = active;
    if (!active) return;
    const step = Math.min(rawDt, 0.1) * 60;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < DRIP_COUNT; i++) {
      let py = pos.getY(i) + vel[i * 3 + 1] * step;
      let px = pos.getX(i) + vel[i * 3] * step;
      let pz = pos.getZ(i) + vel[i * 3 + 2] * step;
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
    <points ref={ref} geometry={geo} position={[0, PIPE_Y, phase.pipeZ]} visible={false}>
      <pointsMaterial color="#FF4040" size={0.16} transparent opacity={0.85} sizeAttenuation />
    </points>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LEAK PINS - teardrop markers above each joint. Labels live in the DOM.
// ─────────────────────────────────────────────────────────────────────────────

const PIN_SPHERE_GEO = new THREE.SphereGeometry(0.9, 20, 20);
const PIN_CONE_GEO = new THREE.ConeGeometry(0.62, 2.0, 16);
const PIN_RED = { color: new THREE.Color("#F96B6B"), emissive: new THREE.Color("#cc3333"), intensity: 4.0 };
const PIN_GREEN = { color: new THREE.Color("#62D2A2"), emissive: new THREE.Color("#3dbd8a"), intensity: 3.5 };

function LeakPins({ fsRef }: { fsRef: React.MutableRefObject<FrameState> }) {
  const isMobile = useIsMobileViewport();
  const groups = useRef<(THREE.Group | null)[]>(new Array(LEAK_COUNT).fill(null));
  const sphereMats = useRef<(THREE.MeshStandardMaterial | null)[]>(new Array(LEAK_COUNT).fill(null));
  const coneMats = useRef<(THREE.MeshStandardMaterial | null)[]>(new Array(LEAK_COUNT).fill(null));

  useFrame(({ clock }) => {
    const p = fsRef.current.progress;
    const hide = p >= HIDE_PIPELINE_AT;
    for (let i = 0; i < LEAK_COUNT; i++) {
      const g = groups.current[i];
      if (!g) continue;
      const phase = LEAK_PHASES[i];
      const visible = p >= phase.pStart - 0.04 && !hide;
      g.visible = visible;
      if (!visible) continue;
      const solved = p >= phase.pFix;
      const s = solved ? PIN_GREEN : PIN_RED;
      const pulse = 1 + Math.sin(clock.elapsedTime * (solved ? 1.5 : 5)) * 0.3;
      const sm = sphereMats.current[i];
      const cm = coneMats.current[i];
      if (sm) {
        sm.color.copy(s.color);
        sm.emissive.copy(s.emissive);
        sm.emissiveIntensity = s.intensity * pulse;
      }
      if (cm) {
        cm.color.copy(s.color);
        cm.emissive.copy(s.emissive);
        cm.emissiveIntensity = (s.intensity - 1) * pulse;
      }
    }
  });

  return (
    <>
      {LEAK_PHASES.map((phase, i) => (
        <group
          key={phase.id}
          ref={(g) => {
            groups.current[i] = g;
          }}
          position={[0, PIN_Y, phase.pipeZ]}
          scale={isMobile ? 0.5 : 1}
          visible={false}
        >
          <mesh geometry={PIN_SPHERE_GEO} position={[0, 0.9, 0]}>
            <meshStandardMaterial
              ref={(m) => {
                sphereMats.current[i] = m;
              }}
              color="#F96B6B"
              emissive="#cc3333"
              emissiveIntensity={4.0}
              roughness={0.1}
              metalness={0.2}
            />
          </mesh>
          <mesh geometry={PIN_CONE_GEO} position={[0, -0.55, 0]} rotation={[Math.PI, 0, 0]}>
            <meshStandardMaterial
              ref={(m) => {
                coneMats.current[i] = m;
              }}
              color="#F96B6B"
              emissive="#cc3333"
              emissiveIntensity={3.0}
              roughness={0.1}
              metalness={0.2}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}

// Projects each pin's label anchor to screen space and writes the transform
// straight onto the DOM node. Mirrors drei <Html distanceFactor> scaling
// (scale = distanceFactor / (2 tan(fov/2) * distance)) so the labels look
// the same as before, minus the per-frame React reconciliation.
const _world = new THREE.Vector3();
const _camPos = new THREE.Vector3();

function LabelProjector({
  fsRef,
  labelElsRef,
}: {
  fsRef: React.MutableRefObject<FrameState>;
  labelElsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
}) {
  const { camera, size } = useThree();

  useFrame(() => {
    const p = fsRef.current.progress;
    const hide = p >= HIDE_PIPELINE_AT || fsRef.current.isMobile;
    const cam = camera as THREE.PerspectiveCamera;
    _camPos.setFromMatrixPosition(cam.matrixWorld);
    const tanHalf = 2 * Math.tan((cam.fov * Math.PI) / 360);

    for (let i = 0; i < LEAK_COUNT; i++) {
      const el = labelElsRef.current[i];
      if (!el) continue;
      const phase = LEAK_PHASES[i];
      const show = !hide && p >= phase.pStart - 0.04;
      if (!show) {
        if (el.style.visibility !== "hidden") el.style.setProperty("visibility", "hidden");
        continue;
      }
      _world.set(LABEL_OFFSET.x, PIN_Y + LABEL_OFFSET.y, phase.pipeZ + LABEL_OFFSET.z);
      const dist = _world.distanceTo(_camPos);
      _world.project(cam);
      if (_world.z > 1) {
        if (el.style.visibility !== "hidden") el.style.setProperty("visibility", "hidden");
        continue;
      }
      const x = (_world.x * 0.5 + 0.5) * size.width;
      const y = (-_world.y * 0.5 + 0.5) * size.height;
      const scale = LABEL_DISTANCE_FACTOR / (tanHalf * dist);
      el.style.setProperty("transform", `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(4)})`);
      if (el.style.visibility !== "visible") el.style.setProperty("visibility", "visible");
    }
  }, 10);

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// M2C FLOATING ICON - billboard sprite that leads the camera
// ─────────────────────────────────────────────────────────────────────────────

function M2CLeader({ fsRef }: { fsRef: React.MutableRefObject<FrameState> }) {
  const ref = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const texture = useTexture("/m2c-icon-float.png");

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const p = fsRef.current.progress;
    const show = p < OUTRO_START;
    ref.current.visible = show;
    if (lightRef.current) lightRef.current.intensity = show ? 25 : 0;
    if (!show) return;
    const t = Math.max(0, Math.min(OUTRO_START, p));
    const z = PIPE_START_Z + (PIPE_END_Z - PIPE_START_Z) * (t / OUTRO_START);
    const bob = Math.sin(clock.elapsedTime * 2.2) * 0.35;
    ref.current.position.set(0, PIPE_Y + 7.0 + bob, z - 10);
    if (lightRef.current) lightRef.current.position.set(0, PIPE_Y + 7.0 + bob, z - 10);
  });

  return (
    <>
      <group ref={ref}>
        <mesh>
          <circleGeometry args={[2.8, 64]} />
          <meshBasicMaterial color="#62D2A2" transparent opacity={0.04} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 0.005]}>
          <circleGeometry args={[1.9, 64]} />
          <meshBasicMaterial color="#62D2A2" transparent opacity={0.12} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <circleGeometry args={[1.35, 64]} />
          <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
        </mesh>
      </group>
      {/* Light lives outside the toggled group so the light count never changes */}
      <pointLight ref={lightRef} color="#62D2A2" intensity={25} distance={25} />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SHADER WARM-UP
// Two costs are paid here, once, while the user is still on the hero, instead
// of mid-scroll the first time each object appears:
//   1. GLSL compile + link. three builds a different variant for drawing to the
//      screen vs. into a render target (the bloom composer), so both are
//      compiled. compileAsync uses KHR_parallel_shader_compile so this part
//      does not block the main thread.
//   2. Pipeline-state creation in ANGLE's Metal backend (Chrome and Safari on
//      Apple hardware). It happens on the FIRST DRAW of a material, not at
//      link time, and costs ~1s for the lit terrain shader. Measured here on
//      an M-series Mac. The only way to pre-pay it is to actually draw every
//      object once, so we render one frame with everything visible through
//      the real render path (the composer when bloom is on), in an idle slot.
// ─────────────────────────────────────────────────────────────────────────────

type ComposerLike = { render: (dt?: number) => void; passes?: { effects?: { name: string; intensity: number }[] }[] };

function ShaderWarmup({ composerRef, onDone }: { composerRef: React.MutableRefObject<ComposerLike | null>; onDone?: () => void }) {
  const { gl, scene, camera } = useThree();
  useEffect(() => {
    let cancelled = false;
    let idleHandle: number | null = null;
    const rt = new THREE.WebGLRenderTarget(4, 4);

    const drawEverythingOnce = () => {
      if (cancelled) return;
      const saved: [THREE.Object3D, boolean, boolean][] = [];
      scene.traverse((o) => {
        saved.push([o, o.visible, o.frustumCulled]);
        o.visible = true;
        o.frustumCulled = false;
      });
      try {
        if (composerRef.current) composerRef.current.render(0);
        else gl.render(scene, camera);
      } finally {
        for (const [o, v, f] of saved) {
          o.visible = v;
          o.frustumCulled = f;
        }
      }
      onDone?.();
    };

    (async () => {
      try {
        gl.setRenderTarget(rt);
        await gl.compileAsync(scene, camera);
        gl.setRenderTarget(null);
        await gl.compileAsync(scene, camera);
      } finally {
        gl.setRenderTarget(null);
        rt.dispose();
      }
      if (cancelled) return;
      const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
      if (w.requestIdleCallback) idleHandle = w.requestIdleCallback(drawEverythingOnce, { timeout: 2500 });
      else idleHandle = window.setTimeout(drawEverythingOnce, 300) as unknown as number;
    })();

    return () => {
      cancelled = true;
      const w = window as Window & { cancelIdleCallback?: (h: number) => void };
      if (idleHandle !== null) {
        if (w.cancelIdleCallback) w.cancelIdleCallback(idleHandle);
        else clearTimeout(idleHandle);
      }
    };
  }, [gl, scene, camera, composerRef, onDone]);
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// SCENE
// ─────────────────────────────────────────────────────────────────────────────

function Scene({
  sv,
  fsRef,
  labelElsRef,
  bloom,
  onCompiled,
  perfRef,
}: {
  sv: MotionValue<number>;
  fsRef: React.MutableRefObject<FrameState>;
  labelElsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  bloom: boolean;
  onCompiled?: () => void;
  perfRef?: React.MutableRefObject<PerfStats>;
}) {
  const fogRef = useRef<THREE.Fog>(null);
  const isMobile = useIsMobileViewport();
  // postprocessing's BloomEffect exposes an `intensity` setter; we drive it per
  // frame. The effect is located through the composer (passing a ref to <Bloom>
  // breaks its prop-stringify memo key), and cached once found.
  const composerRef = useRef<ComposerLike | null>(null);
  const bloomEffect = useRef<{ intensity: number } | null>(null);

  useFrame(() => {
    const p = fsRef.current.progress;
    const outro = p >= 0.89;
    if (fogRef.current) {
      fogRef.current.near = outro ? 300 : 120;
      fogRef.current.far = outro ? 700 : 260;
    }
    if (!bloomEffect.current && composerRef.current?.passes) {
      for (const pass of composerRef.current.passes) {
        const fx = pass.effects?.find((e) => e.name === "BloomEffect");
        if (fx) {
          bloomEffect.current = fx;
          break;
        }
      }
    }
    if (bloomEffect.current) bloomEffect.current.intensity = outro ? 1.8 : 1.3;
  });

  return (
    <>
      <ambientLight intensity={0.22} color="#d0f0e0" />
      <directionalLight position={[20, 45, 15]} intensity={0.6} color="#c8ead8" />
      <pointLight position={[0, 30, -60]} color="#62D2A2" intensity={22} distance={120} />
      <AtmosphericLight fsRef={fsRef} />
      <LeakLights fsRef={fsRef} />

      <CameraRig sv={sv} fsRef={fsRef} />
      <Terrain />
      <ContourGrid />
      <Pipeline fsRef={fsRef} />
      <LeakPins fsRef={fsRef} />
      <LabelProjector fsRef={fsRef} labelElsRef={labelElsRef} />

      <Suspense fallback={null}>
        <M2CLeader fsRef={fsRef} />
        <ShaderWarmup composerRef={composerRef} onDone={onCompiled} />
      </Suspense>

      {LEAK_PHASES.map((phase) => (
        <LeakDrips key={phase.id} phase={phase} fsRef={fsRef} />
      ))}

      <fog ref={fogRef} attach="fog" args={["#060c0a", 120, 260]} />

      {perfRef && <PerfProbe perfRef={perfRef} />}

      {bloom && (
        <EffectComposer ref={composerRef as any} multisampling={0}>
          <Bloom
            intensity={1.3}
            luminanceThreshold={0.22}
            luminanceSmoothing={0.9}
            mipmapBlur
            // Each mip level is two framebuffer switches per frame. Tile-based
            // phone GPUs pay a tile load/store on every switch, independent of
            // resolution, so phones get a shorter chain.
            levels={isMobile ? 4 : 8}
          />
        </EffectComposer>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PERF HUD (?perf=1) - on-device measurement. Main-thread ms is stamped before
// the first useFrame and read after the composer's render (priority 1), so it
// covers scene updates + draw submission. Low fps with small main-thread ms
// means the GPU or the display cap (Low Power Mode, thermal) is the limit.
// ─────────────────────────────────────────────────────────────────────────────

type PerfStats = { fps: number; mainMs: number; frames: number; t0: number; frameStart: number; msAccum: number; renderer: string; pixels: string };

function PerfProbe({ perfRef }: { perfRef: React.MutableRefObject<PerfStats> }) {
  const { gl } = useThree();
  useEffect(() => {
    const ctx = gl.getContext();
    const info = ctx.getExtension("WEBGL_debug_renderer_info");
    perfRef.current.renderer = info ? String(ctx.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "n/a";
  }, [gl, perfRef]);
  useFrame(() => {
    perfRef.current.frameStart = performance.now();
  }, -100);
  useFrame(() => {
    const s = perfRef.current;
    const now = performance.now();
    s.msAccum += now - s.frameStart;
    s.frames++;
    if (now - s.t0 >= 1000) {
      s.fps = (s.frames * 1000) / (now - s.t0);
      s.mainMs = s.msAccum / s.frames;
      s.pixels = `${gl.domElement.width}x${gl.domElement.height}`;
      s.frames = 0;
      s.msAccum = 0;
      s.t0 = now;
    }
  }, 100);
  return null;
}

function PerfHud({ perfRef, tier, bloom, dpr }: { perfRef: React.MutableRefObject<PerfStats>; tier: Tier; bloom: boolean; dpr: string }) {
  const [s, setSnap] = useState<PerfStats>(() => ({ fps: 0, mainMs: 0, frames: 0, t0: 0, frameStart: 0, msAccum: 0, renderer: "", pixels: "" }));
  useEffect(() => {
    const id = window.setInterval(() => setSnap({ ...perfRef.current }), 500);
    return () => window.clearInterval(id);
  }, [perfRef]);
  return (
    <div className="absolute bottom-24 left-2 z-50 pointer-events-none font-mono text-[11px] leading-snug text-[#62D2A2] bg-black/80 px-2 py-1.5 rounded">
      <div>fps {s.fps.toFixed(0)} · main {s.mainMs.toFixed(1)} ms</div>
      <div>tier {tier} · bloom {bloom ? "on" : "off"} · dpr {dpr} · {s.pixels}</div>
      <div>screen dpr {typeof window !== "undefined" ? window.devicePixelRatio : "?"} · lpm-ish {s.fps > 0 && s.fps < 50 && s.mainMs < 4 ? "likely" : "no"}</div>
      <div className="max-w-[80vw] truncate">{s.renderer}</div>
      <div className="max-w-[80vw] truncate">{typeof navigator !== "undefined" ? navigator.userAgent : ""}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ADAPTIVE QUALITY
// tier 2: bloom, dpr up to 2     tier 1: bloom, dpr up to 1.5     tier 0: no bloom, dpr 0.75
// dpr is capped at 2 even on 3x phone screens: 3x would quadruple the pixel
// count vs 1.5x for no visible gain once bloom is applied.
// ─────────────────────────────────────────────────────────────────────────────

type Tier = 0 | 1 | 2;
const TIER_DPR: Record<Tier, number | [number, number]> = { 2: [1, 2], 1: [1, 1.5], 0: 0.75 };
// Phones use the same ladder. A 1.5 cap was tried on 2026-09-05 and read as
// pixelated on a 3x phone, and cutting pixels 44% did not change the chop, so
// fragment fill is not the mobile bottleneck.

// Only ever steps DOWN, and only on sustained low fps (average under 30 for
// ~2.5s). Every tier change costs a composer rebuild and, for the bloom
// on/off step, a round of shader compiles, so oscillating would be worse than
// either tier on its own. Mounted only after precompile has finished so the
// startup compile burst can't trigger it.
// The floor stays at 30 on phones too: a 45 floor (tried 2026-09-05) fires on
// a display capped at ~30-48 fps (Low Power Mode, thermal) and only makes the
// image pixelated without helping the chop.
function QualityGovernor({ tier, setTier }: { tier: Tier; setTier: (t: Tier) => void }) {
  const onDecline = useCallback(() => setTier(Math.max(0, tier - 1) as Tier), [tier, setTier]);
  const onFallback = useCallback(() => setTier(0), [setTier]);
  return (
    <PerformanceMonitor
      ms={250}
      iterations={10}
      bounds={() => [30, 1000]}
      flipflops={3}
      onDecline={onDecline}
      onFallback={onFallback}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DOM OVERLAYS
// Each one subscribes to the scroll value itself and only re-renders on a
// discrete change, so the root component stays untouched during scroll.
// ─────────────────────────────────────────────────────────────────────────────

function useDiscrete<T extends string | number | boolean>(sv: MotionValue<number>, derive: (p: number) => T): T {
  const [value, setValue] = useState<T>(() => derive(sv.get()));
  useMotionValueEvent(sv, "change", (p) => {
    const next = derive(p);
    setValue((prev) => (prev === next ? prev : next));
  });
  return value;
}

function PinLabel({
  phase,
  index,
  sv,
  labelElsRef,
}: {
  phase: LeakPhase;
  index: number;
  sv: MotionValue<number>;
  labelElsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
}) {
  const solved = useDiscrete(sv, (p) => p >= phase.pFix);

  return (
    <div
      ref={(el) => {
        labelElsRef.current[index] = el;
      }}
      className="hidden md:block"
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transformOrigin: "0 0",
        willChange: "transform",
        visibility: "hidden",
        pointerEvents: "none",
        fontFamily: "Outfit, Inter, sans-serif",
        userSelect: "none",
        width: "min(580px, calc(100vw - 160px))",
        maxWidth: "85vw",
      }}
    >
      {solved ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <span style={{ fontSize: "clamp(12px, 2vw, 18px)", letterSpacing: "0.22em", textTransform: "uppercase", color: "#62D2A2", fontFamily: "monospace", fontWeight: 700 }}>
            ✓ sealed
          </span>
          <span style={{ fontSize: "clamp(20px, 4.2vw, 35px)", fontWeight: 800, color: "#ffffff", lineHeight: 1.05 }}>{phase.solution}</span>
          <span style={{ fontSize: "clamp(15px, 3.2vw, 28px)", color: "rgba(255,255,255,0.86)", lineHeight: 1.2, fontWeight: 600 }}>{phase.solutionSub}</span>
          {phase.id === 2 && (
            <div style={{ marginTop: "24px", display: "flex", flexDirection: "row", gap: "32px", width: "100%" }}>
              <div style={{ background: "rgba(14, 40, 30, 0.85)", borderLeft: "3px solid #62D2A2", padding: "16px 20px", width: "300px", borderRadius: "0 12px 12px 0" }}>
                <h4 style={{ color: "#ffffff", fontSize: "18px", fontWeight: 900, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Rep Enablement</h4>
                <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.9)", lineHeight: 1.5, fontWeight: 500 }}>Transforming reps into surgical deal-closers with repeatable playbooks.</p>
              </div>
              <div style={{ background: "rgba(20, 28, 26, 0.85)", borderLeft: "3px solid rgba(255,255,255,0.4)", padding: "16px 20px", width: "350px", borderRadius: "0 12px 12px 0", pointerEvents: "auto" }}>
                <h4 style={{ color: "#ffffff", fontSize: "18px", fontWeight: 900, marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Rev Ops</h4>
                <div style={{ height: "1px", background: "rgba(255,255,255,0.2)", margin: "12px 0" }} />
                <div style={{ marginBottom: "16px" }}>
                  <p style={{ fontSize: "16px", color: "#fff", fontWeight: 800, marginBottom: "4px" }}>Existing Tech Stack</p>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", marginBottom: "8px", lineHeight: 1.4 }}>Optimizing CRM for speed.</p>
                  <a href="/services/implementations" style={{ fontSize: "13px", color: "#62D2A2", fontWeight: 900, textDecoration: "none", borderBottom: "1px solid rgba(98, 210, 162, 0.3)" }}>
                    VIEW IMPLEMENTATION →
                  </a>
                </div>
                <div>
                  <p style={{ fontSize: "16px", color: "#fff", fontWeight: 800, marginBottom: "4px" }}>Custom Tools</p>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", marginBottom: "8px", lineHeight: 1.4 }}>Bespoke software solutions.</p>
                  <a href="/services/custom-buildouts" style={{ fontSize: "13px", color: "#62D2A2", fontWeight: 900, textDecoration: "none", borderBottom: "1px solid rgba(98, 210, 162, 0.3)" }}>
                    VIEW BUILDOUTS →
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <span style={{ fontSize: "clamp(12px, 2vw, 18px)", letterSpacing: "0.22em", textTransform: "uppercase", color: "#F96B6B", fontFamily: "monospace", fontWeight: 700 }}>
            ● leak detected
          </span>
          <span style={{ fontSize: "clamp(20px, 4.2vw, 35px)", fontWeight: 800, color: "#ffffff", lineHeight: 1.05 }}>{phase.label}</span>
          <span style={{ fontSize: "clamp(15px, 3.2vw, 28px)", color: "rgba(255,255,255,0.78)", lineHeight: 1.2, fontWeight: 600 }}>{phase.sub}</span>
        </div>
      )}
    </div>
  );
}

const RAIL_POINTS = LEAK_PHASES.map((p) => p.pFix);

function StoryOverlay({ sv }: { sv: MotionValue<number> }) {
  const visible = useDiscrete(sv, (p) => p < OUTRO_START);
  // Encode dot states into one integer so a single state drives all dots.
  const dotState = useDiscrete(sv, (p) => {
    let s = 0;
    RAIL_POINTS.forEach((pt, i) => {
      if (p >= pt) s |= 1 << (i * 2);
      if (p >= pt + 0.12) s |= 1 << (i * 2 + 1);
    });
    return s;
  });
  const fillHeight = useTransform(sv, (p) => `${(Math.min(p, OUTRO_START) / OUTRO_START) * 100}%`);

  if (!visible) return null;

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 md:flex flex-col items-center" style={{ height: "52vh" }}>
        <div className="absolute inset-x-0 rounded-full" style={{ width: 2, height: "100%", background: "rgba(255,255,255,0.07)", left: "50%", transform: "translateX(-50%)" }} />
        <motion.div
          className="absolute rounded-full"
          style={{ width: 2, top: 0, height: fillHeight, background: "linear-gradient(to bottom, rgba(249,107,107,0.6), #62D2A2)", left: "50%", transform: "translateX(-50%)" }}
        />
        {RAIL_POINTS.map((pt, i) => {
          const passed = (dotState & (1 << (i * 2))) !== 0;
          const fixed = (dotState & (1 << (i * 2 + 1))) !== 0;
          return (
            <div key={i} className="absolute" style={{ top: `${(pt / OUTRO_START) * 100}%`, left: "50%", transform: "translate(-50%, -50%)" }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: fixed ? "#62D2A2" : passed ? "#F96B6B" : "rgba(255,255,255,0.15)",
                  boxShadow: fixed ? "0 0 10px #62D2A2" : passed ? "0 0 10px #F96B6B" : "none",
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

function LeakCounter({ sv }: { sv: MotionValue<number> }) {
  const fixed = useDiscrete(sv, (p) => LEAK_PHASES.filter((ph) => p >= ph.pFix).length);
  const show = useDiscrete(sv, (p) => p > 0.1 && p < OUTRO_START);

  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-7 left-8 z-20 pointer-events-none">
          <div className="flex flex-col gap-1">
            <span className="text-white/20 font-mono text-[11px] tracking-[0.3em] uppercase">Leaks sealed</span>
            <div className="flex gap-2 mt-1">
              {LEAK_PHASES.map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-0.5 rounded-full transition-all duration-700"
                  style={{ background: i < fixed ? "#62D2A2" : "rgba(255,255,255,0.1)", boxShadow: i < fixed ? "0 0 8px #62D2A2" : "none" }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FixesOverview({ sv }: { sv: MotionValue<number> }) {
  const show = useDiscrete(sv, (p) => p >= HIDE_PIPELINE_AT);

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black z-20 pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute inset-0 z-30 flex items-center justify-center p-6 md:p-12 pointer-events-none"
          >
            <div className="w-full max-w-4xl text-center flex flex-col items-center">
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[#62D2A2] text-xs font-black uppercase tracking-[0.4em] mb-4">
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
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-white text-xl md:text-2xl font-bold tracking-tight mb-12">
                And Prove that we can before you commit
              </motion.p>
              <div className="flex flex-col gap-6 w-fit mx-auto items-start mb-16">
                {LEAK_PHASES.map((phase, i) => (
                  <motion.div key={phase.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08 }} className="flex items-center gap-5">
                    <div className="w-8 h-8 rounded-full bg-[#62D2A2]/10 border border-[#62D2A2]/30 flex items-center justify-center shrink-0">
                      <span className="text-[#62D2A2] text-sm font-black">✓</span>
                    </div>
                    <p className="text-white text-2xl md:text-3xl font-extrabold tracking-tight">{phase.solution}</p>
                  </motion.div>
                ))}
              </div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="pointer-events-auto">
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

function MobilePhaseOverlay({ sv }: { sv: MotionValue<number> }) {
  // -1 = nothing, otherwise index*2 + solved
  const key = useDiscrete(sv, (p) => {
    if (p >= OUTRO_START) return -1;
    let idx = -1;
    LEAK_PHASES.forEach((phase, i) => {
      if (p >= phase.pStart - 0.04) idx = i;
    });
    if (idx < 0) return -1;
    return idx * 2 + (p >= LEAK_PHASES[idx].pFix ? 1 : 0);
  });
  if (key < 0) return null;
  const active = LEAK_PHASES[key >> 1];
  const isSolved = (key & 1) === 1;
  const color = isSolved ? "#62D2A2" : "#F96B6B";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.3 }}
        className="absolute top-20 left-0 right-0 z-30 flex md:hidden justify-center px-6 pointer-events-none"
      >
        <div style={{ textAlign: "center", maxWidth: "280px" }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color, fontFamily: "monospace", fontWeight: 700, display: "block", marginBottom: "8px", textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}>
            {isSolved ? "✓ sealed" : "● leak detected"}
          </span>
          <span style={{ fontSize: "22px", fontWeight: 800, color: "#ffffff", lineHeight: 1.1, display: "block", marginBottom: "6px", textShadow: "0 2px 12px rgba(0,0,0,1), 0 1px 4px rgba(0,0,0,0.9)" }}>
            {isSolved ? active.solution : active.label}
          </span>
          <span style={{ fontSize: "13px", color: "#ffffff", lineHeight: 1.45, fontWeight: 500, display: "block", textShadow: "0 1px 8px rgba(0,0,0,1), 0 1px 3px rgba(0,0,0,0.9)", opacity: 0.85 }}>
            {isSolved ? active.solutionSub : active.sub}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function ScrollCue({ sv }: { sv: MotionValue<number> }) {
  const show = useDiscrete(sv, (p) => p <= 0.05);
  if (!show) return null;
  return (
    <motion.div
      animate={{ opacity: [0.4, 0.9, 0.4] }}
      transition={{ repeat: Infinity, duration: 2.2 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2"
    >
      <span className="text-white/30 font-mono text-[11px] tracking-[0.35em] uppercase">scroll to begin</span>
      <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export default function TopographicMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const fsRef = useRef<FrameState>({ progress: 0, smooth: 0, isMobile: false });
  const labelElsRef = useRef<(HTMLDivElement | null)[]>(new Array(LEAK_COUNT).fill(null));

  const providerLowTier = useIsLowTier();
  const [isMobile, setIsMobile] = useState(false);
  const [maxTier, setMaxTier] = useState<Tier | null>(null); // null until device signals are read
  const [tier, setTierState] = useState<Tier>(2);
  const [compiled, setCompiled] = useState(false);
  const setTier = useCallback((t: Tier) => setTierState((prev) => (t < prev ? t : prev)), []);
  const onCompiled = useCallback(() => setCompiled(true), []);
  const [perfOn, setPerfOn] = useState(false);
  const perfRef = useRef<PerfStats>({ fps: 0, mainMs: 0, frames: 0, t0: 0, frameStart: 0, msAccum: 0, renderer: "", pixels: "" });
  useEffect(() => {
    // Deferred a frame so the check doesn't run synchronously inside the effect.
    const frame = requestAnimationFrame(() => setPerfOn(new URLSearchParams(window.location.search).has("perf")));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Pause the render loop while the section is off-screen or the tab is hidden.
  const { ref: viewRef, isActive } = useActiveInView() as { ref: React.MutableRefObject<HTMLElement | null>; isActive: boolean };

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const lowCpu = (navigator.hardwareConcurrency ?? 8) <= 4;
      const lowRam = ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4;
      // Everyone starts at full quality unless the device signals weakness;
      // the PerformanceMonitor steps down from measured fps if needed.
      const start: Tier = providerLowTier || reducedMotion || (lowCpu && lowRam) ? 0 : 2;
      setMaxTier(start);
      setTierState(start);
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
        {maxTier !== null && (
          <Canvas
            gl={{
              // Under the EffectComposer the canvas MSAA only antialiases the
              // final fullscreen quad: no visual gain, one full-res resolve per
              // frame. Phones skip it.
              antialias: !isMobile,
              alpha: false,
              powerPreference: "high-performance",
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.4,
            }}
            frameloop={isActive ? "always" : "never"}
            dpr={TIER_DPR[tier]}
            camera={{ fov: 58, near: 0.5, far: 320, position: [30, 140, 160] }}
            shadows={false}
            style={{ background: "#060c0a", position: "absolute", inset: 0 }}
          >
            {compiled && <QualityGovernor tier={tier} setTier={setTier} />}
            <Scene sv={scrollYProgress} fsRef={fsRef} labelElsRef={labelElsRef} bloom={tier >= 1} onCompiled={onCompiled} perfRef={perfOn ? perfRef : undefined} />
          </Canvas>
        )}

        {/* Pin labels (desktop) - positioned each frame by LabelProjector */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          {LEAK_PHASES.map((phase, i) => (
            <PinLabel key={phase.id} phase={phase} index={i} sv={scrollYProgress} labelElsRef={labelElsRef} />
          ))}
        </div>

        {/* Edge vignette */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(6,12,10,0.7) 100%)" }}
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#060c0a] to-transparent z-10 pointer-events-none" />

        {/* UI layers */}
        <LeakCounter sv={scrollYProgress} />
        <StoryOverlay sv={scrollYProgress} />
        <MobilePhaseOverlay sv={scrollYProgress} />
        <FixesOverview sv={scrollYProgress} />
        <ScrollCue sv={scrollYProgress} />
        {perfOn && <PerfHud perfRef={perfRef} tier={tier} bloom={tier >= 1} dpr={JSON.stringify(TIER_DPR[tier])} />}
      </div>
    </section>
  );
}
