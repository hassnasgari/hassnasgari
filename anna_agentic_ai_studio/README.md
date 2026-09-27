# ⚡ Anna Agentic Studio | Autonomous Multi-Agent AI Orchestrator

[![DoraHacks BUIDL](https://img.shields.io/badge/DoraHacks-Anna_AI_App_Builder-blueviolet?style=for-the-badge&logo=target)](https://dorahacks.io)
[![Runtime](https://img.shields.io/badge/Runtime-Anna_AI_OS_v1.4.2-0284c7?style=for-the-badge&logo=google-cloud)](https://anna.partners)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

An enterprise-grade autonomous multi-agent task orchestrator and intelligence synthesis studio built for the **Anna AI OS App Builder Program** on DoraHacks.

---

## 🌟 Architecture & Swarm Pipeline

Anna Agentic Studio breaks down complex directives into modular execution DAGs powered by 4 specialized autonomous agents:

```
[ User Prompt / Objective ]
            │
            ▼
┌──────────────────────────────────────┐
│  🧠 1. Planner & Architect Agent     │  ──▶ Decomposes prompt into structured DAG & steps
└──────────────────────────────────────┘
            │
            ▼
┌──────────────────────────────────────┐
│  🌐 2. Web & Market Oracle Agent     │  ──▶ Ingests live telemetry & market data points
└──────────────────────────────────────┘
            │
            ▼
┌──────────────────────────────────────┐
│  ⚙️ 3. Logic & Risk Invariant Engine │  ──▶ Validates 28 boundary invariants & security tests
└──────────────────────────────────────┘
            │
            ▼
┌──────────────────────────────────────┐
│  📝 4. Executive Synthesizer Agent   │  ──▶ Compiles verified intelligence artifact & table
└──────────────────────────────────────┘
            │
            ▼
[ Downloadable Institutional Markdown Report & Verified Artifact ]
```

---

## 🚀 Key Features

1. **Autonomous Task Decomposition:** Converts unstructured natural language goals into sequential steps with dependency checking.
2. **Executa Tool Calling Emulation:** Simulates real-time JSON tool dispatch with millisecond execution tracing.
3. **Institutional Reporting Engine:** Formats full analytical tables, metrics, confidence scores, and action plans.
4. **Export Capabilities:** 1-click Markdown clipboard copy and `.md` file download.
5. **Anna AI OS Manifest & Skills:** Includes native `manifest.json` and `SKILL.md` compliant with the Anna AI Marketplace specifications.

---

## 💻 Quick Start

Run locally with the launcher:
```bash
run_agent.bat
```
Or start via Python:
```bash
python -m http.server 8085
```
Open `http://localhost:8085` in any browser.
