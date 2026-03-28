'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileStack, Briefcase, FileSearch, ShieldAlert } from 'lucide-react';
import styles from './Solutions.module.css';

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState('Call Prep Builder');

  const hubItems = [
    {
      id: 1,
      title: 'Call Prep Builder',
      icon: <FileStack size={20} />,
      description: 'Dynamically generated prep sheets based on CRM intent data.',
      preview: 'Preview: Auto-populates recent prospect activities, known tech stack, and suggested opening questions.'
    },
    {
      id: 2,
      title: 'Deal Kit',
      icon: <Briefcase size={20} />,
      description: 'Everything you need to navigate a complex enterprise cycle.',
      preview: 'Preview: Business case templates, mutual action plans, and ROI calculators updated in real-time.'
    },
    {
      id: 3,
      title: 'Competitive Intel',
      icon: <FileSearch size={20} />,
      description: 'Battlecards that update as competitors release new features.',
      preview: 'Preview: Trap questions, competitor short-falls, and direct feature comparisons.'
    },
    {
      id: 4,
      title: 'Common Objections',
      icon: <ShieldAlert size={20} />,
      description: 'Structured talk tracks for when deals hit friction.',
      preview: 'Preview: "Too expensive", "We are building internally", and "Not a priority right now".'
    }
  ];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className="hero-heading">
            The Enablement <span className="primary-gradient">Hub</span>
          </h1>
          <p className="body-text">
            Interact with a mock version of the centralized enablement engine we embed within your sales organization.
          </p>
        </div>

        <div className={styles.uiMock}>
          <div className={styles.uiBrowserHeader}>
            <div className={styles.uiDot} />
            <div className={styles.uiDot} />
            <div className={styles.uiDot} />
            <div className={styles.uiUrlBar}>app.company.revenue/hub</div>
          </div>
          
          <div className={styles.uiBody}>
            <div className={styles.sidebar}>
              <h4 className="micro-text" style={{ marginBottom: '1.5rem', opacity: 0.5 }}>Modules</h4>
              <nav className={styles.navMenu}>
                {hubItems.map(item => (
                  <button 
                    key={item.id}
                    className={`${styles.navItem} ${activeTab === item.title ? styles.activeNavItem : ''}`}
                    onClick={() => setActiveTab(item.title)}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </button>
                ))}
              </nav>
            </div>
            
            <div className={styles.mainContent}>
              <AnimatePresence mode="popLayout">
                {hubItems.filter(i => i.title === activeTab).map(item => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={styles.contentPanel}
                  >
                    <div className={styles.panelHeader}>
                      <h2 className="section-heading">{item.title}</h2>
                      <p className="body-text">{item.description}</p>
                    </div>

                    {/* Highly visual interactive preview block */}
                    <div className={styles.previewBox}>
                      <div className={styles.previewTag}>System Preview</div>
                      <div className={styles.previewContent}>
                        {item.preview}
                      </div>
                      
                      {/* Fake skeleton loading UI to look like an app */}
                      <div className={styles.skeletonContainer}>
                        <div className={styles.skeletonTitle} />
                        <div className={styles.skeletonLine} />
                        <div className={styles.skeletonLine} style={{ width: '80%' }} />
                        <div className={styles.skeletonBlock} />
                      </div>
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
