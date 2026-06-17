"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";

export default function RadialOrbitalTimeline({ timelineData }) {
  const [expandedItems, setExpandedItems] = useState({});
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState({});
  const [centerOffset] = useState({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState(null);
  const containerRef = useRef(null);
  const orbitRef = useRef(null);
  const nodeRefs = useRef({});
  const angleRef = useRef(0);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);

  const handleContainerClick = (e) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });
      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const relatedItems = getRelatedItems(id);
        const newPulseEffect = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return newState;
    });
  };

  useEffect(() => {
    if (!autoRotate) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    let inView = true;
    const isActive = () => inView && !document.hidden;
    let observer;
    if (containerRef.current && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => { inView = entries.some((e) => e.isIntersecting); },
        { rootMargin: "200px" }
      );
      observer.observe(containerRef.current);
    }
    const tick = (timestamp) => {
      // Skip the per-frame rotation re-render while off-screen / tab hidden,
      // but keep time continuous so it doesn't jump on resume.
      if (!isActive()) {
        lastTimeRef.current = timestamp;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (lastTimeRef.current !== null) {
        const delta = timestamp - lastTimeRef.current;
        // ~0.3 degrees per 50ms = 6 deg/s
        angleRef.current = (angleRef.current + (delta / 50) * 0.3) % 360;
        setRotationAngle(Number(angleRef.current.toFixed(3)));
      }
      lastTimeRef.current = timestamp;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (observer) observer.disconnect();
      lastTimeRef.current = null;
    };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index, total) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 210;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId) => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId) => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{ perspective: "1000px", transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)` }}
        >
          {/* Center orb - clickable to open Phase 1 */}
          <div
            className="absolute flex items-center justify-center z-10 cursor-pointer group"
            style={{ width: 56, height: 56 }}
            onClick={(e) => { e.stopPropagation(); toggleItem(1); }}
          >
            {/* Pulsing click indicator rings - outside clip boundary */}
            <div className="absolute w-20 h-20 rounded-full border border-[#62D2A2]/40 animate-ping opacity-60 pointer-events-none" />
            <div className="absolute w-24 h-24 rounded-full border border-[#62D2A2]/20 animate-ping opacity-40 pointer-events-none" style={{ animationDelay: '0.4s' }} />
            {/* "Click" label - outside clip boundary */}
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[13px] font-black uppercase tracking-[0.25em] text-[#62D2A2] pointer-events-none">
              click
            </div>
            {/* Clipped circle with icon */}
            <div className="w-14 h-14 rounded-full bg-black border border-white/30 flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(98,210,162,0.25)]">
              <img
                src="/m2c-icon.png"
                alt="M2C Icon"
                className="w-10 h-10 object-contain invert brightness-200 group-hover:scale-110 transition-transform duration-200"
              />
            </div>
          </div>

          {/* Orbit ring */}
          <div className="absolute rounded-full border border-white/20" style={{width:'420px',height:'420px'}}></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: isExpanded ? 200 : position.zIndex,
                  opacity: isExpanded ? 1 : position.opacity,
                }}
                onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}
              >
                {/* Glow halo */}
                <div
                  className={`absolute rounded-full ${isPulsing ? "animate-pulse" : ""}`}
                  style={{
                    background: `radial-gradient(circle, rgba(98,210,162,0.15) 0%, rgba(98,210,162,0) 70%)`,
                    width: `${item.energy * 0.4 + 40}px`,
                    height: `${item.energy * 0.4 + 40}px`,
                    left: `-${(item.energy * 0.4 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.4 + 40 - 40) / 2}px`,
                  }}
                />

                {/* Node circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 transform ${
                    isExpanded
                      ? "bg-[#62D2A2] text-black border-[#62D2A2] shadow-[0_0_20px_rgba(98,210,162,0.5)] scale-150"
                      : isRelated
                      ? "bg-[#62D2A2]/20 text-[#62D2A2] border-[#62D2A2]/60 animate-pulse"
                      : "bg-black text-white border-white/50 hover:border-white/80"
                  }`}
                >
                  <Icon size={14} />
                </div>

                {/* Label */}
                <div
                  className={`absolute top-12 whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300 ${
                    isExpanded ? "text-[#62D2A2] scale-110" : "text-white/90"
                  }`}
                  style={{ left: "50%", transform: isExpanded ? "translateX(-50%) scale(1.1)" : "translateX(-50%)" }}
                >
                  {item.title}
                </div>

                {/* Expanded card */}
                {isExpanded && (
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-black/95 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl shadow-black/80 overflow-visible z-50">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-[#62D2A2]/40" />
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className={`px-2 py-0.5 text-[10px] font-bold tracking-wider rounded-full border ${
                          item.status === "completed"
                            ? "bg-[#62D2A2]/10 text-[#62D2A2] border-[#62D2A2]/30"
                            : item.status === "in-progress"
                            ? "bg-white/10 text-white border-white/20"
                            : "bg-white/5 text-white/40 border-white/10"
                        }`}>
                          {item.status === "completed" ? "ACTIVE" : item.status === "in-progress" ? "IN PROGRESS" : "UPCOMING"}
                        </span>
                        <span className="text-[10px] font-mono text-white/30">{item.date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-xs text-white/60 leading-relaxed">{item.content}</p>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/5">
                          <p className="text-[10px] uppercase tracking-wider text-white/30 mb-2">Connected</p>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((i) => i.id === relatedId);
                              return (
                                <button
                                  key={relatedId}
                                  className="flex items-center gap-1 px-2 py-1 text-[10px] rounded border border-white/10 bg-white/5 hover:bg-[#62D2A2]/10 hover:border-[#62D2A2]/30 text-white/50 hover:text-[#62D2A2] transition-all"
                                  onClick={(e) => { e.stopPropagation(); toggleItem(relatedId); }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight size={8} />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
