# Ajora - Technical Reflection

Building Ajora through BuildLab Africa Stage 1 gave me a chance to develop a frontend prototype from an initial dashboard into a small routed application. I worked with Next.js, React, TypeScript, and Tailwind CSS to present the main parts of an Ajo group workflow: viewing group progress, checking members and contributions, following the payout schedule, and recording a contribution. The three-week plan helped me move from the initial interface toward shared data, interaction, and quality checks without expanding the project beyond its intended scope.

## Skills and project structure

I strengthened my understanding of the Next.js App Router by organizing the home, dashboard, members, payout schedule, contribution history, settings, login, and sign-up pages as routes. TypeScript helped me describe the group, members, cycles, contribution records, and payouts with explicit types. I also practiced separating sample data, calculations, shared interface elements, and page-level components so each part has a clearer responsibility.

Reusable React components became more useful as the dashboard grew. The dashboard views draw from the central sample data and calculation helpers, while shared pieces such as the shell, status badges, and empty states provide consistent patterns. This reduced repeated presentation logic and made it easier to keep the same member and contribution information aligned across views.

## Shared state and browser persistence

The contribution provider gave the dashboard views one client-side source for changes made through the Record Contribution dialog. Form validation checks the selected member, period, amount, and date before updating that state. I chose to persist contribution overrides in `localStorage` while keeping the original sample data separate. On the client, the provider restores valid saved changes and handles malformed or outdated values by returning to the sample records. I manually checked that a recorded demo contribution remained after a browser refresh and appeared consistently in relevant views.

This approach fits a frontend demonstration, but it is scoped to one browser. Clearing its storage removes the saved changes, and the records are not shared between users or devices. They are not evidence of payments or a source of real financial records.

## Responsive design and accessibility

I used responsive layouts to keep the dashboard views and authentication screens usable at different viewport sizes, then manually checked the responsive layouts. Keyboard work focused on the contribution dialog and mobile navigation. For the dialog, I added initial focus, Tab and Shift+Tab containment, Escape handling, background inertness, and focus restoration. The mobile navigation moves focus into the open menu and returns it to its trigger when closed. These changes address specific interactions; I have not completed a full accessibility or screen-reader audit, and I would continue reviewing keyboard and assistive-technology behavior.

## Testing and quality checks

I added automated tests with Vitest, JSDOM, and React Testing Library. The verified run passed two test files with seven tests. They cover Members view rendering, search and combined filters, contribution validation and state updates, and dialog keyboard behavior. I also verified the lint and TypeScript checks and completed a production build with Next.js 16.4.1. Separately, I manually checked the application routes, the custom 404 page, responsive layouts, and contribution persistence after refresh. Keeping manual verification distinct from automated tests made the scope of each result clearer.

## Limitations and future work

Ajora remains frontend-only. It uses sample group and member records with fixed October 2026 demonstration dates. Authentication is not implemented, and the application does not connect to a backend, process payments, or manage real money. The login and sign-up forms provide client-side validation and navigation only.

In a future version, I would first review the product requirements for any real account or data-sharing workflow before selecting services or changing the prototype's scope. I would add focused tests for restoring and rejecting browser-stored contribution data, and keep the sample dates clearly identified or refresh them as a deliberate demo dataset update. I would also conduct a broader keyboard and screen-reader review and record its findings, rather than treating the current dialog and navigation improvements as a complete accessibility audit.
