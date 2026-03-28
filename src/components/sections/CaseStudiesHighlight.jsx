'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, FileText, Zap, ShieldCheck, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import styles from './CaseStudiesHighlight.module.css';

const caseStudies = [
  {
    company: "Pinecone",
    project: "Sales Enablement Hub",
    icon: <img src="https://logo.clearbit.com/pinecone.io" alt="Pinecone Logo" style={{ width: '28px', height: '28px', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; }} />,
    color: "var(--accent-primary)"
  },
  {
    company: "SignPost",
    project: "Signal Intelligence Engine",
    icon: <img src="https://logo.clearbit.com/signpost.com" alt="SignPost Logo" style={{ width: '28px', height: '28px', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; }} />,
    color: "var(--accent-secondary)"
  },
  {
    company: "ZenaTech",
    project: "Sales Vault System",
    icon: <img src="https://logo.clearbit.com/zenatech.com" alt="ZenaTech Logo" style={{ width: '28px', height: '28px', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; }} />,
    color: "var(--accent-highlight)"
  },
  {
    company: "Qwilr",
    project: "Trial-to-Close Engine",
    icon: <img src="https://logo.clearbit.com/qwilr.com" alt="Qwilr Logo" style={{ width: '28px', height: '28px', objectFit: 'contain', filter: 'invert(1)' }} onError={(e) => { e.target.style.display = 'none'; }} />,
    color: "var(--text-primary)"
  }
];

export default function CaseStudiesHighlight() {
  return (
    <section className={styles.caseSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={`section-heading ${styles.title}`}>
            Featured <span className="primary-gradient">Case Studies</span>
          </h2>
          <p className={`body-text ${styles.subtitle}`}>
            See how we install revenue systems that scale.
          </p>
        </div>

        <div className={styles.grid}>
          {caseStudies.map((cs, index) => (
            <motion.div 
              key={index}
              className={`glass-panel ${styles.card}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.cardIcon} style={{ color: cs.color, background: `color-mix(in srgb, ${cs.color} 10%, transparent)` }}>
                {cs.icon}
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.companyName}>{cs.company}</h3>
                <p className={`body-text ${styles.projectName}`}>{cs.project}</p>
              </div>
              <Link href={`/case-studies#${cs.company.toLowerCase()}`} className={styles.cardLink}>
                <span className="sr-only">View Case Study</span>
                <ChevronRight size={20} />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className={styles.ctaWrapper}>
          <Link href="/case-studies" className={`${styles.readMoreCta} glow-shadow-hover`}>
            View Case Studies <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
