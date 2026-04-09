# tap. — The "Shop Pay" for Nigeria 🇳🇬

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Waitlist](https://img.shields.io/badge/Status-Join%20Waitlist-0066FF)](https://waitlist-tap-ng.vercel.app)

[cite_start]**tap.** is a device-bound tokenization engine [cite: 10] [cite_start]and one-tap payment infrastructure built specifically for the Nigerian e-commerce landscape[cite: 4]. [cite_start]We solve the core problem of cart abandonment caused by repetitive data entry, bank OTP latency, and network "wahala"[cite: 9].

## 🚀 The Mission
[cite_start]In Nigerian e-commerce, checkout friction leads to an estimated **38–55% drop-off rate**[cite: 21]. [cite_start]**tap.** eliminates this by securely mapping a user's device to a Paystack authorization token[cite: 12]. [cite_start]After a one-time enrollment, returning customers across the entire network can pay in under 5 seconds—with zero friction[cite: 13, 14, 53].

## 🛠 Tech Stack
[cite_start]Built with a modern, high-performance stack optimized for the edge[cite: 71]:
* [cite_start]**Frontend:** Next.js (App Router) + Tailwind CSS + Framer Motion [cite: 26, 73, 75, 76]
* [cite_start]**Orchestration:** Next.js API Routes + Supabase (PostgreSQL) [cite: 26, 87]
* [cite_start]**Security:** FingerprintJS Pro for deterministic device recognition [cite: 37, 95]
* [cite_start]**Payment Rail:** Paystack API [cite: 26, 101]

## 🏗 System Architecture
[cite_start]**tap.** is designed as a three-layer system to minimize PCI-DSS scope by never storing raw card data[cite: 24, 25, 28]:
1.  [cite_start]**Presentation Layer:** Next.js + Vercel edge-network-hosted UI for sub-200ms load times[cite: 26, 74, 78].
2.  [cite_start]**Orchestration Layer:** Logic handling device recognition, token lookup, and session management[cite: 26].
3.  [cite_start]**Payment Rail Layer:** Direct integration with Paystack's Charge Authorization endpoints[cite: 26, 104].

## 🤝 Open Source & Collaborations
**tap.** is an open-source project. We believe that the identity layer for African commerce should be built in the open. We are looking for contributors to help with:
* [cite_start]**SDK Development:** Packaging our iframe widget for easier merchant integration[cite: 179].
* [cite_start]**Device Recovery Flows:** Enhancing WhatsApp/SMS OTP recovery for new devices[cite: 185, 186].
* [cite_start]**Merchant Analytics:** Building out the ROI dashboard for SMEs[cite: 191, 192].

## 📅 Deployment Roadmap
* [cite_start]**Phase 1:** Hosted Payment Links — Standing alone as a shareable URL[cite: 171, 172].
* [cite_start]**Phase 2:** JavaScript Embed Widget — Embeddable via single script tag[cite: 178, 179].
* [cite_start]**Phase 3:** WhatsApp OTP Device Recovery — Fallback for hardware changes[cite: 185, 186].
* [cite_start]**Phase 4:** Merchant Analytics Dashboard — Conversion and ROI tracking[cite: 191, 192].

## 📩 Join the Waitlist
Are you a merchant, developer, or enthusiast? Help us eliminate checkout friction.
**[Sign up for early access here](https://waitlist-tap-ng.vercel.app)**

---

Built for developers who ship. 🚀