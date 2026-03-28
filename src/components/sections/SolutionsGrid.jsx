'use client';

import { motion } from 'framer-motion';
import { Database, Network, Zap, Radar } from 'lucide-react';
import styles from './SolutionsGrid.module.css';

const solutions = [
  {
    id: 1,
    title: 'Sales Enablement Systems',
    description: 'Build enablement hubs reps actually use.',
    example: 'centralized battlecards, deal narratives, competitive intel',
    icon: <Database size={32} />
  },
  {
    id: 2,
    title: 'Revenue Motion Design',
    description: 'Install structured outbound and pipeline frameworks.',
    example: 'outbound framework across multiple business units',
    icon: <Network size={32} />
  },
  {
    id: 3,
    title: 'Deal Acceleration',
    description: 'Fix mid-funnel deal stalls.',
    example: 'Give-Get trial engine increasing meeting attendance',
    icon: <Zap size={32} />
  },
  {
    id: 4,
    title: 'Signal-Driven Prospecting',
    description: 'Detect buying signals automatically.',
    example: 'review-driven prospect intelligence system',
    icon: <Radar size={32} />
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export default function SolutionsGrid() {
  return (
    <section className={styles.solutionsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className="section-heading">
            <span className="primary-gradient">Solutions</span>
          </h2>
        </div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {solutions.map((solution) => (
            <motion.div 
              key={solution.id} 
              className={`${styles.card} glass-panel glow-shadow-hover`}
              variants={cardVariants}
            >
              <div className={styles.iconWrapper}>
                {solution.icon}
              </div>
              <h3 className="section-heading" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                {solution.title}
              </h3>
              <p className="body-text" style={{ marginBottom: '2rem' }}>
                {solution.description}
              </p>
              
              <div className={styles.exampleBox}>
                <span className={styles.exampleLabel}>Example</span>
                <p className={styles.exampleText}>{solution.example}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
