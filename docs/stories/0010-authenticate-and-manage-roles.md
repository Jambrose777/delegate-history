# 10. Authenticate administrators and working-group members

**Status:** Needs Refinement

#### Acceptance criteria

- Public browsing remains available without authentication.
- WCA authentication identifies users for privileged actions.
- Admins can grant and revoke the `admin`, `approver`, and `suggestor` roles.
- Admins manage membership; working-group approvers and invited suggestors receive distinct permissions.
- Unauthorized users cannot perform role-restricted actions.

#### Technical requirements

- TBD: WCA OAuth flow, identity claims and mapping, session handling, and role authorization. Inspect the local `southeastcubing.org` repository when auth work begins.
