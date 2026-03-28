'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import styles from './Navbar.module.css';

const navItems = [
  { name: 'Who We Are', href: '/who-we-are', dropdown: [{ name: 'How We Compare', href: '/who-we-are#how-we-compare' }] },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'The Pilot', href: '/pilot' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.nav 
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className={styles.container}>
        <div className={styles.left}>
          <Link href="/" className={styles.logo}>
            <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className={styles.logoIcon}>
              <circle cx="50" cy="50" r="35" strokeWidth="6" strokeDasharray="50 23.33" strokeDashoffset="42" strokeLinecap="round" transform="rotate(30 50 50)" />
              <circle cx="50" cy="15" r="9" fill="currentColor" stroke="none" />
              <circle cx="19.7" cy="67.5" r="9" fill="currentColor" stroke="none" />
              <circle cx="80.3" cy="67.5" r="9" fill="currentColor" stroke="none" />
            </svg>
            <span className={styles.logoText}>map2close</span>
          </Link>
        </div>
        
        <div className={styles.center}>
          {navItems.map((item) => (
            <div key={item.name} className={styles.navItemContainer}>
              <Link href={item.href} className={styles.navLink}>
                {item.name}
              </Link>
              {item.dropdown && (
                <div className={styles.dropdown}>
                  {item.dropdown.map((dropItem) => (
                    <Link key={dropItem.name} href={dropItem.href} className={styles.dropdownLink}>
                      {dropItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className={styles.right}>
          <Link href="https://sales.map2close.com/meetings/kenzo/disco?uuid=f3fa6679-849d-4d9e-85de-c4525efb4f96" target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
            Book a Working Session
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
