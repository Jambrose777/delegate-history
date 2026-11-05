# 5. Build WCA reference sync

**Status:** Needs Refinement

#### Acceptance criteria

- Relevant WCA users, delegate role stints, competition delegate IDs, and delegate region/subregion records are mirrored in read-only WCA tables using WCA IDs.
- The initial load and later refresh use the same repeatable, idempotent sync path.
- Refreshing WCA data does not overwrite locally authored history.
- Only the user fields needed for identity and display are imported; private credentials and unrelated user data are excluded.
- The relationship between `competition_delegates.delegate_id` and `users.id`, and the region/subregion mapping, is verified.

#### Technical requirements

- TBD: export retrieval method, selected source fields, sync cursor/versioning, transaction boundaries, and error/retry behavior.
