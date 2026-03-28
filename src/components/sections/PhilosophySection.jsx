import styles from './PhilosophySection.module.css';

export default function PhilosophySection() {
  return (
    <section className={styles.philosophySection}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={`section-heading ${styles.title}`}>
            Execution Beats Theory
          </h2>
          <p className="body-text" style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto' }}>
            Most consulting firms deliver frameworks. Map2Close ensures those frameworks show up in live deals.
          </p>
        </div>
      </div>
    </section>
  );
}
