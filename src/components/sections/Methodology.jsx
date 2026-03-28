'use client';

import { motion } from 'framer-motion';
import { Settings, GitMerge, BarChart3 } from 'lucide-react';
import styles from './Methodology.module.css';

const methods = [
  {
    id: 'build',
    title: 'Build the Sales System',
    description: 'We design the infrastructure that supports real selling:',
    bullets: [
      'deal frameworks',
      'battlecards',
      'positioning guides',
      'rep enablement tools'
    ],
    icon: <Settings size={28} className={styles.icon} />,
    animation: {
      type: 'build',
    }
  },
  {
    id: 'embed',
    title: 'Embed with Sales Teams',
    description: 'We work directly with your reps inside live deals.',
    bullets: [
      'coaching calls',
      'message refinement',
      'deal strategy'
    ],
    icon: <GitMerge size={28} className={styles.icon} />,
    animation: {
      type: 'embed',
    }
  },
  {
    id: 'prove',
    title: 'Prove the Impact',
    description: 'We measure adoption and tie enablement to real pipeline progress.',
    bullets: [
      'deal velocity',
      'pipeline confidence',
      'rep adoption'
    ],
    icon: <BarChart3 size={28} className={styles.icon} />,
    animation: {
      type: 'prove',
    }
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function Methodology() {
  return (
    <section className={styles.methodologySection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={`section-heading ${styles.title}`}>
            The Map2Close <span className="primary-gradient">Method</span>
          </h2>
          <p className="body-text">A rigorous framework designed to convert chaotic workflows into a predictable revenue system.</p>
        </div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {methods.map((method) => (
            <motion.div 
              key={method.id} 
              className={`${styles.card} glass-panel glow-shadow-hover`}
              variants={cardVariants}
              whileHover="hover"
            >
              <div className={styles.iconContainer}>
                {method.icon}
              </div>
              
              <h3 className="section-heading" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{method.title}</h3>
              <p className="body-text" style={{ marginBottom: '1.5rem', minHeight: '50px' }}>{method.description}</p>
              
              <ul className={styles.bulletList}>
                {method.bullets.map((bullet, idx) => (
                  <li key={idx} className={styles.bulletItem}>
                    <span className={styles.bulletDot} />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className={styles.animationWindow}>
                {/* Custom micro-animations based on type */}
                {method.animation.type === 'build' && (
                  <svg viewBox="0 0 100 100" className={styles.microSvg}>
                    <motion.path 
                      variants={{ hover: { pathLength: 1, opacity: 1 }, initial: { pathLength: 0, opacity: 0.3 } }}
                      initial="initial"
                      d="M 20 80 L 50 20 L 80 80" 
                      fill="none" 
                      stroke="var(--accent-primary)" 
                      strokeWidth="4" 
                    />
                    <motion.circle variants={{ hover: { scale: 1.2 }, initial: { scale: 1 } }} initial="initial" cx="50" cy="50" r="10" fill="var(--bg-secondary)" stroke="var(--text-secondary)" strokeWidth="2" />
                  </svg>
                )}
                
                {method.animation.type === 'embed' && (
                  <svg viewBox="0 0 100 100" className={styles.microSvg}>
                    <motion.circle variants={{ hover: { cx: 40 }, initial: { cx: 20 } }} initial="initial" cx="20" cy="50" r="12" fill="var(--accent-secondary)" />
                    <motion.circle variants={{ hover: { cx: 60 }, initial: { cx: 80 } }} initial="initial" cx="80" cy="50" r="12" fill="var(--accent-primary)" />
                    <motion.path variants={{ hover: { pathLength: 1 }, initial: { pathLength: 0 } }} initial="initial" d="M 40 50 L 60 50" stroke="white" strokeWidth="2" />
                  </svg>
                )}
                
                {method.animation.type === 'prove' && (
                  <svg viewBox="0 0 100 100" className={styles.microSvg}>
                    <motion.rect variants={{ hover: { height: 40, y: 40 }, initial: { height: 10, y: 70 } }} initial="initial" x="20" y="70" width="15" height="10" fill="var(--text-secondary)" />
                    <motion.rect variants={{ hover: { height: 60, y: 20 }, initial: { height: 20, y: 60 } }} initial="initial" x="45" y="60" width="15" height="20" fill="var(--accent-secondary)" />
                    <motion.rect variants={{ hover: { height: 80, y: 0 }, initial: { height: 30, y: 50 } }} initial="initial" x="70" y="50" width="15" height="30" fill="var(--accent-primary)" />
                  </svg>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
