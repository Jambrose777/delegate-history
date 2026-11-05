# 15. Compare backfill candidates with WCA

**Status:** Needs Refinement

#### Acceptance criteria

- The application refreshes or uses a current WCA role mirror before migration generation.
- Spreadsheet history remains in the local working dataset even when a matching WCA row exists.
- Exact matches are excluded from duplicate migration output.
- Mismatches are surfaced rather than silently overwriting WCA or emitting duplicate rows; detailed conflict resolution may be deferred until a baseline application exists.

#### Technical requirements

- TBD: exact match keys, refresh timing, and how same-person/role date conflicts affect migration eligibility.
