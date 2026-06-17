"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState("submitting");
    setErrorMsg("");

    const formData = new FormData(e.target);
    const data = {
      fields: [
        { name: "firstname", value: formData.get("firstName") },
        { name: "lastname", value: formData.get("lastName") },
        { name: "email", value: formData.get("email") },
        { name: "phone", value: formData.get("phone") },
        { name: "company", value: formData.get("company") },
        { name: "jobtitle", value: formData.get("jobTitle") },
        { name: "company_size_range", value: formData.get("companySize") },
        { name: "sales_challenge", value: formData.get("salesChallenge") },
        { name: "message", value: formData.get("message") },
      ].filter((f) => f.value),
      context: {
        pageUri: window.location.href,
        pageName: "Contact",
      },
    };

    try {
      const response = await fetch(
        "https://api.hsforms.com/submissions/v3/integration/submit/241945630/228c833e-9348-4473-9c53-2e4aa96ed032",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setFormState("success");
      } else {
        const err = await response.json();
        const msg = err?.errors?.map((e) => e.message).join(", ") || err?.message || JSON.stringify(err);
        console.error("HubSpot error:", err);
        setErrorMsg(msg);
        setFormState("error");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setErrorMsg("Network error, please try again.");
      setFormState("error");
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-black pb-6">
      <FluidParticlesBackground
        particleCount={1500}
        noiseIntensity={0.001}
        particleSize={{ min: 0.5, max: 1.5 }}
        className="fixed inset-0 z-0 opacity-100 pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-8 min-h-screen flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 pt-20 lg:items-center">

          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-normal mb-6 leading-[1.05]">
              Eliminate the Friction.<br />Start <span className="text-primary">Closing.</span>
            </h1>
            <p className="text-base text-white/80 font-body leading-relaxed tracking-wide">
              Tell us a bit about where you&apos;re seeing friction. We only partner with teams where we know we can move the needle, let&apos;s see if your motion is the right match for our systems.
            </p>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-[100px] opacity-50 pointer-events-none" />
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#62D2A2]/20 rounded-full blur-[100px] opacity-50 pointer-events-none" />

              {formState === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-16"
                >
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30 mb-6">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Ball&apos;s in Our Court</h3>
                  <p className="text-white/70 font-body mb-8">
                    We&apos;ll be in touch soon to get you where you need to be.
                  </p>
                  <button
                    onClick={() => window.location.href = '/case-studies'}
                    className="text-white font-medium hover:text-primary transition-colors flex items-center gap-2"
                  >
                    See Our Work <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-4">

                  {formState === "error" && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-white/70">First Name *</label>
                      <input name="firstName" type="text" required placeholder="John"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-white/70">Last Name *</label>
                      <input name="lastName" type="text" required placeholder="Doe"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-white/70">Email *</label>
                      <input name="email" type="email" required placeholder="john@company.com"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-white/70">Phone *</label>
                      <input name="phone" type="tel" required placeholder="+1 (555) 000-0000"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-white/70">Company Name *</label>
                      <input name="company" type="text" required placeholder="Acme Inc."
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-white/70">Job Title *</label>
                      <input name="jobTitle" type="text" required placeholder="VP of Sales"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-white/70">Company Size (Range) *</label>
                    <select name="companySize" required defaultValue=""
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all appearance-none">
                      <option value="" disabled className="bg-black">Select range</option>
                      <option value="1-10" className="bg-black">1-10</option>
                      <option value="11-50" className="bg-black">11-50</option>
                      <option value="51-200" className="bg-black">51-200</option>
                      <option value="201-500" className="bg-black">201-500</option>
                      <option value="501-1000" className="bg-black">501-1,000</option>
                      <option value="1000+" className="bg-black">1,000+</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-white/70">What&apos;s Your Biggest Sales Challenge? *</label>
                    <p className="text-[10px] text-white/40">If you had to fix one thing in your sales motion tomorrow, what would it be?</p>
                    <select name="salesChallenge" required defaultValue=""
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all appearance-none">
                      <option value="" disabled className="bg-black">Select your biggest challenge</option>
                      <option value="Not enough pipeline coming in, or working with weak buyer intel" className="bg-black">Not enough pipeline coming in, or working with weak buyer intel</option>
                      <option value="Our reps are inconsistent, no playbook, no real process" className="bg-black">Our reps are inconsistent, no playbook, no real process</option>
                      <option value="Our CRM & tools are a mess & systems aren't talking to each other the way they should" className="bg-black">Our CRM &amp; tools are a mess &amp; systems aren&apos;t talking to each other the way they should</option>
                      <option value="We're losing deals we should be closing" className="bg-black">We&apos;re losing deals we should be closing</option>
                      <option value="Other" className="bg-black">Other</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-white/70">Anything Else We Should Know?</label>
                    <textarea name="message" rows={2} placeholder="Any additional context..."
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none" />
                  </div>

                  <ShimmerButton type="submit" disabled={formState === "submitting"} className="w-full h-11 rounded-xl mt-1" shimmerColor="#62D2A2" background="#111">
                    <span className="text-sm font-bold text-white uppercase tracking-widest">
                      {formState === "submitting" ? "Sending..." : "Let's Close"}
                    </span>
                  </ShimmerButton>

                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
