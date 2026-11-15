# 17. Migrate local development database to PostgreSQL

**Status:** Needs Refinement

#### Acceptance criteria

- The backend runs against PostgreSQL for local development instead of SQLite.
- Existing backend behavior and data-model constraints are preserved through the migration.
- The selected ORM and driver are checked for compatibility with local PostgreSQL and a possible future AWS DSQL target before implementation.
- AWS DSQL is not provisioned as part of this story.
- Local database setup, configuration, migrations, and recovery/testing instructions are documented.
- SQLite-specific runtime dependencies and configuration are removed after the migration is verified.

#### Technical requirements

- PostgreSQL is the confirmed local development database target.
- Drizzle remains a candidate, not a confirmed choice. Verify its PostgreSQL driver and feature compatibility with AWS DSQL; select a different ORM if needed.
- TBD: local PostgreSQL provisioning and lifecycle for contributors (for example, Docker Compose versus a locally installed service).
- Preserve the existing OpenAPI contract and application behavior unless a separate story explicitly changes them.
