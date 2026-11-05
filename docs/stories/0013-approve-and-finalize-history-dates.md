# 13. Approve and finalize history dates

**Status:** Needs Refinement

#### Acceptance criteria

- Working-group approvers can promote a reviewed suggestion into a canonical date fact.
- Approvers can create multiple approval records for a date fact; approval state is derived from those records rather than one `approved_by` field.
- Only approved, migration-ready date facts can be selected for WCA migration generation.
- Approval history identifies the WCA-authenticated approver and timestamp.

#### Technical requirements

- TBD: approval threshold, whether all or any approvers are required, and how approval changes or revocation are represented.
