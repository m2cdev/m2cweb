'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import styles from './CustomPilotPreview.module.css';

const pilotFeatures = [
  "One clear outcome",
  "Short timeline",
  "Measurable results",
  "No long-term commitment"
];

export default function CustomPilotPreview() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px 0px" });

  return (
    <section className={styles.pilotSection} ref={containerRef}>
      <div className={styles.container}>
        <motion.div 
          className={`glass-panel ${styles.contentBox}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.header}>
            <h2 className={`section-heading ${styles.title}`}>
              Before committing long-term, companies start with a <span className="primary-gradient">Custom Pilot Program.</span>
            </h2>
            <p className={`body-text ${styles.subtitle}`}>
              A focused engagement designed to prove impact.
            </p>
          </div>

          <div className={styles.features}>
            <p className={styles.meaningText}>What this means:</p>
            <ul className={styles.featureList}>
              {pilotFeatures.map((feature, i) => (
                <motion.li 
                  key={i} 
                  className={styles.featureItem}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) }}
                >
                  <CheckCircle2 size={20} className={styles.checkIcon} />
                  <span className="body-text">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div 
            className={styles.ctaWrapper}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link href="/pilot" className={`${styles.primaryCta} glow-shadow-hover`}>
              See The Pilot <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
