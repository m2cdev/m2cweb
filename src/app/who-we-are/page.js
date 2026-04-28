"use client";

import React from "react";
import { motion } from "framer-motion";
import PhilosophySpinner from "@/components/sections/PhilosophySpinner";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import FeatureCarousel from "@/components/ui/feature-carousel";




export default function WhoWeAre() {
  return (
    <div className="flex flex-col w-full bg-[#050505] min-h-screen">
      {/* Hero Section */}
      <BackgroundPaths>
        <div className="container-custom pt-40 pb-20">
          <div className="max-w-6xl mb-16">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl lg:text-[5rem] font-black text-white tracking-[-0.04em] mb-12 leading-[0.95]"
            >
              For <span className="text-primary opacity-90">Sales Teams.</span><br />
              By <span className="text-primary opacity-90">Sales Teams.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-8 max-w-5xl"
            >
                <p className="mt-4 max-w-3xl text-lg md:text-xl font-body leading-relaxed text-white/82">
                  Map2Close embeds inside B2B revenue teams to diagnose where deals stall, rebuild the systems around that friction, and stay close enough to the work to prove the fix in live pipeline.
                </p>

              <div className="flex">
                <ShimmerButton
                  shimmerColor="#62D2A2"
                  background="#111"
                  className="h-14 px-10 rounded-2xl"
                  onClick={() => document.getElementById('narrative')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="text-lg font-bold text-white tracking-tight">Find out more</span>
                </ShimmerButton>
              </div>
            </motion.div>
          </div>
        </div>
      </BackgroundPaths>

      {/* Built From the Field Section */}
      <section id="narrative" className="w-full py-40 px-6 md:px-12 lg:px-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_18%,transparent_100%)]" />
          <div className="absolute -left-24 top-20 h-[420px] w-[420px] rounded-full bg-primary/8 blur-[140px]" />
          <div className="absolute right-[-120px] top-1/3 h-[360px] w-[360px] rounded-full bg-primary/6 blur-[150px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute left-0 top-[18%] h-px w-[38vw] min-w-[260px] bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 rotate-[10deg] origin-left" />
          <div className="absolute right-0 bottom-[24%] h-px w-[34vw] min-w-[220px] bg-gradient-to-l from-primary/0 via-primary/15 to-primary/0 -rotate-[12deg] origin-right" />
          <div className="absolute left-[12%] top-[22%] h-2 w-2 rounded-full bg-primary/35 shadow-[0_0_20px_rgba(98,210,162,0.35)]" />
          <div className="absolute right-[16%] bottom-[28%] h-2 w-2 rounded-full bg-primary/30 shadow-[0_0_18px_rgba(98,210,162,0.3)]" />
        </div>

        <div className="max-w-[1400px] mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="space-y-10 text-left">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  Built From the <span className="text-primary">Field</span>
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
              </div>

              <p className="max-w-6xl text-2xl md:text-4xl text-white font-body leading-tight tracking-tight">
                With <span className="text-primary">20+ years</span> of experience across B2B sales, tech, finance, retail, and operator-led growth environments, we kept seeing the same pattern: generic software built for the masses, one-size-fits-all playbooks, and real sales friction left untouched.
              </p>

              <div className="pt-2">
                <div className="mb-6 h-px w-28 bg-gradient-to-r from-primary/70 to-transparent" />
                <p className="text-2xl md:text-4xl font-black tracking-[-0.01em] text-white leading-[1.1]">
                  So We Built the Thing We <span className="text-primary opacity-90">Always Wished Existed.</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Operating Principles */}
      <section className="container-custom py-24 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col mb-16 px-4">
             <h2 className="text-4xl md:text-6xl font-black text-white tracking-[-0.02em]">
                Our Operating <span className="text-primary opacity-90">Principles</span>
             </h2>
          </div>
          <FeatureCarousel />
        </motion.div>
      </section>

      {/* Philosophy Spinner - full-bleed, scroll-linked orbital logo */}
      <PhilosophySpinner />

      {/* Our Partners Section */}
      <div className="container-custom py-32 hide-floating-cta">
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          <h2 className="text-primary font-mono font-medium text-[14px] tracking-[0.25em] uppercase mb-4">
            Our Partners
          </h2>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32">
          {/* Apollo.io Logo */}
          <a
            href="https://www.apollo.io"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center opacity-50 hover:opacity-100 transition-all duration-300 max-w-[200px]"
          >
            <div className="text-white group-hover:text-[#FACC15] transition-colors duration-300 mb-4">
              <svg width="180" height="48" viewBox="0 0 152 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                <path d="M19.5993 0.0862365L19.605 13.2568C19.6058 15.3375 17.4222 16.6715 15.6079 15.6986L2.58376 8.7153C3.57706 7.05795 4.82616 5.57609 6.27427 4.32386L16.489 13.8945C17.0303 14.4015 17.8835 13.8518 17.6605 13.1398L13.6992 0.493553C15.0326 0.17147 16.4233 0 17.8536 0C18.4428 0 19.0248 0.0296814 19.5993 0.0862365Z" fill="currentColor" /><path d="M16.0635 36.1087L16.0578 23.0046C16.057 20.9239 18.2407 19.5898 20.0549 20.5627L33.0838 27.5486C32.0838 29.2016 30.8289 30.6786 29.3751 31.925L19.1738 22.3668C18.6326 21.8598 17.7793 22.4095 18.0023 23.1215L21.9486 35.72C20.6338 36.0329 19.263 36.1989 17.8539 36.1989C17.2497 36.1989 16.6523 36.1683 16.0635 36.1087Z" fill="currentColor" /><path d="M22.0105 16.77L31.4705 6.39392C30.2362 4.92008 28.7742 3.6486 27.1384 2.63702L20.2306 15.8767C19.2709 17.716 20.5871 19.9298 22.6396 19.9288L35.6183 19.923C35.6775 19.3234 35.7082 18.7151 35.7082 18.0996C35.7082 16.6683 35.5436 15.2761 35.2338 13.9406L22.7549 17.9576C22.0526 18.1837 21.5103 17.3187 22.0105 16.77Z" fill="currentColor" /><path d="M0.0842758 16.3383L13.0237 16.3325C15.0764 16.3317 16.3923 18.5454 15.4327 20.3846L8.56047 33.5561C6.93095 32.547 5.47394 31.2801 4.24344 29.8121L13.653 19.4914C14.1531 18.9427 13.6107 18.0777 12.9084 18.3037L0.485078 22.3029C0.168551 20.954 0 19.5467 0 18.0994C0 17.5051 0.0290814 16.9177 0.0842758 16.3383Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M57.0218 3.78205H60.6172L72.556 32.4477H68.5958L64.912 23.327H52.6694L49.1387 32.4477H45.3968L57.0218 3.78205ZM58.6968 8.35018L54.052 19.9528H63.4944L58.6968 8.35018Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M96.0131 22.4209C96.0131 16.3054 100.173 11.8668 105.904 11.8668C111.66 11.8668 115.838 16.3054 115.838 22.4209C115.838 28.5365 111.66 32.9753 105.904 32.9753C100.173 32.9753 96.0131 28.5365 96.0131 22.4209ZM99.7588 22.4209C99.7588 27.0223 102.114 29.8808 105.904 29.8808C109.721 29.8808 112.092 27.0223 112.092 22.4209C112.092 17.8197 109.721 14.9613 105.904 14.9613C102.114 14.9613 99.7588 17.8197 99.7588 22.4209Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M142.109 11.8668C136.353 11.8668 132.175 16.3054 132.175 22.4209C132.175 28.5365 136.353 32.9753 142.109 32.9753C147.84 32.9753 152 28.5365 152 22.4209C152 16.3054 147.4 11.8668 142.109 11.8668ZM142.109 29.8808C138.292 29.8808 135.92 27.0223 135.92 22.4209C135.92 17.8197 138.292 14.9613 142.109 14.9613C145.9 14.9613 148.254 17.8197 148.254 22.4209C148.254 27.0223 145.9 29.8808 142.109 29.8808Z" fill="currentColor" /><path d="M122.206 32.4477H118.59V3.78205H122.206V32.4477Z" fill="currentColor" /><path d="M125.807 32.4477H129.424V3.78205H125.807V32.4477Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M84.6895 32.9751C81.7329 32.9751 79.5182 31.5396 78.241 29.7601V40H74.6249V12.3935H78.241V15.1162C79.521 13.318 81.7375 11.8667 84.6895 11.8667C90.1907 11.8667 93.8867 16.1079 93.8867 22.4208C93.8867 28.7337 90.1907 32.9751 84.6895 32.9751ZM84.3427 15.0488C80.6409 15.0488 78.081 17.8451 78.081 21.8605V22.9813C78.081 26.9965 80.6409 29.7926 84.3427 29.7926C87.9732 29.7926 90.1408 27.0369 90.1408 22.4208C90.1408 17.8047 87.9732 15.0488 84.3427 15.0488Z" fill="currentColor" />
              </svg>
            </div>
            <p className="font-mono font-bold text-[10px] tracking-[0.2em] uppercase text-white/40 group-hover:text-[#FACC15] transition-colors duration-300">Integration Partner</p>
          </a>

          {/* Full Enrich Logo */}
          <a
            href="https://fullenrich.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center opacity-50 hover:opacity-100 transition-all duration-300 max-w-[220px]"
          >
            <div className="text-white group-hover:text-[#A855F7] transition-colors duration-300 mb-4">
              <svg width="200" height="37" viewBox="0 0 1834 335" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                <g fill="currentColor">
                  <path d="M171.634 53.137c-.784-3.784-6.183-3.8-6.989-.02l-4.953 23.2a27.03 27.03 0 0 1-21.265 20.89l-21.168 4.125c-3.831.746-3.859 6.218-.036 7.003l21.443 4.405a27.034 27.034 0 0 1 20.994 20.819l4.9 22.887c.806 3.768 6.185 3.763 6.985-.007l4.849-22.853a27.033 27.033 0 0 1 20.983-20.864l21.535-4.441c3.825-.789 3.79-6.264-.044-7.004l-21.115-4.074a27.031 27.031 0 0 1-21.347-21.054l-4.772-23.012z" />
                  <path fillRule="evenodd" clipRule="evenodd" d="m1.056 184.46-.001-.001a166.867 166.867 0 0 0 7.816 36.397h.002a167.235 167.235 0 0 0 22.603 44.198 168.712 168.712 0 0 0 18.456 21.652c30.309 30.011 72.004 48.544 118.027 48.544 92.646 0 167.75-75.104 167.75-167.75S260.605-.25 167.959-.25.209 74.854.209 167.5c0 5.725.287 11.383.847 16.96zm27.734 16.551a143.497 143.497 0 0 1-3.944-33.511c0-79.04 64.074-143.113 143.113-143.113S311.072 88.46 311.072 167.5c0 11.51-1.358 22.702-3.924 33.426a26.788 26.788 0 0 1-3.271.205c-10.869.032-17.805-4.191-27.541-10.417l-.48-.307c-9.634-6.163-22.025-14.091-40.642-13.979-18.354.11-30.596 7.979-40.088 14.079l-.499.321c-9.618 6.178-16.388 10.303-26.923 10.303-11.368 0-18.289-4.246-27.638-10.329l-.699-.455c-9.356-6.095-21.366-13.919-39.769-13.919-18.489 0-30.766 7.866-40.323 13.99l-.47.302c-9.644 6.176-16.529 10.379-27.35 10.411a27.19 27.19 0 0 1-2.665-.12zm42.985 72.462c25.41 23.077 59.155 37.14 96.184 37.14 36.858 0 70.461-13.933 95.83-36.819l-1.154-.899-.708-.551c-9.945-7.736-16.499-12.434-26.562-12.373-9.946.06-16.46 4.766-26.278 12.451l-.716.56c-9.244 7.246-21.779 17.071-40.667 17.071-19.831 0-32.456-10.006-41.836-17.441l-.381-.303c-9.759-7.732-15.955-12.338-25.889-12.338-10.01 0-16.512 4.678-26.364 12.363l-.698.546-.761.593zm209.129-18.071a143.081 143.081 0 0 0 17.739-29.478c-15.666-1.281-26.573-8.26-35.236-13.803l-.539-.345c-9.72-6.216-16.647-10.415-27.503-10.35-10.741.065-17.629 4.27-27.227 10.436l-.529.34c-9.468 6.086-21.668 13.928-39.905 13.928-19.181 0-31.478-8.001-41.085-14.253l-.187-.121c-9.527-6.199-16.096-10.329-26.834-10.329-10.807 0-17.684 4.179-27.311 10.345l-.53.339c-8.512 5.455-19.196 12.302-34.512 13.745a143.072 143.072 0 0 0 17.487 29.183 366.92 366.92 0 0 0 3.125-2.415l.655-.511c9.336-7.292 21.947-17.141 41.086-17.141 19.066 0 31.414 9.805 40.556 17.063l.03.024.827.656c9.565 7.578 16.12 12.339 26.693 12.339 9.733 0 16.125-4.61 25.974-12.318l.666-.522c9.279-7.271 21.856-17.127 40.87-17.242 19.264-.116 31.988 9.794 41.399 17.124l.664.517c1.258.979 2.463 1.91 3.627 2.789z" />
                  <path d="M549.917 95.477v23.047h-81.898v39.303h72.639v23.046h-72.639v58.646h-25.31V95.477h107.208zm150.885 0v81.693c0 43.006-24.282 64.613-61.939 64.613-37.45 0-61.32-21.607-61.32-63.379V95.477h25.31v81.898c0 26.751 13.787 41.155 36.422 41.155 22.429 0 36.216-13.581 36.216-40.126V95.477h25.311zm36.799 144.042V95.477h25.311v120.995h75.725v23.047H737.601zm129.461 0V95.477h25.311v120.995h75.725v23.047H867.062zM1144.59 95.477v22.635h-81.48v37.451h72.22v22.635h-72.22v38.686h82.51v22.635H1037.8V95.477h106.79zm133.74 99.595V95.477h24.9V239.52h-21.19l-79.43-102.475V239.52h-24.9V95.477h23.46l77.16 99.595zm186.24 44.447h-29.84l-35.39-50.209h-31.69v50.209h-25.31V95.477h64.2c33.13 0 53.5 17.491 53.5 45.682 0 23.87-14.2 38.274-34.37 43.83l38.9 54.53zm-30.25-96.92c0-15.844-11.11-24.075-29.84-24.075h-36.83v48.357h37.04c18.1 0 29.63-9.466 29.63-24.282zm60.22-47.122h25.31V239.52h-25.31V95.477zm191.24 120.995c-15.02 15.639-31.48 25.516-58.44 25.516-41.98 0-73.25-32.718-73.25-74.284 0-41.155 30.66-74.696 74.28-74.696 26.55 0 42.6 9.26 56.38 22.429l-16.25 18.726c-11.53-10.701-23.87-17.903-40.34-17.903-27.57 0-47.53 22.636-47.53 51.032 0 28.397 19.96 51.444 47.53 51.444 17.7 0 29.02-7.202 41.37-18.725l16.25 16.461zm122.7-37.656h-68.73v60.703h-25.31V95.477h25.31v59.88h68.73v-59.88h25.31V239.52h-25.31v-60.703z" />
                </g>
              </svg>
            </div>
            <p className="font-mono font-bold text-[10px] tracking-[0.2em] uppercase text-white/40 group-hover:text-[#A855F7] transition-colors duration-300">Data Partner</p>
          </a>
        </div>
      </div>

      <div className="h-20" />
    </div>
  );
}
