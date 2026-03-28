'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Map, Settings2, BookOpen, Users } from 'lucide-react';
import styles from './WhatWeDoSection.module.css';

const coreWork = [
  {
    icon: <Map size={24} />,
    title: "Mapping target accounts and decision makers"
  },
  {
    icon: <Settings2 size={24} />,
    title: "Optimizing CRM workflows and automation"
  },
  {
    icon: <BookOpen size={24} />,
    title: "Building outreach playbooks and cadences"
  },
  {
    icon: <Users size={24} />,
    title: "Coaching reps through live deals"
  }
];

export default function WhatWeDoSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px 0px" });

  return (
    <section className={styles.whatWeDoSection} ref={containerRef}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`section-heading ${styles.title}`}>
            Map2Close is a <span className="primary-gradient">Sales Enablement Partner.</span>
          </h2>
          <p className={`body-text ${styles.subtitle}`}>
            We embed alongside B2B sales teams to design and execute repeatable outbound systems.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {coreWork.map((item, index) => (
            <motion.div 
              key={index}
              className={`glass-panel ${styles.card}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
            >
              <div className={styles.iconWrapper}>
                {item.icon}
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className={styles.footer}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className={`body-text ${styles.goalText}`}>
            The goal is to turn sales into a structured, data-driven system that converts.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
