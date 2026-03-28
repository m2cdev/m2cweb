'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Stethoscope, HardDrive, Users, LineChart } from 'lucide-react';
import styles from './HowItWorks.module.css';

const stages = [
  {
    id: 1,
    title: 'Diagnose Revenue Motion',
    description: 'We audit your entire go-to-market architecture to find the friction points causing deal stall and rep inconsistency.',
    icon: <Stethoscope size={24} />
  },
  {
    id: 2,
    title: 'Install Systems',
    description: 'We build the actual infrastructure: battlecards, automated intent funnels, and structured pipeline stages with rigid exit criteria.',
    icon: <HardDrive size={24} />
  },
  {
    id: 3,
    title: 'Embed With Sales Team',
    description: 'A system is useless if reps don\'t use it. We embed directly with your team, running coaching sessions and live deal tear-downs.',
    icon: <Users size={24} />
  },
  {
    id: 4,
    title: 'Measure Pipeline Impact',
    description: 'We track the only metrics that matter: meeting lift, pipeline velocity, and closed-won revenue.',
    icon: <LineChart size={24} />
  }
];

export default function HowItWorksPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate the active index based on scroll progress (0 to 1 split into 4 segments)
  const node1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.2], [1, 1, 0.3]);
  const node2Opacity = useTransform(scrollYProgress, [0.15, 0.3, 0.5], [0.3, 1, 0.3]);
  const node3Opacity = useTransform(scrollYProgress, [0.45, 0.6, 0.8], [0.3, 1, 0.3]);
  const node4Opacity = useTransform(scrollYProgress, [0.75, 0.9], [0.3, 1]);

  const lineProgress = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

  return (
    <div className={styles.page}>
      
      <div className={styles.header}>
        <div className={styles.container}>
          <h1 className="hero-heading">
            The Map2Close <span className="primary-gradient">Blueprint</span>
          </h1>
          <p className="body-text" style={{ maxWidth: '600px', margin: '0 auto' }}>
            A four-stage framework to transform your outbound and pipeline execution into a predictable engine.
          </p>
        </div>
      </div>

      <div ref={containerRef} className={styles.scrollSection}>
        <div className={styles.layout}>
          
          {/* Left: Interactive Node Map */}
          <div className={styles.nodeMapWrapper}>
            <div className={styles.nodeMap}>
              {/* Connecting Line */}
              <div className={styles.lineBase} />
              <motion.div 
                className={styles.lineFill} 
                style={{ scaleY: lineProgress, transformOrigin: 'top' }} 
              />

              {/* Nodes */}
              <motion.div style={{ opacity: node1Opacity }} className={styles.nodeContainer}>
                <div className={`${styles.node} ${styles.activeNode}`}>1</div>
                <div className={styles.nodeLabel}>Diagnose</div>
              </motion.div>
              
              <motion.div style={{ opacity: node2Opacity }} className={styles.nodeContainer}>
                <div className={`${styles.node} ${styles.activeNode}`}>2</div>
                <div className={styles.nodeLabel}>Install</div>
              </motion.div>

              <motion.div style={{ opacity: node3Opacity }} className={styles.nodeContainer}>
                <div className={`${styles.node} ${styles.activeNode}`}>3</div>
                <div className={styles.nodeLabel}>Embed</div>
              </motion.div>

              <motion.div style={{ opacity: node4Opacity }} className={styles.nodeContainer}>
                <div className={`${styles.node} ${styles.closedWonNode}`}>4</div>
                <div className={styles.nodeLabel}>Measure</div>
              </motion.div>
            </div>
          </div>

          {/* Right: Scrolling Content Cards */}
          <div className={styles.contentList}>
            {stages.map((stage, index) => (
              <motion.div 
                key={stage.id} 
                className={`${styles.contentCard} glow-shadow-hover`}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrapper}>
                    {stage.icon}
                  </div>
                  <span className="micro-text" style={{ color: 'var(--accent-primary)' }}>Phase 0{stage.id}</span>
                </div>
                <h2 className="section-heading">{stage.title}</h2>
                <p className="body-text" style={{ fontSize: '1.25rem' }}>{stage.description}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
