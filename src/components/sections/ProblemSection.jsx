'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';
import styles from './ProblemSection.module.css';

const structuralBullets = [
  "CRM systems that do not actually help reps sell",
  "Outbound that feels random and inconsistent",
  "Follow-ups that fall through the cracks",
  "Deals stalling without clear next steps"
];

const resultsBullets = [
  "Lost pipeline",
  "Slow deal cycles",
  "Wasted rep time"
];

export default function ProblemSection() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  
  const isTextInView = useInView(textRef, { once: false, margin: "-100px 0px" });

  // Scroll animations for the pipeline restructuring
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Chaotic -> Structured transforms
  const node1Y = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const node2Y = useTransform(scrollYProgress, [0, 1], [150, 0]);
  const node3Y = useTransform(scrollYProgress, [0, 1], [-80, 0]);
  const node4Y = useTransform(scrollYProgress, [0, 1], [120, 0]);
  
  const pathOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const brokenPathOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <section ref={containerRef} className={styles.problemSection}>
      <div className={styles.container}>
        
        {/* Left Side: Text Content */}
        <div ref={textRef} className={styles.textContent}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`section-heading ${styles.title}`}>
              Most Sales Teams Don’t Have a <span className="primary-gradient">Sales System.</span>
            </h2>
            <p className="body-text" style={{ marginBottom: '2rem', fontSize: '1.25rem' }}>
              Sales teams invest heavily in tools and content, but execution breaks down inside live deals.
            </p>
          </motion.div>

          <h3 className="body-text" style={{ marginBottom: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Most sales teams struggle with:</h3>
          <ul className={styles.bulletList} style={{ marginBottom: '2rem' }}>
            {structuralBullets.map((bullet, index) => (
              <motion.li 
                key={index}
                className={styles.bulletItem}
                initial={{ opacity: 0, x: -20 }}
                animate={isTextInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.15) }}
              >
                <div className={styles.iconWrapper}>
                  <AlertCircle size={20} className={styles.icon} />
                </div>
                <span className="body-text">{bullet}</span>
              </motion.li>
            ))}
          </ul>

          <h3 className="body-text" style={{ marginBottom: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>This leads to:</h3>
          <ul className={styles.bulletList}>
            {resultsBullets.map((bullet, index) => (
              <motion.li 
                key={index}
                className={styles.bulletItem}
                initial={{ opacity: 0, x: -20 }}
                animate={isTextInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.5 + (index * 0.15) }}
              >
                <div className={styles.iconWrapper} style={{ background: 'rgba(255, 100, 100, 0.1)', color: '#ff6464' }}>
                  <AlertTriangle size={20} />
                </div>
                <span className="body-text">{bullet}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right Side: Interactive Visualization */}
        <div className={styles.visualization}>
          <div className={`${styles.glassCard} glass-panel`}>
            
            <svg width="100%" height="400" viewBox="0 0 500 400" className={styles.svgContainer}>
              {/* Broken Paths (Fades out) */}
              <motion.path 
                style={{ opacity: brokenPathOpacity }}
                d="M 50 100 L 150 250 L 250 50 L 350 300 L 450 150" 
                className={styles.brokenPath} 
              />
              <motion.path 
                style={{ opacity: brokenPathOpacity }}
                d="M 50 300 L 150 150 L 300 350 L 400 100" 
                className={styles.brokenPathSecondary} 
              />

              {/* Structured Paths - The Map2Close Overlay (Fades in) */}
              <motion.path 
                style={{ opacity: pathOpacity }}
                d="M 50 200 L 150 200 L 250 200 L 350 200 L 450 200" 
                className={styles.structuredPath} 
              />

              {/* Nodes organizing into a line */}
              <motion.g style={{ y: node1Y }}>
                <circle cx="150" cy="200" r="12" className={styles.node} />
                <motion.circle cx="150" cy="200" r="16" className={styles.nodeGlow} style={{ opacity: brokenPathOpacity }} />
              </motion.g>

              <motion.g style={{ y: node2Y }}>
                <circle cx="250" cy="200" r="12" className={styles.node} />
                <motion.path d="M 245 195 L 255 205 M 255 195 L 245 205" className={styles.cross} style={{ opacity: brokenPathOpacity }} />
              </motion.g>

              <motion.g style={{ y: node3Y }}>
                <circle cx="350" cy="200" r="12" className={styles.node} />
              </motion.g>

              <motion.g style={{ y: node4Y }}>
                <circle cx="450" cy="200" r="16" className={styles.nodeWin} style={{ opacity: pathOpacity }} />
              </motion.g>

              {/* Start Node */}
              <circle cx="50" cy="200" r="12" className={styles.node} />

            </svg>
            
            <div className={styles.statusIndicator}>
              <motion.div style={{ opacity: brokenPathOpacity }} className={styles.statusBroken}>
                <AlertTriangle size={16} /> Deals Falling Out
              </motion.div>
              <motion.div style={{ opacity: pathOpacity }} className={styles.statusStructured}>
                <CheckCircle2 size={16} /> Map2Close Overlay
              </motion.div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
