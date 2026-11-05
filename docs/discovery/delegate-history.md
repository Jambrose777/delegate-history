# Delegate History Discovery

**Status:** Exploring  
**Last updated:** 2026-11-03

## Purpose

Build a collaborative tool to reconstruct and backfill WCA Delegate History that is
missing from the WCA website. WCA began retaining delegate history on the website
around 2024, but older history was not backfilled. A team should be able to review and
correct historical dates, approve records, and generate migration files for submission
to WCA.

## Current Understanding

- The WCA developer export page offers a downloadable SQL dump in a ZIP file and links
  to the WCA GitHub wiki for details. The page itself does not mention an API:
  <https://www.worldcubeassociation.org/export/developer>
- The download link currently points to
  <https://exports.worldcubeassociation.org/developer/wca-developer-database-dump.zip>.
- The supplied ZIP contains a 5.23 GB plain-text SQL dump. Its header identifies it as
  a MariaDB 10.19-11.8.6 dump for a MySQL 8.4.8 server.
- Every `2004-08-01` date is a placeholder for an unknown date. A null role `end_date`
  means that role stint is currently active. Some history may be absent entirely rather
  than represented by a placeholder; the spreadsheet and email digests are expected to
  provide evidence for reconciling those gaps.
- An existing spreadsheet contains substantial historical dates and data for most
  people through approximately 2020. All history entries in it are in scope for the
  backfill; much of this history is missing from the current WCA export:
  <https://docs.google.com/spreadsheets/d/1yL9jZp5ICeOFqLWbZBD47vstWwRc1goMCMiKSFZf464/edit?usp=sharing>
- Historical evidence has come from multiple sources, including the Wayback Machine, an
  older WOS personnel spreadsheet that is no longer available, private emails, and email
  digests. Source provenance was not recorded consistently.
- Email digests from approximately 2020 through 2024 may provide approximate monthly
  dates for part of the history.
- The application should provide a UI for a team to add, edit, and approve a person's
  history dates.
- Users should be able to select individual rows, all rows, or filtered rows and
  generate migration files for WCA.
- A sync operation should fetch current WCA delegate dates so migrations are not
  generated for dates already present there. Spreadsheet entries should still be
  imported into the working dataset even when sync finds a matching WCA date.

## Initial Export Inspection

The SQL schema confirms that delegate stints are represented in `user_roles`:

- `user_roles` contains `user_id`, `group_id`, `start_date`, nullable `end_date`,
  `metadata_id`, and `metadata_type`.
- `user_groups` provides role `group_type`, group name, active/hidden flags, and parent
  group. The export has one `delegate_probation` group and 61 `delegate_regions`
  groups, including historical/inactive region groups.
- `roles_metadata_delegate_regions` stores `status`, `location`, `first_delegated`,
  `last_delegated`, and `total_delegated` in addition to audit timestamps.
- `competition_delegates` stores `competition_id` and `delegate_id`. The proposed
  interpretation is that `delegate_id` identifies a WCA user; validate it against
  `users.id` in the export before relying on that join.
- The `users` table has a database `id`, `name`, and `wca_id`. `user_roles.user_id`
  references `users.id`; the WCA competitor identifier is the separate `wca_id` field.

A focused local MySQL 8.4.8 import of `user_groups`, `user_roles`, and
`roles_metadata_delegate_regions` was used for these aggregate queries. The full user
table and unrelated competition/results tables were not imported. In this supplied
snapshot, delegate-related roles comprise 1,871 role rows across 914 distinct users;
per-status people counts overlap because one person can have multiple stints. Per
project-owner confirmation, all `2004-08-01` values are unknown-date placeholders, and
all null `end_date` values identify currently active stints.

