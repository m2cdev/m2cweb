'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Play } from 'lucide-react';
import Link from 'next/link';
import styles from './CaseStudies.module.css';

const projects = [
  {
    id: 'pinecone',
    company: "Pinecone",
    project: "Sales Enablement Hub",
    problem: "Sales content existed but reps could not access it easily during deals.",
    solution: [
      "Filter assets by deal stage",
      "Access competitor battlecards",
      "Build deal kits quickly"
    ],
    impact: [
      "Faster access to selling content",
      "Improved rep consistency",
      "Better deal preparation"
    ]
  },
  {
    id: 'signpost',
    company: "SignPost",
    project: "Signal Intelligence Engine",
    problem: "Outbound lacked timing signals.",
    solution: [
      "Built a signal engine detecting events such as funding, leadership changes, contract renewals",
      "Signals pushed directly into CRM workflows"
    ],
    impact: [
      "Reps reach buyers at the right time",
      "3–5× engagement increase",
      "Faster pipeline generation"
    ]
  },
  {
    id: 'zenatech',
    company: "ZenaTech",
    project: "Sales Vault System",
    problem: "Sales knowledge scattered across documents.",
    solution: [
      "sales playbooks",
      "objection handling",
      "messaging frameworks",
      "internal deal intelligence"
    ],
    impact: [
      "Faster rep ramp time",
      "Consistent messaging",
      "Stronger outbound execution"
    ]
  },
  {
    id: 'qwilr',
    company: "Qwilr",
    project: "Trial-to-Close Engine",
    problem: "Trials converting poorly.",
    solution: [
      "track trial engagement signals",
      "automate follow-ups",
      "guide reps on next steps"
    ],
    impact: [
      "Improved trial conversion",
      "Shorter deal cycles",
      "Stronger pipeline predictability"
    ]
  }
];

export default function CaseStudiesPage() {
  const [activeSection, setActiveSection] = useState(projects[0].id);

  // Intersection Observer to highlight active section in sidebar
  useEffect(() => {
    const observers = [];
    projects.forEach(project => {
      const element = document.getElementById(project.id);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                setActiveSection(project.id);
              }
            });
          },
          { rootMargin: '-20% 0px -60% 0px' }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });
    
    return () => {
      observers.forEach(obs => obs.disconnect());
    };
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        
        {/* Sticky Sidebar Navigation */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <h2 className={styles.sidebarTitle}>Case Studies</h2>
            <nav className={styles.nav}>
              {projects.map((p) => (
                <a 
                  key={p.id} 
                  href={`#${p.id}`}
                  className={`${styles.navLink} ${activeSection === p.id ? styles.activeNavLink : ''}`}
                >
                  {p.company}
                </a>
              ))}
            </nav>
            
            <div className={styles.ctaBox}>
              <p className="micro-text">Ready to build your revenue engine?</p>
              <Link href="https://sales.map2close.com/meetings/kenzo/disco?uuid=f3fa6679-849d-4d9e-85de-c4525efb4f96" target="_blank" rel="noopener noreferrer" className={styles.sidebarCta}>
                Book a Session
              </Link>
            </div>
          </div>
        </aside>

        {/* Scrollable Content */}
        <div className={styles.content}>
          {projects.map((project, index) => (
            <motion.section 
              key={project.id} 
              id={project.id}
              className={styles.projectSection}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.projectHeader}>
                <h2 className={styles.companyName}>{project.company}</h2>
                <h3 className={`primary-gradient ${styles.projectName}`}>{project.project}</h3>
              </div>

              <div className={styles.videoPlaceholder}>
                {/* Loom Video Placeholder */}
                <div className={styles.playButtonWrapper}>
                  <div className={styles.playButton}>
                    <Play fill="currentColor" size={32} />
                  </div>
                </div>
                <p className="micro-text">Loom Video Embed Placeholder</p>
              </div>

              <div className={styles.detailsGrid}>
                <div className={`glass-panel ${styles.detailBox}`}>
                  <h4 className={styles.detailLabel}>The Problem</h4>
                  <p className="body-text">{project.problem}</p>
                </div>

                <div className={`glass-panel ${styles.detailBox}`}>
                  <h4 className={styles.detailLabel}>System Built</h4>
                  <ul className={styles.detailList}>
                    {project.solution.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className={`glass-panel ${styles.detailBox} ${styles.impactBox}`}>
                  <h4 className={styles.detailLabel} style={{color: 'var(--bg-primary)'}}>The Impact</h4>
                  <ul className={styles.detailList} style={{color: 'var(--bg-primary)'}}>
                    {project.impact.map((item, i) => (
                      <li key={i}>
                        <CheckCircle size={18} style={{flexShrink: 0, marginRight: '8px', color: 'rgba(0,0,0,0.5)'}} /> 
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.section>
          ))}
        </div>
        
      </div>
    </main>
  );
}

// CheckCircle imported at the end to keep clean imports 
import { CheckCircle } from 'lucide-react';
