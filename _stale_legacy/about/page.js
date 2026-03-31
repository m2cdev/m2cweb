import styles from './About.module.css';

export const metadata = {
  title: 'About | Map2Close',
  description: 'Execution over theory. We are revenue system architects.',
};


export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        
        <div className={styles.heroSection}>
          <h1 className="hero-heading">
            <span className="primary-gradient">Execution</span> Over Theory
          </h1>
          <div className={styles.missionText}>
            <p className="body-text">
              We aren't a traditional consultancy that drops a 100-page slide deck on your desk and walks away. We are revenue architects.
            </p>
            <p className="body-text">
              Map2Close was founded on a simple premise: enterprise sales motions fail because of chaotic infrastructure, not lack of talent. We design, embed, and prove systems that turn pipeline into predictable closed revenue.
            </p>
          </div>
        </div>

        <div className={styles.philosophySection}>
          <div className={styles.philosophyGrid}>
            <div className={`${styles.philosophyCard} glass-panel`}>
              <h3 className="section-heading">Systems &gt; Art</h3>
              <p className="body-text">Sales is treated as an art form. We treat it as an engineering problem. Predictability requires structure.</p>
            </div>
            <div className={`${styles.philosophyCard} glass-panel`}>
              <h3 className="section-heading">Frictionless Flow</h3>
              <p className="body-text">Every stalled deal is a symptom of system friction. We identify the bottlenecks and remove them.</p>
            </div>
            <div className={`${styles.philosophyCard} glass-panel`}>
              <h3 className="section-heading">Measurable Impact</h3>
              <p className="body-text">If it doesn't move the needle on deal velocity, close rate, or pipeline confidence, it doesn't get built.</p>
            </div>
          </div>
        </div>



      </div>
    </div>
  );
}
