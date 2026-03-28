'use client';

import { motion } from 'framer-motion';
import { Search, PenTool, Users, ArrowUpRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import styles from './Pilot.module.css';

export default function PilotPage() {
  const steps = [
    {
      icon: <Search size={32} />,
      title: "1. Audit",
      description: "Review current CRM, messaging, and outbound plays to identify the biggest drop-offs."
    },
    {
      icon: <PenTool size={32} />,
      title: "2. Build",
      description: "Construct one complete, optimized sales play inside the CRM with precise messaging and triggers."
    },
    {
      icon: <Users size={32} />,
      title: "3. Train",
      description: "Coach a select group of reps on executing the play in live environments."
    },
    {
      icon: <ArrowUpRight size={32} />,
      title: "4. Scale",
      description: "Review conversion metrics and decide if a broader rollout across the team is justified."
    }
  ];

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={`hero-heading ${styles.title}`}>
              The Custom <span className="primary-gradient">Pilot Program</span>
            </h1>
            <p className={`body-text ${styles.subtitle}`}>
              Prove the ROI of a sales system in your own data, with your own reps, before committing to a full rollout.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4 Parts Section */}
      <section className={styles.stepsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className="section-heading">How It <span className="primary-gradient">Works</span></h2>
            <p className="body-text">A focused framework to prove impact fast.</p>
          </div>

          <div className={styles.grid}>
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className={`glass-panel ${styles.stepCard}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className={styles.iconBox}>
                  {step.icon}
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className="body-text">{step.description}</p>
                
                {/* Connector line for desktop */}
                {index < steps.length - 1 && (
                  <div className={styles.connector}></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <motion.div 
            className={`glass-panel ${styles.ctaBox}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.ctaTitle}>Determine if a Pilot Makes Sense</h2>
            <p className={`body-text ${styles.ctaSubtitle}`}>
              Let's look at your current sales motion and identify where a targeted pilot could unlock revenue.
            </p>
            <Link href="https://sales.map2close.com/meetings/kenzo/disco?uuid=f3fa6679-849d-4d9e-85de-c4525efb4f96" target="_blank" rel="noopener noreferrer" className={`${styles.primaryCta} glow-shadow-hover`}>
              Book a Working Session <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
        <div className={styles.glowBg}></div>
      </section>
    </main>
  );
}
