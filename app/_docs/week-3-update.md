# Ajora - Week 3 Update

**Track:** Frontend Development  
**Programme:** BuildLab Africa Stage 1  
**Week:** 3 - Quality and Delivery

**Repository:** [https://github.com/Bolazcoding/ajora](https://github.com/Bolazcoding/ajora)  
**Live Application:** [https://mobolaji-ajora.vercel.app/](https://mobolaji-ajora.vercel.app/)

## 1. Week 3 Overview

This week, I focused on quality and delivery for Ajora. I completed the frontend contribution workflow, added browser persistence for contribution changes, improved keyboard access to the contribution dialog and mobile navigation, and verified the application routes, responsive layouts, and project checks.

## 2. Features and Improvements Implemented

- Kept the Overview, Members, Payout Schedule, Contribution History, and Settings views connected to shared sample group data and calculations.
- Added a contribution-recording interaction with input validation and shared dashboard state updates.
- Added search and filtering interactions to the relevant member and contribution views.
- Added and verified the custom not-found page for unknown routes.
- Updated the project README with setup instructions, routes, commands, project scope, and verification results.

## 3. Contribution State and Browser Persistence

Contribution changes are shared across the dashboard views through the frontend contribution provider. Recorded demo contributions are stored as browser `localStorage` overrides, separate from the sample data source. The overrides are restored after a browser refresh, and the displayed contribution information remains consistent across the relevant views.

The browser refresh behavior was manually verified. These records are demonstration data only and do not represent payments or real financial transactions.

## 4. Accessibility Improvements

- Improved the Record Contribution dialog's keyboard behavior with focus placement on open, Tab and Shift+Tab focus containment, Escape handling, background inertness, and focus restoration when the dialog closes.
- Improved mobile navigation keyboard handling by moving focus into the open navigation, supporting Escape to close it, restoring focus to its trigger, and preventing background scrolling while it is open.
- Kept form fields labelled and validation feedback associated with the relevant inputs.

Keyboard accessibility improvements for the contribution dialog and mobile navigation were implemented and checked. This work does not claim that every accessibility issue has been resolved, and no screen-reader audit is reported.

## 5. Automated Testing

The automated suite uses Vitest with JSDOM and React Testing Library. The completed test run reported:

- **2 test files passed.**
- **7 tests passed.**

The tests cover representative Members view rendering, member search and combined filtering, contribution validation and state updates, and contribution dialog keyboard behavior. The test results do not represent manual browser checks.

## 6. Responsive Design and Route Verification

Responsive layouts were manually checked. All application routes were manually tested:

- `/`
- `/dashboard`
- `/members`
- `/payout-schedule`
- `/contribution-history`
- `/settings`
- `/login`
- `/signup`

An unknown route displayed Ajora's custom 404 page.

## 7. Quality Assurance and Validation Results

- ESLint completed successfully with `npm run lint`.
- TypeScript completed successfully with `npx tsc --noEmit --incremental false`.
- Vitest completed successfully: 2 test files and 7 tests passed.
- The production build completed successfully with Next.js 16.4.1 using `npm run build`.
- Manual checks confirmed that contribution records remained available after browser refresh and that the application routes, unknown-route page, and responsive layouts behaved as expected.

## 8. Challenges and Technical Decisions

Ajora remains a frontend-only prototype, so the contribution workflow was kept in client-side state rather than connected to a backend or payment service. Contribution changes are stored separately from the sample data and validated when restored from browser storage. Invalid or outdated saved data is handled by falling back to the initial sample records.

The group data uses fixed October 2026 demonstration dates. Those dates and statuses are intentionally part of the sample scenario and do not advance automatically with the calendar.

## 9. Known Limitations

- Ajora uses sample Ajo group and member data with fixed October 2026 demonstration dates.
- Contribution overrides are stored only in the current browser's `localStorage`; clearing that browser storage removes the saved demo changes.
- Authentication is not implemented. Login and sign-up provide frontend validation only and do not create an account or authenticated session.
- The application does not process payments, transfer funds, or manage real money. It has no backend or database.
- Google sign-in and password reset are not connected.
- Accessibility work focused on the contribution dialog and mobile navigation; no full accessibility or screen-reader audit is claimed.

## 10. Project Links

**GitHub repository:** [https://github.com/Bolazcoding/ajora](https://github.com/Bolazcoding/ajora)  
**Live application:** [https://mobolaji-ajora.vercel.app/](https://mobolaji-ajora.vercel.app/)
