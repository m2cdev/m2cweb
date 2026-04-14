'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Share2, Zap, CheckCircle } from 'lucide-react';
import styles from './ProcessScroll.module.css';

export default function ProcessScroll() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scene 1: Chaotic (0 to 0.35)
  // Scene 1: Chaotic
  const scene1Opacity = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0]);
  
  // Scene 2: Overlay
  const scene2Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.65, 0.75], [0, 1, 1, 0]);
  
  // Scene 3: Organized
  const scene3Opacity = useTransform(scrollYProgress, [0.65, 0.75, 1], [0, 1, 1]);

  // Diagram Animations
  // Chaotic nodes moving randomly
  const chaoticNodeX = useTransform(scrollYProgress, [0, 0.35], [0, 100]);
  const chaoticNodeY = useTransform(scrollYProgress, [0, 0.35], [0, -100]);
  
  // Map2Close Overlay entering
  const overlayScale = useTransform(scrollYProgress, [0.35, 0.55], [1.5, 1]);
  const overlayOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);

  // Organized paths flowing
  const structuredPathLength = useTransform(scrollYProgress, [0.75, 0.95], [0, 1]);

  return (
    <section ref={containerRef} className={styles.scrollContainer}>
      <div className={styles.stickyWrapper}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={`section-heading ${styles.title}`}>
              The <span className="primary-gradient">Transformation</span>
            </h2>
          </div>

          <div className={styles.visualWindow}>
            
            {/* Scene 1: Chaotic Pipeline */}
            <motion.div style={{ opacity: scene1Opacity }} className={styles.sceneLayer}>
              <div className={styles.sceneText}>
                <h3 className="sub-heading">Chaotic Execution</h3>
                <p className="body-text">Deals stall and visibility disappears into the noise.</p>
              </div>
              <div className={styles.diagramArea}>
                <svg width="100%" height="100%" viewBox="0 0 800 500" style={{ overflow: 'visible' }}>
                  <path d="M 100 350 L 300 200 L 500 500" className={styles.pathBroken} />
                  <path d="M 100 500 L 300 350" className={styles.pathBroken} />
                  {/* Deals falling out anim */}
                  <motion.circle 
                    cx="300" cy="350" r="12" 
                    fill="var(--accent-highlight)"
                    animate={{ cy: [350, 650], opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                  <motion.circle 
                    cx="500" cy="500" r="12" 
                    fill="var(--accent-highlight)"
                    animate={{ cy: [500, 750], opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                  />
                  <motion.g style={{ x: chaoticNodeX, y: chaoticNodeY }}>
                     <circle cx="300" cy="200" r="24" className={styles.nodeChaotic} />
                  </motion.g>
                  <circle cx="100" cy="350" r="24" className={styles.nodeChaotic} />
                  <circle cx="100" cy="500" r="24" className={styles.nodeChaotic} />
                </svg>
              </div>
            </motion.div>

            {/* Scene 2: Map2Close System Overlays */}
            <motion.div style={{ opacity: scene2Opacity }} className={styles.sceneLayer}>
              <div className={styles.sceneText}>
                <h3 className="sub-heading">The Revenue Engine</h3>
                <p className="body-text">We install structured systems that connect every deal stage.</p>
              </div>
              <div className={styles.diagramArea}>
                <motion.div 
                  className={styles.overlayGrid}
                  style={{ scale: overlayScale, opacity: overlayOpacity }}
                >
                  <div className={styles.overlayLineH} />
                  <div className={styles.overlayLineV} />
                  <div className={styles.overlayCenter}>
                    <Share2 className={styles.overlayIcon} size={48} />
                  </div>
                </motion.div>
                
                {/* Nodes starting to snap to grid */}
                <svg width="100%" height="100%" viewBox="0 0 800 500" style={{ overflow: 'visible' }}>
                  <path d="M 100 350 L 400 350 L 700 350" className={styles.pathConnecting} />
                  <circle cx="100" cy="350" r="24" className={styles.nodeNeutral} />
                  <circle cx="400" cy="350" r="24" className={styles.nodeNeutral} />
                  <circle cx="700" cy="350" r="24" className={styles.nodeNeutral} />
                </svg>
              </div>
            </motion.div>

            {/* Scene 3: Organized Pipeline */}
            <motion.div style={{ opacity: scene3Opacity }} className={styles.sceneLayer}>
              <div className={styles.sceneText}>
                <h3 className="sub-heading">Predictable Growth</h3>
                <p className="body-text">Repeatable motions that convert a high-velocity pipeline into revenue.</p>
              </div>
              <div className={styles.diagramArea}>
                <svg width="100%" height="100%" viewBox="0 0 800 500" style={{ overflow: 'visible' }}>
                  <path d="M 100 350 L 700 350" className={styles.pathSolid} />
                  
                  {/* Flowing deal anim */}
                  <motion.path 
                     d="M 100 350 L 700 350" 
                     className={styles.pathFlow}
                     style={{ pathLength: structuredPathLength }}
                  />
                  
                  <motion.circle 
                    cx="100" cy="350" r="12" 
                    fill="var(--accent-primary)"
                    animate={{ cx: [100, 700] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  />

                  <circle cx="100" cy="350" r="20" className={styles.nodeOrganized} />
                  <circle cx="300" cy="350" r="20" className={styles.nodeOrganized} />
                  <circle cx="500" cy="350" r="20" className={styles.nodeOrganized} />
                  <circle cx="700" cy="350" r="32" className={styles.nodeClosedWon} />
                  <CheckCircle size={32} color="var(--accent-primary)" x="684" y="334" />
                </svg>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
