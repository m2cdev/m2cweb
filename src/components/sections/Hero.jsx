'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* Left Side: Content */}
        <div className={styles.contentLeft}>
          <motion.h1 
            className={`hero-heading ${styles.title}`}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Map Your Key Accounts. <span className="primary-gradient">Close More Deals.</span>
          </motion.h1>
          
          <motion.p 
            className={`body-text ${styles.subtitle}`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            We partner with B2B sales teams to design, build, and execute revenue systems that actually convert.
          </motion.p>

          <motion.ul 
            className={styles.valueList}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <li>Improve outbound conversion 3 to 5x</li>
            <li>Reduce deal cycles 25 to 40%</li>
            <li>Turn cold pipeline into revenue within 90 days</li>
          </motion.ul>

          <motion.p 
            className={`micro-text ${styles.resultsText}`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            These results come from system optimization and real-world rep enablement.
          </motion.p>
          
          <motion.div 
            className={styles.ctaGroup}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/contact" className={`${styles.primaryCta} glow-shadow-hover`}>
              Book a Working Session
              <ArrowRight size={18} />
            </Link>
            <Link href="/case-studies" className={styles.secondaryCta}>
              View Case Studies
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Visual System Map */}
        <div className={styles.visualRight}>
          <div className={styles.svgWrapper}>
            <svg width="100%" height="100%" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet">
              {/* Base Structure Paths */}
              <path d="M 50 450 L 200 300 L 350 150 L 500 300" className={styles.pathBase} />
              <path d="M 150 500 L 200 300" className={styles.pathBase} strokeDasharray="5,5" />
              <path d="M 300 450 L 500 300" className={styles.pathBase} strokeDasharray="5,5" />
              
              {/* Lost/Stalled Deals falling out */}
              <motion.path 
                d="M 200 300 L 200 450" 
                className={styles.pathLost}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 2, ease: "linear", repeat: Infinity }}
              />

              {/* Glowing Active Path */}
              <motion.path 
                d="M 50 450 L 200 300 L 350 150 L 500 300" 
                className={styles.pathGlowPrimary}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
              />

              {/* Nodes and Labels */}
              <g className={styles.nodeGroup}>
                <motion.circle cx="50" cy="450" r="8" className={styles.node} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} />
                <text x="50" y="480" className={styles.nodeText}>Leads</text>
              </g>
              <g className={styles.nodeGroup}>
                <motion.circle cx="200" cy="300" r="8" className={styles.node} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }} />
                <text x="180" y="275" className={styles.nodeText}>Discovery</text>
              </g>
              <g className={styles.nodeGroup}>
                <motion.circle cx="350" cy="150" r="8" className={styles.node} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 }} />
                <text x="350" y="125" className={styles.nodeText}>Trial</text>
              </g>
              <g className={styles.nodeGroup}>
                <motion.circle cx="425" cy="225" r="8" className={styles.node} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2 }} />
                <text x="445" y="200" className={styles.nodeText}>Proposal</text>
              </g>
              <g className={styles.nodeGroup}>
                <motion.circle cx="500" cy="300" r="14" className={styles.nodeClosedWon} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.5 }} />
                <motion.text 
                  x="500" y="340" 
                  className={styles.nodeTextHighlight}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Closed-Won
                </motion.text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      <motion.div 
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <div className={styles.mouse}>
          <motion.div 
            className={styles.wheel}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </div>
        <ChevronDown size={20} className={styles.chevron} />
      </motion.div>
    </section>
  );
}
