'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './CTASection.module.css';

export default function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.background}>
        <svg width="100%" height="100%" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <path d="M 0 200 C 300 100, 600 300, 1200 200" fill="none" stroke="rgba(0, 0, 0, 0.05)" strokeWidth="2" strokeDasharray="6 6" />
          <motion.path 
            d="M 0 200 C 300 100, 600 300, 1200 200" 
            fill="none" 
            stroke="var(--accent-primary)" 
            strokeWidth="4" 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{ filter: 'drop-shadow(0 0 12px var(--accent-primary))' }}
          />
          <motion.circle 
            cx="1200" cy="200" r="16" 
            fill="var(--accent-primary)" 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 2, type: "spring" }}
            style={{ filter: 'drop-shadow(0 0 20px var(--accent-primary))' }}
          />
        </svg>
      </div>

      <div className={styles.container}>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={`section-heading ${styles.title}`}>
            <span style={{ color: 'var(--text-inverse)' }}>Let's Map Your </span>
            <span style={{ color: 'var(--accent-highlight)' }}>Path to </span>
            <span className="primary-gradient">Closed-Won</span>
          </h2>
          
          <Link href="/contact" className={`${styles.ctaButton} glow-shadow-hover`}>
            Book Strategy Call
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
