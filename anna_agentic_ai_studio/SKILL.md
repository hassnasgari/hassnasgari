---
name: anna-agentic-orchestrator
description: Autonomous Multi-Agent task decomposition, real-time tool calling, and research synthesis engine for Anna AI OS.
version: 1.0.0
author: Hassan Asgari
---

# Anna Agentic Workflow Orchestrator

## Overview
This skill provides an autonomous multi-agent pipeline designed to break down high-level user directives into actionable sub-tasks, execute tool calls, and produce synthesis reports with human-in-the-loop oversight.

## Pipeline Architecture
1. **Planner Agent:** Ingests the objective, detects dependencies, and builds an execution graph.
2. **Oracle & Research Agent:** Pulls metrics, verifies data sources, and evaluates constraints.
3. **Execution Agent:** Performs structured computations, checks risk parameters, and validates outputs.
4. **Synthesizer Agent:** Formats executive summaries, creates visual tables, and generates downloadable deliverables.

## Tool Definitions
- `task_decomposer(objective, depth)`: Deconstructs tasks into granular sequential steps.
- `web_intelligence_probe(query)`: Simulates real-time web & crypto analytics queries.
- `report_compiler(data_payload)`: Formats institutional-grade Markdown summaries.
