import React from "react";

export const metadata = {
  title: "Privacy Policy | Map2Close",
  description: "How Map2Close Inc. collects, uses, and protects data in Mappy.",
  alternates: { canonical: "https://map2close.com/privacy" },
};

const LAST_UPDATED = "October 5, 2026";

function Section({ title, children }) {
  return (
    <section className="mt-14">
      <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white mb-5">
        {title}
      </h2>
      <div className="space-y-4 text-base md:text-lg leading-relaxed text-white/80">
        {children}
      </div>
    </section>
  );
}

function List({ items }) {
  return (
    <ul className="space-y-3 pl-5 list-disc marker:text-[#62D2A2]">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

const linkClass = "text-[#62D2A2] underline underline-offset-4 hover:text-white transition-colors";

export default function PrivacyPage() {
  return (
    <div className="bg-black text-white min-h-screen selection:bg-primary/30">
      <article className="max-w-3xl mx-auto px-6 pt-40 pb-32">
        <div className="mb-7 flex items-center gap-3">
          <div className="h-px w-6 bg-[#62D2A2]" />
          <span className="text-[14px] font-bold uppercase tracking-[0.18em] text-[#62D2A2]">
            Legal
          </span>
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-black tracking-tighter leading-tight">
          Privacy Policy
        </h1>
        <p className="mt-6 text-sm uppercase tracking-[0.14em] text-white/50">
          Last updated: {LAST_UPDATED}
        </p>
        <p className="mt-8 text-base md:text-lg leading-relaxed text-white/80">
          This policy explains what data we collect when you use Mappy, our sales
          coaching and calling product, what we do with it, and the choices you have.
        </p>

        <Section title="Who we are">
          <p>
            Mappy is built and operated by Map2Close Inc., based in Toronto, Canada.
            If you have any question about this policy or your data, email us at{" "}
            <a href="mailto:dev@map2close.com" className={linkClass}>dev@map2close.com</a>.
          </p>
        </Section>

        <Section title="Data we collect">
          <List
            items={[
              <><strong className="text-white">Account information.</strong> Your name and email address. If you sign in with Google, we also receive your Google profile (name, email and profile picture).</>,
              <><strong className="text-white">CRM and lead data.</strong> Contacts, companies, deals and related records that you or your team upload or sync from connected tools such as HubSpot, Apollo and Google Calendar.</>,
              <><strong className="text-white">Calls.</strong> Call recordings, transcripts and call metadata such as phone numbers, participants, time and duration.</>,
              <><strong className="text-white">Usage logs.</strong> Technical information about how you use Mappy, such as pages and features used, device and browser details, and error logs.</>,
            ]}
          />
        </Section>

        <Section title="How we use your data">
          <p>
            We use this data to run Mappy for you: to authenticate you, place and record
            calls, produce transcripts and live coaching, show your pipeline and meetings,
            and to keep the product secure and working. We do not sell your data.
          </p>
        </Section>

        <Section title="Google user data">
          <List
            items={[
              "We use Google sign-in only to receive your name, email address and profile picture so we can authenticate you.",
              "If you connect Google Calendar, we use your calendar data only to show and book meetings inside Mappy.",
              "We do not sell Google user data, and we do not use it for advertising.",
            ]}
          />
          <p>
            Mappy&apos;s use and transfer of information received from Google APIs adheres
            to the{" "}
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Google API Services User Data Policy
            </a>
            , including the Limited Use requirements.
          </p>
        </Section>

        <Section title="Who processes data for us">
          <p>We rely on a small number of service providers to run Mappy:</p>
          <List
            items={[
              <><strong className="text-white">Supabase</strong>, for our database and authentication.</>,
              <><strong className="text-white">Twilio</strong>, for placing and recording calls.</>,
              <><strong className="text-white">Vercel</strong>, for hosting.</>,
              <><strong className="text-white">AI model providers</strong>, for transcription and coaching.</>,
            ]}
          />
          <p>
            These providers process data only on our behalf and only to provide their
            service to us.
          </p>
        </Section>

        <Section title="Retention and deletion">
          <p>
            We keep your data for as long as your account is active, or as long as we
            need it to provide Mappy to you. You can ask us to delete your account or any
            of your data at any time by emailing{" "}
            <a href="mailto:dev@map2close.com" className={linkClass}>dev@map2close.com</a>.
            We will confirm and act on your request within a reasonable time, unless the
            law requires us to keep certain records.
          </p>
        </Section>

        <Section title="Security">
          <p>
            We protect your data with encryption in transit, access controls that limit
            who can see it, and trusted infrastructure providers. No system is perfectly
            secure, but we work to keep your data safe and will notify you if a breach
            affects you.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            We may update this policy from time to time. When we do, we will change the
            &ldquo;Last updated&rdquo; date at the top of this page, and for significant
            changes we will let you know by email or inside Mappy.
          </p>
        </Section>
      </article>
    </div>
  );
}
