# 7. Import the historical spreadsheet

**Status:** Needs Refinement

#### Acceptance criteria

- Every history entry in the spreadsheet is brought into the local working dataset and linked using its WCA user ID where available.
- Preserve the original field values and enough source context to review imports, including the `Trainee-YYYY-MM-DD` encoding.
- Spreadsheet color meanings seed date-quality hints; reviewers can confirm or correct them during import review.
- Missing-but-needed dates remain represented as local records with a null date rather than being dropped.
- First/last delegated competition dates remain distinct from appointment and rank-change dates.
- Unmatched IDs and ID/name conflicts are surfaced for review during import rather than silently discarded or matched by name alone.

#### Technical requirements

- TBD: spreadsheet access/export format, row parsing, range representation, duplicate handling, and safe re-import behavior.
