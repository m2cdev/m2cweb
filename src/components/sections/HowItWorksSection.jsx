'use client';

import { useRef } from 'react';
import { motion, useScroll, useInView } from 'framer-motion';
import { Target, Zap, Activity, Award } from 'lucide-react';
import styles from './HowItWorksSection.module.css';

const steps = [
  {
    number: "1",
    title: "Map",
    description: "Identify key accounts, find buyers, and enrich verified data.",
    icon: <Target size={28} />
  },
  {
    number: "2",
    title: "Execute",
    description: "Launch outreach campaigns and coach reps through conversations.",
    icon: <Zap size={28} />
  },
  {
    number: "3",
    title: "Optimize",
    description: "Analyze engagement and improve messaging and workflows.",
    icon: <Activity size={28} />
  },
  {
    number: "4",
    title: "Close",
    description: "Strengthen proposals, handle objections, and win deals faster.",
    icon: <Award size={28} />
  }
];

export default function HowItWorksSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px 0px" });

  return (
    <section className={styles.howItWorksSection} ref={containerRef}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`section-heading ${styles.title}`}>
            How Our <span className="primary-gradient">Process</span> Works
          </h2>
          <p className={`body-text ${styles.subtitle}`}>
            A simple framework to turn target accounts into closed deals.
          </p>
        </motion.div>

        <div className={styles.stepsContainer}>
          {/* Connecting Line */}
          <div className={styles.connectingLine}>
            <motion.div 
              className={styles.lineProgress}
              initial={{ height: "0%" }}
              animate={isInView ? { height: "100%" } : { height: "0%" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
            />
          </div>

          <div className={styles.stepsList}>
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className={styles.stepRow}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.2) }}
              >
                <div className={styles.stepNumberWrapper}>
                  <div className={styles.stepNumber}>{step.number}</div>
                </div>
                
                <div className={`glass-panel ${styles.stepCard}`}>
                  <div className={styles.stepIcon}>
                    {step.icon}
                  </div>
                  <div className={styles.stepContent}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={`body-text ${styles.stepDescription}`}>{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