| Role status       | Role rows | Distinct people | Raw non-placeholder start range | Active stints (null end) | Placeholder starts |
| ----------------- | --------- | --------------- | ------------------------------- | ------------------------ | ------------------ |
| Delegate          | 566       | 417             | 2010-01-16 to 2026-10-26        | 371                      | 202                |
| Junior delegate   | 669       | 533             | 2023-11-12 to 2026-11-02        | 268                      | 237                |
| Regional delegate | 87        | 69              | 2019-07-17 to 2026-10-24        | 38                       | 0                  |
| Senior delegate   | 19        | 15              | 2024-06-20 to 2026-10-15        | 8                        | 9                  |
| Trainee delegate  | 530       | 472             | 2023-07-06 to 2026-10-26        | 126                      | 108                |

Across those role rows, `2004-08-01` appears 556 times as `start_date` and zero times
as `end_date`. Null end dates occur across all five statuses and represent currently
active stints. Per project-owner confirmation, `2004-08-01` is the only unknown-date
placeholder; the export can still omit history entirely, so not every missing date is
represented by that value. Spreadsheet records and email digests are the identified
evidence sources for investigating those omissions.

The raw earliest non-placeholder `user_roles.start_date` is `2010-01-16`, for Delegate
role row 272 (`user_id` 2, Sebastien Auroux), which has a null end date. Its linked
metadata also says `first_delegated = 2010-01-16`; both records were created together on
2024-04-08, so this is not independent confirmation. The next distinct raw Delegate
start is `2021-07-31` for Chris Martin (`user_id` 13545), followed by another Chris
Martin stint starting `2023-01-28`. The project owner confirms these Sebastien and Chris
Martin records were manually entered exceptions; for ordinary Delegate starts,
`2024-04-19` is the earliest valid date. WCA is the source of truth for WCA state; the
spreadsheet provides comparison evidence for the manual exceptions, not an automatic
override.

Separately, the metadata table's earliest non-null `first_delegated` date is
`2003-08-23` for a Delegate record. This describes a first competition date, not the
beginning of a delegate role stint. For Regional and Senior Delegate metadata,
`first_delegated` and `last_delegated` are null in all imported metadata rows even
though `user_roles` has date ranges for those stints. There is one Regional and one
Trainee metadata row with no matching `user_roles` row in this snapshot. These
differences mean the metadata summary fields are not a complete substitute for role
history.

## Spreadsheet Details

All history entries in the spreadsheet are intended for the backfill. The current WCA
export is used to identify entries already present and avoid duplicate migrations; it
does not determine whether spreadsheet entries belong in the working dataset.
WCA remains authoritative for records already present there. Spreadsheet dates are
comparison evidence, especially for the manually entered early exceptions; they should
not automatically overwrite WCA values.

The spreadsheet has these fields and interpretations, based on the current description:

| Field                                                       | Meaning and caveats                                                                                                                                                                                                              |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Delegate Name                                               | Name from the WCA users table.                                                                                                                                                                                                   |
| Delegate Id                                                 | `user_id` from the WCA users table; a candidate stable key for matching people.                                                                                                                                                  |
| Current Delegate Status                                     | A snapshot from around 2020 and now likely out of date. Statuses include Trainee, Junior (formerly Candidate), and Delegate. Some people move between ranks, and some are promoted directly to Delegate without a Junior period. |
| Current Region                                              | An outdated snapshot of the senior region.                                                                                                                                                                                       |
| First Delegated / Last Delegated                            | Dates of the person's first and most recent competitions as a delegate; these describe competition activity, not necessarily appointment history.                                                                                |
| Appointment Date                                            | Appointment to Candidate/Junior. Trainee appointments are encoded in this column as `Trainee-YYYY-MM-DD`; preserve and inspect this representation during import.                                                                |
| Promotion Date                                              | Promotion from Junior to full Delegate. Some people have no Junior period.                                                                                                                                                       |
| Senior Date / Regional Delegate Date                        | Date ranges for Senior and Regional Delegate stints. These may already be backfilled in WCA and need comparison with the export.                                                                                                 |
| Demotion Date                                               | A date when someone stopped serving at a particular rank. A person may be demoted to a lower delegate rank rather than leaving delegate service entirely.                                                                        |
| Last Region / Last Subregion / Last Country / Last Location | Outdated location snapshots. A delegate can move, so current location should not be treated as an immutable person attribute.                                                                                                    |
| Region Changes / Notes                                      | Notes about historical region changes.                                                                                                                                                                                           |

