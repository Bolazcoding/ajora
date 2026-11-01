# Ajora

Ajora is a frontend web application that helps Ajo group organizers manage contributions, members, payout schedules, and contribution history. It is built as a responsive prototype for BuildLab Africa Stage 1.

## The problem

Ajo groups often coordinate through chats or spreadsheets, making it difficult to see who has contributed, what remains outstanding, and whose payout turn is next. Ajora brings these details together in a shared dashboard.

## Features and views

- **Overview (`/dashboard`)** — group details, contribution totals and progress, and the next payout.
- **Members (`/members`)** — member contribution summaries with name search and payment-status filters.
- **Payout Schedule (`/payout-schedule`)** — payout rotation, recipients, dates, and payout statuses.
- **Contribution History (`/contribution-history`)** — contribution records with search, filters, and visible totals.
- **Settings (`/settings`)** — displayed account and active-group information.
- **Login (`/login`) and Sign-Up (`/signup`)** — client-side form validation and navigation for the prototype.
- **Home (`/`)** — Ajora introduction and links into the application.
- A branded not-found page is shown for unknown routes.
- A valid demo contribution updates the shared dashboard state and is saved in browser `localStorage`, so it persists across refreshes in that browser.

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- `react-icons`
- Vitest, JSDOM, and React Testing Library for automated tests

## Getting started

### Requirements

- Node.js
- npm
- Git

### Install and run locally

```bash
git clone https://github.com/Bolazcoding/ajora.git
cd ajora
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route                   | View                 |
| ----------------------- | -------------------- |
| `/`                     | Home                 |
| `/dashboard`            | Dashboard Overview   |
| `/members`              | Members              |
| `/payout-schedule`      | Payout Schedule      |
| `/contribution-history` | Contribution History |
| `/settings`             | Settings             |
| `/login`                | Login                |
| `/signup`               | Sign-Up              |
| Any unknown route       | Not-found page       |

## Project commands

```bash
npm run dev
npm run lint
npx tsc --noEmit --incremental false
npm test
npm run build
npm run start
```

`npm run start` serves the production build created by `npm run build`.

## Sample data and limitations

Ajora uses sample Ajo group data and fixed demonstration dates. Dates and statuses represent a demo scenario and do not automatically advance with the calendar. Contribution changes are stored only in the current browser's `localStorage`; clearing browser storage removes those demo changes.

Authentication is not implemented. The login and sign-up forms perform client-side validation only; passing validation navigates to the dashboard and does not create an authenticated account or session. Google sign-in and password reset are not connected. The app does not process payments, transfer funds, or manage real money. It has no backend or database.

## Testing and verification

The following project checks completed successfully:

- ESLint passed with `npm run lint`.
- TypeScript passed with `npx tsc --noEmit --incremental false`.
- **7 automated tests passed across 2 test files** with `npm test`.
- Production build completed successfully with `npm run build`.

## Links

- **GitHub repository:** [github.com/Bolazcoding/ajora](https://github.com/Bolazcoding/ajora)
- **Deployed application:** [mobolaji-ajora.vercel.app](https://mobolaji-ajora.vercel.app/)
