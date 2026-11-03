---
description: 'Write a concise implementation plan for a story without changing files.'
argument-hint: '[story-number]'
tools: [read, search, todo]
---

Write an implementation plan for a story without making code or documentation changes:

1. Determine the story number: use the argument passed to this prompt if one was given,
   otherwise infer it from the story being discussed or implemented in this conversation.
2. Read the story file directly under `docs/stories/`, its status in
   `docs/stories/README.md`, and the relevant code or documentation needed to ground
   the plan.
3. Present a concise, ordered plan with short, actionable steps and substeps. Tie the
   work to the story's acceptance criteria and include focused validation where useful.
4. Do not implement the plan. Stop after presenting it and wait for the user to direct
   implementation.

When the developer follows an implementation plan, they must complete one step or
substep at a time and pause for the user's manual review before continuing.
