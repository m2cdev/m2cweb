'use client';

import { motion } from 'framer-motion';
import { Target, Zap, Activity, Users, Settings, BookOpen } from 'lucide-react';
import styles from './WhoWeAre.module.css';
import CTASection from '@/components/sections/CTASection';
import FinalCTASection from '@/components/sections/FinalCTASection';

export default function WhoWeAre() {
  return (
    <main className={styles.main}>
      {/* 1. Overview */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={`hero-heading ${styles.title}`}>
              We build systems inside your <span className="primary-gradient">sales motion.</span>
            </h1>
            <p className={`body-text ${styles.subtitle}`}>
              Map2Close is a sales enablement partner for B2B teams. We do not just provide strategy.<br/>
              We embed inside your sales motion to build systems and help reps execute them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. What Makes Us Different */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className="section-heading">What Makes Us <span className="primary-gradient">Different</span></h2>
          </div>
          <div className={styles.splitGrid}>
            <motion.div 
              className={`glass-panel ${styles.card} ${styles.cardNegative}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h3 className={styles.cardTitle}>Most consultants</h3>
              <ul className={styles.list}>
                <li>Deliver slide decks</li>
                <li>Recommend tools</li>
                <li>Leave execution to the client</li>
              </ul>
            </motion.div>

            <motion.div 
              className={`glass-panel ${styles.card} ${styles.cardPositive}`}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className={styles.cardTitle}>Map2Close</h3>
              <ul className={styles.list}>
                <li>Builds systems inside your CRM</li>
                <li>Works with reps in live deals</li>
                <li>Optimizes messaging and workflows</li>
                <li>Coaches execution in real time</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Our Philosophy */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <div className={styles.philosophyContainer}>
            <div className={styles.philosophyText}>
              <h2 className="section-heading">Our <span className="primary-gradient">Philosophy</span></h2>
              <p className={`body-text ${styles.philosophyLead}`}>
                Sales improves when three things work together:
              </p>
              <ul className={styles.bigList}>
                <li><span className={styles.number}>1</span> Systems</li>
                <li><span className={styles.number}>2</span> Process</li>
                <li><span className={styles.number}>3</span> Execution</li>
              </ul>
              <p className={`body-text ${styles.philosophyConclusion}`}>
                Most teams focus on just one.<br/>
                We focus on <strong>all three</strong> at the same time.
              </p>
            </div>
            {/* Minimalistic Interactive Element */}
            <div className={styles.philosophyVisual}>
              <div className={styles.vennContainer}>
                <motion.div className={styles.vennCircle1} animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}></motion.div>
                <motion.div className={styles.vennCircle2} animate={{ scale: [1, 1.05, 1], rotate: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}></motion.div>
                <motion.div className={styles.vennCircle3} animate={{ scale: [1, 1.05, 1], y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}></motion.div>
                <div className={styles.vennCenter}><Target size={30} /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. What We Actually Do */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className="section-heading">What We <span className="primary-gradient">Actually Do</span></h2>
            <p className="body-text">Typical engagement includes:</p>
          </div>
          <div className={styles.grid4}>
            {[
              { title: "CRM and systems audit", icon: <Settings size={28} /> },
              { title: "Sales process optimization", icon: <Activity size={28} /> },
              { title: "Custom playbooks", icon: <BookOpen size={28} /> },
              { title: "Rep coaching and deal support", icon: <Users size={28} /> }
            ].map((item, i) => (
              <motion.div 
                key={i}
                className={`glass-panel ${styles.serviceCard}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={styles.iconWrapper}>{item.icon}</div>
                <h3 className={styles.serviceTitle}>{item.title}</h3>
              </motion.div>
            ))}
          </div>
          <motion.div 
            className={styles.conclusionBox}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="body-text">This structure turns scattered sales activity into a repeatable process.</p>
          </motion.div>
        </div>
      </section>

      {/* 5. How We Compare (Dropdown Target) */}
      <section id="how-we-compare" className={styles.sectionAlt}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className="section-heading">How We <span className="primary-gradient">Compare</span></h2>
          </div>
          
          <div className={styles.compareGrid}>
            <div className={`glass-panel ${styles.compareCard}`}>
              <h3 className={styles.compareTitle}>Traditional Sales Consulting</h3>
              <ul className={styles.compareList}>
                <li><span className={styles.dash}>-</span>Strategy advice</li>
                <li><span className={styles.dash}>-</span>Slide decks</li>
                <li><span className={styles.dash}>-</span>Limited execution</li>
              </ul>
            </div>
            
            <div className={`glass-panel ${styles.compareCard}`}>
              <h3 className={styles.compareTitle}>Lead Generation Agencies</h3>
              <ul className={styles.compareList}>
                <li><span className={styles.dash}>-</span>Focus on meetings</li>
                <li><span className={styles.dash}>-</span>No system improvements</li>
                <li><span className={styles.dash}>-</span>Limited deal impact</li>
              </ul>
            </div>
            
            <div className={`glass-panel ${styles.compareCard} ${styles.compareCardPrimary}`}>
              <h3 className={styles.compareTitleHighlight}>Map2Close</h3>
              <ul className={styles.compareListHighlight}>
                <li><Zap size={16} />Build sales systems</li>
                <li><Zap size={16} />Improve execution</li>
                <li><Zap size={16} />Work with reps in real deals</li>
                <li><Zap size={16} />Optimize full funnel performance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FinalCTASection />
    </main>
  );
}
