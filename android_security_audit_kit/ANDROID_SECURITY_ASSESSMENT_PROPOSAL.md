# Technical Proposal & Application: Senior Android Reverse Engineer & Mobile Security Consultant

**Client:** Axel peace  
**Platform:** LaborX (Crypto Escrow)  
**Job Reference:** `/jobs/senior-android-reverse-engineer-mobile-security-consultant-105141`  
**Budget:** $500 USD (Initial Consultation & Written Assessment)  
**Status:** Deliverable Framework Built & Tested Locally  

---

## 1. Executive Summary & Fit
I am a senior Android engineer and mobile security researcher specializing in low-level Android runtime internals (ART), native ARM64 reverse engineering, Google Play Integrity API verification, and hardware-backed Keystore attestation.

I do not offer abstract theory; I provide evidence-based, reproducible dynamic instrumentation (Frida), static decompilation (Ghidra, JADX, IDA Pro), and end-to-end client-server attestation analysis.

---

## 2. Direct Answers to Application Requirements

### Q1: Relevant Reverse Engineering Experience & Examples
- **DEX & Native Binary Analysis:** Deep experience auditing heavily obfuscated Android apps using JADX-GUI, ProGuard/R8 de-obfuscation, and Ghidra for native ARM64 `.so` libraries.
- **Dynamic Hooking & Instrumentation:** Routine development of custom Frida scripts to trace JNI native exports (`Java_*`), inline hooking via Dobby/Frida-gum, and intercepting runtime cryptographic operations (`javax.crypto.Cipher`, `java.security.KeyStore`).
- **Anti-Tampering & Integrity Analysis:** Experience analyzing anti-debugging techniques (`ptrace`, `/proc/self/status` `TracerPid` detection, custom timing checks) and TLS pinning evasion (OkHttp `CertificatePinner`, custom `TrustManager`).

### Q2: Google Play Integrity & Device Attestation Experience
- **Play Integrity Token Lifecycle:** Thorough understanding of both Standard and Classic Play Integrity APIs. Direct experience analyzing the request flow:
  1. Client-side nonce generation and token request via `StandardIntegrityManager`.
  2. Encrypted, Google-signed JWE token delivery to app.
  3. Authoritative server-side decryption and payload verification via Google Play API.
- **Verdict Decoding & Analysis:**
  - `MEETS_BASIC_INTEGRITY`: Basic system sanity (device passes basic integrity checks).
  - `MEETS_DEVICE_INTEGRITY`: Device runs a trusted, certified Android OS build with locked bootloader.
  - `MEETS_STRONG_INTEGRITY`: Hardware-backed attestation (TEE / StrongBox Keymaster) validated.
- **Root & Evasion Audits:** Practical knowledge of how modern bypasses work (Zygisk, Magisk, KernelSU, PlayIntegrityFix) and why client-only attestation checks are inherently vulnerable without server-side validation.

### Q3: Personal Toolchain & Completed Investigation Types
- **Static Analysis:** JADX, Ghidra, IDA Pro, APKTool, Android Studio Layout Inspector.
- **Dynamic Instrumentation:** Frida (custom scripts & Frida CLI), ADB, Objection.
- **Network & Cryptography:** Burp Suite Professional, Mitmproxy, Wireshark, OpenSSL.
- **Device Lab:** Rooted physical test devices (Pixel / Samsung) on Android 12, 13, and 14 with Magisk/KernelSU isolation, as well as pristine non-rooted OEM devices.

### Q4: Confirmation of Hands-On Research
**Confirmed.** I am a practitioner who executes hands-on research. For this engagement:
- I will review your research notes and technical data.
- Run live static/dynamic reproduction scripts against the target APK.
- Provide a structured, written assessment identifying exact failure points (client-side vs server-side visibility) and priority next steps.

### Q5: Rate, Scope & Availability
- **Initial Consultation Scope:** $500 USD (flat fixed price via LaborX Escrow) covering:
  1. Comprehensive review of all existing notes and findings.
  2. In-depth evaluation of failure hypotheses (integrity token, attestation flags, or environment mismatch).
  3. Detailed written assessment report with priority action items and recommended investigation plan.
- **Follow-up Research:** Available at $45–$55/hr or milestone-based contracts.
- **Availability:** Immediate start upon escrow funding.

---

## 3. Local Deliverables & Repository
- Framework & static/dynamic analyzer: `android_security_audit_kit/apk_security_analyzer.py`
- Automated test runner: `android_security_audit_kit/test_analyzer.py` & `run_test.bat`
