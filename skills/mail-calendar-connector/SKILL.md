---
name: mail-calendar-connector
description: Plan and operate email/calendar integration for executive support. Use when connecting mail and calendar systems, defining integration architecture, triage rules, inbox workflows, calendar support, follow-up routines, or operational governance for email and scheduling.
---

# Mail Calendar Connector

Use this skill to design and operate email/calendar support with executive discipline.

## Core workflow
1. Identify the systems involved:
   - email provider
   - calendar provider
   - access method
   - account scope
2. Define the operational objective:
   - triage
   - reminders
   - follow-up
   - meeting preparation
   - inbox cleanup
   - schedule visibility
3. Propose the architecture before execution.
4. Separate:
   - read-only support
   - draft assistance
   - write/send actions
   - critical actions needing explicit confirmation
5. Establish governance, logging, and operating rules.

## Output structure
When planning or diagnosing mail/calendar integration, return:
- Objective
- Systems involved
- Recommended architecture
- Risks
- Permissions needed
- What can be automated
- What must remain approval-gated
- Next implementation step

## Rules
- Do not connect mail/calendar blindly.
- Prefer the smallest permission scope that solves the real need.
- Distinguish visibility from action authority.
- Treat sending, deleting, moving, and event modification as higher-risk actions.
- Record assumptions and missing credentials explicitly.

## References
- Read `references/mail-calendar-operating-model.md` when mapping executive routines, triage models, or approval boundaries.
