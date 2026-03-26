# Mail Calendar Operating Model

## Use this reference for
- inbox triage design
- calendar support design
- approval boundaries
- executive routine design

## Minimum architecture checklist
- provider(s)
- account(s)
- auth method
- required scopes
- read actions
- write actions
- approval gates
- logging location

## Recommended operating separation
### Email
- read and classify
- summarize
- suggest replies
- follow-up tracking
- explicit approval before sending or destructive actions

### Calendar
- read agenda
- identify conflicts
- highlight preparation needs
- explicit approval before creating, editing, or deleting events unless policy is defined

## Executive routine suggestions
- morning inbox summary
- upcoming meetings view
- pending reply tracker
- follow-up list
- decision-needed queue
