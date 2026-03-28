'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Filter, Network, Flag } from 'lucide-react';
import styles from './WhereWeHelpSection.module.css';

const funnelStages = [
  {
    title: "Top of Funnel",
    icon: <Filter size={24} />,
    items: [
      "Account mapping",
      "Buyer enrichment",
      "Outbound campaigns"
    ]
  },
  {
    title: "Mid Funnel",
    icon: <Network size={24} />,
    items: [
      "Follow-up systems",
      "Objection handling frameworks",
      "Deal strategy"
    ]
  },
  {
    title: "Finish Line",
    icon: <Flag size={24} />,
    items: [
      "Proposal coaching",
      "Negotiation support",
      "Closing execution"
    ]
  }
];

export default function WhereWeHelpSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px 0px" });

  return (
    <section className={styles.whereWeHelpSection} ref={containerRef}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`section-heading ${styles.title}`}>
            Full-Funnel <span className="primary-gradient">Execution</span>
          </h2>
        </motion.div>

        <div className={styles.grid}>
          {funnelStages.map((stage, index) => (
            <motion.div 
              key={index}
              className={`glass-panel ${styles.stageCard}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
            >
              <div className={styles.stageHeader}>
                <div className={styles.iconWrapper}>
                  {stage.icon}
                </div>
                <h3 className={styles.stageTitle}>{stage.title}</h3>
              </div>
              <ul className={styles.itemList}>
                {stage.items.map((item, i) => (
                  <li key={i} className={styles.item}>
                    <div className={styles.bullet}></div>
                    <span className="body-text">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className={styles.footer}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className={`body-text ${styles.engineText}`}>
            Map2Close helps build a complete revenue engine, not just lead generation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
