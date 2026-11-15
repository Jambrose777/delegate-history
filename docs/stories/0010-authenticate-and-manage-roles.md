# 10. Authenticate administrators and working-group members

**Status:** Needs Refinement

#### Acceptance criteria

- Public browsing remains available without authentication.
- WCA authentication identifies users for suggestions and privileged actions.
- Any authenticated WCA user can submit suggestions; suggestion access is not a separate role.
- Approvers can edit history records and approve them.
- Admins have all approver permissions plus a user-management panel to promote or demote
  authenticated users as approvers or admins.
- Unauthorized users cannot perform role-restricted actions.

#### Technical requirements

- Before launch, manually seed the first admin's WCA identity in the database; do not
  grant admin automatically to the first person who signs in.
- Use WCA authentication. The exact OAuth flow, identity claims and mapping, and
  session handling remain TBD; inspect the local `southeastcubing.org` repository when
  auth work begins.
- Store approver/admin as application-managed roles; admin includes approver
  permissions and can manage those roles.
