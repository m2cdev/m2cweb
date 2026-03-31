import styles from './Contact.module.css';

export const metadata = {
  title: 'Contact | Map2Close',
  description: 'Map Your Path to Closed-Won. Contact the Map2Close team.',
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className="hero-heading">
            Let's <span className="primary-gradient">Talk Revenue</span>
          </h1>
          <p className="body-text">
            Ready to install a predictable sales engine? Book a strategy call below or reach out directly.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.bookingEmbed}>
            <div className={styles.embedContainer}>
              <iframe
                src="https://sales.map2close.com/meetings/kenzo/disco?uuid=f3fa6679-849d-4d9e-85de-c4525efb4f96&embed=true"
                width="100%"
                height="700"
                frameBorder="0"
                style={{ border: 'none', background: 'transparent' }}
                title="Map2Close Strategy Call Booking"
              ></iframe>
            </div>
          </div>

          <div className={styles.info}>
            <div className={styles.infoCard}>
              <h4 className="micro-text">Email</h4>
              <a href="mailto:hello@map2close.com" className="sub-heading">hello@map2close.com</a>
            </div>
            <div className={styles.infoCard}>
              <h4 className="micro-text">LinkedIn</h4>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="sub-heading">Map2Close HQ</a>
            </div>
            <div className={styles.infoCard}>
              <h4 className="micro-text">Office</h4>
              <p className="sub-heading">Toronto, ON<br/>Canada</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
