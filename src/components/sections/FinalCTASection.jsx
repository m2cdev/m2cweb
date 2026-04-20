'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import styles from './FinalCTASection.module.css';

const sessionTakeaways = [
  "Identify your biggest sales bottleneck",
  "Workshop potential solutions",
  "Determine if a pilot makes sense"
];

export default function FinalCTASection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px 0px" });

  return (
    <section className={`${styles.ctaSection} hide-floating-cta`} ref={containerRef}>
      <div className={styles.container}>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className={`section-heading ${styles.title}`}>
            Want to see what is <span className="primary-gradient">slowing your sales motion down?</span>
          </h2>
          
          <p className={`body-text ${styles.subtitle}`}>
            Book a working session. In this session we will:
          </p>

          <ul className={styles.takeawaysList}>
            {sessionTakeaways.map((item, index) => (
              <motion.li 
                key={index} 
                className={styles.takeawayItem}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
              >
                <CheckCircle size={20} className={styles.checkIcon} />
                <span className="body-text">{item}</span>
              </motion.li>
            ))}
          </ul>
          
          <motion.div 
            className={styles.buttonWrapper}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="https://sales.map2close.com/meetings/kenzo/disco?uuid=f3fa6679-849d-4d9e-85de-c4525efb4f96" target="_blank" rel="noopener noreferrer" className={`${styles.primaryCta} glow-shadow-hover`}>
              Book Working Session <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative background elements */}
      <div className={styles.glowBg}></div>
    </section>
  );
}
