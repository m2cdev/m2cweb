'use client';

import { motion } from 'framer-motion';
import styles from './LogoCarousel.module.css';

// Using simple SVG placeholders that resemble the brands
const logos = [
  { name: 'TELUS', id: 1 },
  { name: 'Energizer', id: 2 },
  { name: 'Walmart', id: 3 },
  { name: 'The Keg', id: 4 },
  { name: 'TELUS', id: 5 },
  { name: 'Energizer', id: 6 },
  { name: 'Walmart', id: 7 },
  { name: 'The Keg', id: 8 },
];

export default function LogoCarousel() {
  return (
    <section className={styles.carouselSection}>
      <div className={styles.container}>
        <h3 className={`sub-heading ${styles.label}`}>Trusted by Revenue Teams and High Growth Companies</h3>
        
        <div className={styles.carouselWrapper}>
          <div className={styles.carouselTrack}>
            {/* Double the logos for seamless infinite scroll */}
            {[...logos, ...logos].map((logo, index) => (
              <div key={`${logo.id}-${index}`} className={styles.logoItem}>
                {/* Placeholder for the actual logo image */}
                <div className={styles.logoPlaceholder}>
                  {logo.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
