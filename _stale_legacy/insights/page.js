import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import styles from './Insights.module.css';

export const metadata = {
  title: 'Insights | Map2Close',
  description: 'Articles and research on revenue execution and sales infrastructure.',
};

const articles = [
  {
    id: 1,
    title: 'The End of the Hero Rep: Why Sales Systems Beat Individual Talent',
    category: 'Sales Strategy',
    readTime: '6 min read',
    date: 'Oct 12, 2024'
  },
  {
    id: 2,
    title: 'Designing Your Revenue Motion for Infinite Scale',
    category: 'Revenue Architecture',
    readTime: '8 min read',
    date: 'Sep 28, 2024'
  },
  {
    id: 3,
    title: 'Signal-Driven Prospecting: Beyond the Spray and Pray Approach',
    category: 'Outbound',
    readTime: '5 min read',
    date: 'Sep 15, 2024'
  },
  {
    id: 4,
    title: 'How to Build Battlecards That Your Sales Team Will Actually Use',
    category: 'Enablement',
    readTime: '7 min read',
    date: 'Aug 30, 2024'
  },
  {
    id: 5,
    title: 'Deal Acceleration: Diagnosing Stalled Pipeline Before It\'s Too Late',
    category: 'Pipeline Management',
    readTime: '6 min read',
    date: 'Aug 14, 2024'
  },
  {
    id: 6,
    title: 'The Map2Close Method: A Blueprint for Predictable Revenue',
    category: 'Frameworks',
    readTime: '10 min read',
    date: 'Aug 01, 2024'
  }
];

export default function InsightsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className="hero-heading">
            Execution over <span className="primary-gradient">Theory</span>
          </h1>
          <p className="body-text">
            Tactical insights, frameworks, and architecture teardowns for modern revenue teams.
          </p>
        </div>

        <div className={styles.grid}>
          {articles.map((article) => (
            <Link href={`/insights/${article.id}`} key={article.id} className={styles.cardWrapper}>
              <article className={`${styles.card} glass-panel glow-shadow-hover`}>
                <div className={styles.cardHeader}>
                  <span className={styles.category}>{article.category}</span>
                  <ArrowUpRight size={20} className={styles.arrow} />
                </div>
                
                <h3 className="section-heading">{article.title}</h3>
                
                <div className={styles.cardFooter}>
                  <span className="micro-text">{article.date}</span>
                  <div className={styles.dot} />
                  <span className="micro-text">{article.readTime}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
