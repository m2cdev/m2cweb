import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" style={{ width: '24px', height: '24px' }}>
                <circle cx="50" cy="50" r="35" strokeWidth="6" strokeDasharray="50 23.33" strokeDashoffset="42" strokeLinecap="round" transform="rotate(30 50 50)" />
                <circle cx="50" cy="15" r="9" fill="currentColor" stroke="none" />
                <circle cx="19.7" cy="67.5" r="9" fill="currentColor" stroke="none" />
                <circle cx="80.3" cy="67.5" r="9" fill="currentColor" stroke="none" />
              </svg>
              Map2Close
            </Link>
            <p className="body-text">
              We design and embed revenue systems that turn pipeline into predictable closed deals.
            </p>
          </div>
          
          <div className={styles.links}>
            <div className={styles.column}>
              <h4 className="micro-text">Platform</h4>
              <Link href="/who-we-are">Who We Are</Link>
              <Link href="/case-studies">Case Studies</Link>
              <Link href="/pilot">The Pilot</Link>
            </div>
            <div className={styles.column}>
              <h4 className="micro-text">Connect</h4>
              <Link href="https://sales.map2close.com/meetings/kenzo/disco?uuid=f3fa6679-849d-4d9e-85de-c4525efb4f96" target="_blank" rel="noopener noreferrer">
                Book a Working Session
              </Link>
              <a href="mailto:hello@map2close.com">Email Us</a>
            </div>
            <div className={styles.column}>
              <h4 className="micro-text">Legal</h4>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p className="micro-text">© {new Date().getFullYear()} Map2Close. All rights reserved.</p>
          <div className={styles.socials}>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:hello@map2close.com">Email Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
