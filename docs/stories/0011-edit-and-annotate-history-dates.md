# 11. Edit and annotate history dates

**Status:** Needs Refinement

#### Acceptance criteria

- Authorized admins and approvers can add or edit local stints and their date facts.
- A date fact can be marked approximate, assigned one optional source value, and annotated with notes.
- A required but unknown date can remain as a local date fact with a null date value.
- Approximate ranges can remain in notes and are not eligible for migration until the working group selects one date in the UI.
- Editing local history does not silently overwrite the WCA reference snapshot.

#### Technical requirements

- TBD: validation rules, audit history, concurrency behavior, and UI treatment of missing, approximate, and conflicted dates.
