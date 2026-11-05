# 6. Create the local timeline model

**Status:** Needs Refinement

#### Acceptance criteria

- Local timeline stints reference `wca_users.id` directly; no separate local people table duplicates WCA identity.
- Delegate-track stints combine rank with delegate region/subregion, while Senior and Regional stints are separate, region-scoped roles that may overlap the delegate track.
- A canonical date fact may be shared by the end of one stint and start of the next, avoiding duplicate transition dates.
- A missing required date is represented by a date fact with a null date value; an active local stint has no end-date fact. This differs from a WCA role row with `end_date = NULL`.
- Date facts support an approximate flag, one optional source value, notes, and multiple approval records.

#### Technical requirements

- TBD: exact role vocabulary, constraints for shared facts, date ranges/point events, and Drizzle schema/migration layout.