## Candidate People and Identity Import

The proposed initial person list is identity-first:

1. Query distinct non-null `competition_delegates.delegate_id` values and join them to
   `users.id` to seed people who have delegated competitions. Validate this join against
   the export because the table definition does not declare a foreign key.
2. Add every person with a WCA delegate role in `user_roles`, including people who have
   not yet delegated a competition.
3. Match spreadsheet `Delegate Id` values to the same WCA user IDs. Add missing people
   only after confirming that the ID and name refer to the intended person.

Use the WCA user ID as the identity key and the name as a human-readable cross-check,
not as the primary matching key. This is a proposed import sequence; handle unmatched or
conflicting IDs during the import when the actual cases can be reviewed.

The spreadsheet's date-cell colors generally carry this quality/completeness meaning;
reviewers will verify them as they work through the import:

- Orange: date is not exact.
- Yellow or red: date is missing but known to be needed.
- Green: date is considered good.

For 2020-2024, email-digest content may be collected in Markdown files and used as an
additional source for the initial database import.

## Candidate Record and UI Model

The proposed UI is centered on a person's chronological history, expressed as dated
events rather than a single editable current-status field. Example events include:

- Promoted to Trainee on `2021-07-23`.
- Promoted to Junior on `2022-05-04`.
- Promoted to full Delegate on `2025-01-28`.
- Moved from North Carolina to Colorado on `2026-08-10`.

Current scope assumption: promotion and demotion, temporary delegation, Senior and
Regional stints, and geographical moves should all be represented in WCA migration
output. Confirm this against WCA's migration contract.

Locally, rank history and the delegate-track location history should be tracked as
separate timelines. For Trainee, Junior, and full Delegate stints, migration generation
combines rank with that location and splits the output whenever either changes. For
example:

| Rank and delegate-track location | Start date | End date        |
| -------------------------------- | ---------- | --------------- |
| Trainee                          | 2021-07-23 | 2022-05-04      |
| Junior                           | 2022-05-04 | 2025-01-28      |
| Full Delegate (North Carolina)   | 2025-01-28 | 2026-08-10      |
| Full Delegate (Colorado)         | 2026-08-10 | Active (`NULL`) |

Senior and Regional roles are separate, region-scoped stints. Their region identifies
the scope of that role, not the delegate's personal location. They can overlap the
Trainee/Junior/Delegate track and have their own start and end dates. Starting or ending
a Senior/Regional stint does not end or split the delegate-track stint. Generate their
own WCA role rows; an unrelated delegate-track location change should not split them.

Adjacent stints are understood to share a boundary date: the new stint's start date is
the previous stint's end date. For now, assume the shared date is inclusive on both
rows. This is low priority and only needs revisiting if WCA migration behavior requires
a different convention.

The focused export query found 864 same-user role-row pairs across 584 people where a
row's `end_date` exactly equals a later row's `start_date`. Examples include rank
changes and region moves. This confirms the shared-date storage pattern, but not whether
the database itself defines endpoint inclusivity; the working assumption is inclusive
on both rows.

Each date/event could carry its own evidence or source, a boolean marker for approximate
dates, and approval information. A date known to be missing should remain as a local
event row with a null date rather than being omitted. Approximate date ranges can be
preserved in the event's notes and remain unresolved there until the working group
chooses one date in the UI after the application is built. The final WCA migration
output will contain one date per entry, so unresolved ranges are not migration-ready.
Reviewers would approve individual dates, and migration generation would combine
selected approved events into WCA's required format. This remains a candidate model, not
a finalized database contract.

Each event may have one optional source value, entered through a combobox that allows
selecting an existing value or entering entirely new text. The source list is not
intended to be a closed taxonomy because historical sources were not recorded
consistently.

