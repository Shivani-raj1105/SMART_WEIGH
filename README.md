# Smart Weigh: Distributed Transaction-to-Actuation Orchestration

A high-integrity, cloud-orchestrated system bridging high-trust financial transactions with low-trust edge hardware. This project demonstrates a solution to the "Physical Access Bottleneck"—ensuring physical hardware actuation is a deterministic result of a verified backend state.

**Live Demo:** [smart-weigh-integration-az4g.vercel.app](https://smart-weigh-intergration-az4g.vercel.app/)

---

## System Architecture & Philosophy

This is not a simple "frontend-to-relay" bridge. It is a **backend-authoritative orchestration layer** designed to handle the complexities of distributed systems.

### 1. Centralized State Authority
The frontend is treated as a "dumb" telemetry provider. It possesses zero authority over device state. All hardware commands originate from a hardened backend environment after multi-factor validation (Identity + Payment Verification + Device Availability).

### 2. Physical-Digital Sync Pattern
We model the physical weighing device as a **Finite State Machine (FSM)**. This prevents illegal state transitions, such as moving from `IDLE` to `ACTIVE` without a verified `TRANSACTION_SUCCESS` signal.

---

##  Engineering Challenges & Solutions

### A. Idempotency & The "Double-Tap" Problem
In payment-gated IoT, network retries or webhook duplicates can lead to multiple hardware activations for a single charge.
* **Solution:** Implementation of an **Idempotency Layer** using unique transaction hashes. Duplicate signals for the same `session_id` are suppressed at the database level, ensuring one payment equals exactly one session.

### B. Command Delivery over Non-Deterministic Networks
IoT devices often operate behind NATs or on unstable connections where traditional inbound HTTP requests fail.
* **Solution:** The current architecture utilizes a "Cloud-to-Edge" push, but is architected to pivot to a **Pub/Sub (MQTT) model**. This shifts the burden of connectivity to the device, ensuring it "phones home" for instructions.

### C. Session Lifecycle Management (TTL)
To prevent "zombie sessions" (where hardware remains active indefinitely due to a client-side crash), we implement **Server-Side Time-To-Live (TTL)**.
* **Solution:** The backend issues a time-bound lease. Upon expiry of the `duration` key in Firestore, a background worker triggers a "Force-Kill" command to the relay, independent of user interaction.

---

##  Tech Stack Justification

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend** | **Reat + Typescript** | Optimizes Time-to-Interactive (TTI) and provides a clean API route layer for edge-side logic. |
| **Orchestration** | **Node.js (Express)** | Non-blocking I/O is ideal for handling asynchronous payment webhooks and hardware polling concurrently. |
| **Data Persistence** | **Firestore** | Provides real-time synchronization out-of-the-box, allowing the frontend to reflect state changes without manual polling. |
| **Security** | **Firebase Auth** | Offloads credential risk to a managed provider, allowing focus on the core business logic. |
| **Database** | **MongoDB** |
| **Payments** | **RazorPay** |
---

##  Security & Risk Mitigation

* **Webhook Signature Verification:** All payment callbacks are cryptographically verified using provider secrets to prevent "Mock-Payment" spoofing.
* **State Locking:** Active sessions are locked to a specific `user_id` and `device_id`, preventing session hijacking or concurrent usage conflicts.
* **Audit Logging:** Every state transition (e.g., `PAYMENT_RECEIVED` -> `RELAY_TRIGGERED`) is persisted for forensic auditing and usage analytics.

---

##  Strategic Roadmap

### Phase 1: Bi-Directional Reliability (WebSockets/MQTT)
Transition from RESTful polling to a persistent pipe. This reduces latency and introduces **Heartbeat Monitoring**, allowing the system to know if a device is offline *before* a user pays.

### Phase 2: Hardware-Level Acknowledgement (ACK)
Implement a "Closed-Loop" feedback system where the hardware sends an `ACK` signal back to the cloud once the physical relay actually flips, ensuring the DB reflects reality, not just intent.

### Phase 3: Edge Orchestration
Abstract the backend to support a fleet of devices, introducing a registry service that maps `transaction_id` to a specific `device_id` based on proximity or health metrics.

---
## Summary

This project demonstrates:
- backend-driven system design
- real-world IoT constraints
- transaction-based access control

In short:
> Software deciding when hardware is allowed to exist.

## Screens

<img width="1887" height="856" alt="image" src="https://github.com/user-attachments/assets/47288e1a-aa8e-4ace-a516-0e09533564ad" />
<img width="1913" height="861" alt="image" src="https://github.com/user-attachments/assets/3500823c-4766-4df5-83b0-952f1f121b4d" />
<img width="1891" height="858" alt="image" src="https://github.com/user-attachments/assets/5b0bd724-5494-43af-bb16-77172348911b" />
<img width="1896" height="867" alt="image" src="https://github.com/user-attachments/assets/680c72a3-0778-422f-bc2c-10a98a7542e1" />
<img width="1892" height="867" alt="image" src="https://github.com/user-attachments/assets/bdd31f2e-60fe-426e-a505-a1a580d29a9e" />
<img width="1887" height="853" alt="image" src="https://github.com/user-attachments/assets/a257b8e6-1bfd-4c3e-b3e7-37043b789b80" />



##  The Team
Developed as a collaborative project, focusing on the intersection of full-stack software architecture and physical resource management.
