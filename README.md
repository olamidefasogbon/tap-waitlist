# tap. — One-tap payment infrastructure for Nigerian commerce.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Waitlist](https://img.shields.io/badge/Status-Join%20Waitlist-0066FF)](https://waitlist-tap-ng.vercel.app)

**tap.** is a device-bound tokenization engine and one-tap payment infrastructure built specifically for the Nigerian e-commerce landscape. We solve the core problem of cart abandonment caused by repetitive data entry, bank OTP latency, and network "wahala".

## 🚀 The Mission
In Nigerian e-commerce, checkout friction leads to an estimated **38–55% drop-off rate**. **tap.** eliminates this by securely mapping a user's device to a Paystack authorization token. After a one-time enrollment, returning customers across the entire network can pay in under 5 seconds—with zero friction.

## 🛠 Tech Stack
Built with a modern, high-performance stack optimized for the edge:
* **Frontend:** Next.js (App Router) + Tailwind CSS + Framer Motion
* **Orchestration:** Next.js API Routes + Supabase (PostgreSQL)
* **Security:** FingerprintJS Pro for deterministic device recognition
* **Payment Rail:** Paystack API

## 🏗 System Architecture
**tap.** is designed as a three-layer system to minimize PCI-DSS scope by never storing raw card data:
1.  **Presentation Layer:** Next.js + Vercel edge-network-hosted UI for sub-200ms load times.
2.  **Orchestration Layer:** Logic handling device recognition, token lookup, and session management.
3.  **Payment Rail Layer:** Direct integration with Paystack's Charge Authorization endpoints.

## 🤝 Open Source & Collaborations
**tap.** is an open-source project. We believe that the identity layer for African commerce should be built in the open. We are looking for contributors to help with:
* **SDK Development:** Packaging our iframe widget for easier merchant integration.
* **Device Recovery Flows:** Enhancing WhatsApp/SMS OTP recovery for new devices.
* **Merchant Analytics:** Building out the ROI dashboard for SMEs.

## 📅 Deployment Roadmap
* **Phase 1:** Hosted Payment Links — Standing alone as a shareable URL.
* **Phase 2:** JavaScript Embed Widget — Embeddable via a single script tag.
* **Phase 3:** WhatsApp OTP Device Recovery — Fallback for hardware changes.
* **Phase 4:** Merchant Analytics Dashboard — Conversion and ROI tracking.

## 📩 Join the Waitlist
Are you a merchant, developer, or enthusiast? Help us eliminate checkout friction.
**[Sign up for early access here](https://tap-waitlist-ng.vercel.app)**

---

Built for developers who ship. 🚀
