# Candidate Story Map

**Status:** Draft for discussion  
**Last updated:** 2026-11-04

This is a high-level decomposition of the Delegate History project based on current
`delegate-history.md` discovery and `database-structure-mockup.md`. These are candidate
stories, not implementation-ready requirements, and have not yet been added to the
backlog. Refine them after the WCA migration contract and source-file formats are
understood.

## Candidate Stories

| #   | Title                                                 | Description                                                                                                                                                                                                                                           |
| --- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Build WCA reference sync                              | Create read-only mirrors for WCA users, delegate role stints, competition delegate IDs, and region/subregion hierarchy. Support the initial import and repeatable refreshes using the same idempotent sync path; use WCA IDs as canonical identities. |
| 2   | Create the local timeline model                       | Define local WCA-shaped role stints with shared date facts, separate delegate-track rank/location from Regional/Senior scopes, and distinguish missing local dates from active WCA end dates.                                                         |
| 3   | Import the historical spreadsheet                     | Load all spreadsheet history into the local timeline model, link by WCA user ID, preserve source values and date-quality cues, and flag unresolved mappings for review rather than silently dropping rows.                                            |
| 4   | Prepare email-digest history                          | Define a Markdown input convention for the relevant 2020-2024 digests and import their date evidence into the local timeline model without losing approximate ranges or source context.                                                               |
| 5   | Browse the delegate roster and timelines              | Provide a public, unauthenticated view of people and their current and historical roles, including multiple concurrent active roles.                                                                                                                  |
| 6   | Authenticate administrators and working-group members | Add WCA authentication, admin-managed role membership, and public read-only access.                                                                                                                                                                   |
| 7   | Edit and annotate history dates                       | Let authorized editors add or correct date facts, mark dates approximate, record one optional source, and keep unresolved ranges in notes until a single date is selected.                                                                            |
| 8   | Suggest history dates                                 | Let invited suggestors submit a proposed date with a required comment explaining its evidence; approvers can review the suggestion.                                                                                                                   |
| 9   | Approve and finalize history dates                    | Let working-group approvers promote suggestions into date facts and record multiple approvals per fact.                                                                                                                                               |
| 10  | Review and select backfill records                    | Add filters and selection for individual, filtered, or all eligible records, with missing, approximate, suggested, and approved states visible to the team.                                                                                           |
| 11  | Compare backfill candidates with WCA                  | Use the refreshed WCA mirror from Story 1 to suppress duplicate migration entries for selected local history. Detailed mismatch resolution is deferred until a baseline application exists.                                                           |
| 12  | Generate WCA migration files                          | Turn selected eligible records into migration files after confirming the WCA repository, output format, and supported event types. This story ends at file generation; downstream submission/review is out of current scope.                          |

## Likely Order and Dependencies

The WCA reference sync is the first dependency, followed by the local timeline model.
Story 1 owns the reusable initial and repeatable WCA refresh path. Spreadsheet and
email-digest imports depend on the WCA identity mirror and local timeline model. Public
browsing can follow the initial imports; editing and suggestion workflows depend on
WCA-authenticated roles. Date approval follows suggestion handling. Story 11 consumes
the WCA mirror to compare selected migration candidates; it does not reimplement sync.
Migration generation builds on the resulting eligible, approved local date facts.

Detailed sync conflict policy, WCA migration serialization, and installer/deployment
choices should remain deferred until a usable application baseline exists and the WCA
migration contract has been inspected.