Current delegate status and current region/location may be derived from the event
history rather than copied from the 2020 spreadsheet. Null meanings differ by source:
in WCA, a null role `end_date` means the stint is currently active; local records do not
store an end-date entry for current delegates, while a null local event date means a
required date is missing. Temporary Delegates also need distinct treatment: they
received special approval to delegate a competition but were not official delegates.
People without delegate appointments may be Registered Speedcubers (RS), which should
not be conflated with temporary delegation.

Current roles are determined independently, so one person may have multiple active
roles at once. For example, Katie Hull has an active Delegate role for Georgia and an
active Regional role for Southeast; both WCA role rows have null `end_date`. The UI
should show both roles rather than collapsing them into one current status or location.

## Candidate Workflow

1. Fetch current delegate-history data from WCA and compare it with the local dataset.
2. Import the spreadsheet into a candidate historical dataset after its structure and
   person identifiers are understood.
3. Let suggestors propose dates with a comment explaining their evidence; approvers
   review, edit, and approve records. Keep approximate ranges in notes until the working
   group selects one date in the UI; do not generate a WCA entry for an unresolved range.
4. Filter or select the records intended for backfill.
5. Generate migration files containing only the selected records not already present on
   WCA.

This workflow is a working model for discovery, not a finalized specification. Current
scope ends when migration files are generated; what happens to them afterward is out of
scope for now.

## Candidate Access and Approval Model

- Public visitors can view the application without authentication.
- Users authenticate with WCA before they can take privileged actions.
- Admins, currently the project owner, manage membership and role assignments.
- Approvers are working-group members. They can edit dates and approve records.
- Suggestors are invited contributors outside the working group. They can suggest
  dates, but each suggestion must include a comment explaining its evidence. An
  approver reviews the suggestion and can approve it to make it an accepted record.
- WCA authentication is the planned identity provider. Inspect the local
  `southeastcubing.org` repository for an existing integration pattern when auth work
  begins.

## Open Questions

- How should the `Trainee-YYYY-MM-DD` encoding, rank changes, ranges, and first/last
  competition dates be parsed without losing the original values?

## Deferred Decisions

- How to review unmatched spreadsheet IDs and ID/name conflicts; decide this during the
  import when actual cases are available.
- Exact matching keys between local spreadsheet history and WCA records, including how
  to distinguish duplicates from separate stints.
- Conflict-prompt choices when the same person's role dates disagree between local
  history and WCA.
- Whether WCA's migration mechanism can change existing records or only add records,
  which determines how corrections to already-present WCA data could be handled.
- How sync should reconcile local edits with remote changes, duplicates, deletions, and
  records WCA has added since the previous sync. Revisit after a baseline application
  has been built; for now, retain the high-level goal of avoiding duplicate migrations.
- Which WCA repository and migration format the generated files must target. Inspect the
  relevant WCA repository when implementation reaches migration generation; decide then
  whether generated files need reproducibility or provenance metadata.
- Any WCA review, approval, or submission workflow after files have been generated;
  this remains explicitly outside current project scope.

Revisit the in-scope decisions as the spreadsheet structure and history model become
clearer. Defer migration format decisions until implementation planning.

## Next Discovery Steps

1. Query distinct `competition_delegates.delegate_id` values, validate the join to
   `users.id`, then union in people with delegate-role rows who have not yet delegated a
   competition.
2. Match every spreadsheet `Delegate Id` to the seeded WCA user list and investigate
   unmatched IDs or names before importing its history rows.
3. Document the 2020-2024 email-digest format and how its dates complement the spreadsheet.
4. Compare the spreadsheet dates for the manually entered Sebastien Auroux and Chris
   Martin exceptions with WCA's current records; keep WCA authoritative and record any
   discrepancies for review. Also compare representative entries against monthly
   email-digest evidence.
5. Resolve data provenance, approximate-date, approval, and team-collaboration needs
   before turning this discovery into implementation stories.
