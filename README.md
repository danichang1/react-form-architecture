# React Form Architecture Boilerplate

A lightweight React boilerplate for building form-driven applications with strong typing, validation, and a modular architecture.

This project is designed to be a starting point for developers who want to extend a modern form workflow with:

- React with TypeScript
- TanStack Form for form state management
- Zod for schema validation
- MUI for UI components
- TanStack Router for route-based rendering
- TanStack Query for API queries and mutation handling
- Vite+ as the frontend build and dev toolchain

The current example includes a single form feature with typed validation and a structure intended to be easy to grow into a larger application.

## Features

- Strongly typed form schema and validation
- Centralized form state management
- Route composition using `@tanstack/react-router`
- Vite+ development and build workflow
- Example Playwright test in `tests/form.spec.ts`

## Installation

1. Clone the repository

   ```powershell
   git clone https://github.com/danichang1/react-form-architecture.git
   cd react-form-architecture
   ```

2. Install dependencies

   ```powershell
   npm i
   ```

3. Start the development server

   ```powershell
   vp run dev
   ```

4. Open the app in your browser
   - The local development URL is printed in the terminal by `vp run dev`

## Available Scripts

- `vp run dev` — start the Vite+ development server
- `vp run build` — run TypeScript build and bundle the app for production

## Testing

This project includes an example Playwright test in `tests/form.spec.ts`.

Run tests with the Playwright CLI:

```powershell
npx playwright test
```

In the future, if more isolated component tests are needed, it may make sense to include both Playwright and Cypress tests.

## Linting and Formatting

- `vp lint` checks code quality with the Vite+ linting workflow.
- `vp fmt` formats files according to the rules defined in `vite.config.ts`.

## Project Structure

- `src/main.tsx` — application entry point
- `src/routes/__root.tsx` — root route wrapper
- `src/routes/index.tsx` — example route rendering the form
- `src/features/form/Form.tsx` — main form feature container
- `src/features/form/components` — components used within the form feature
- `src/features/form/context/formContext.tsx` — form state and schema context
- `tests/form.spec.ts` — example end-to-end form test

## Naming Conventions

- Folders and directories use `kebab-case`.
- React component files use `PascalCase`.
- Other TypeScript files (`.ts`, `.tsx`) use `camelCase`.
- Keep component names and file names aligned for easier navigation.

## Extending the Boilerplate

To build on this project:

- Add new features under `src/features`
- Add routes in `src/routes`
- Add shared UI components under `src/components`
- Add new validation schemas with Zod into `src/types`
- Wire more data fetching or mutation logic using `@tanstack/react-query`

## Useful References

- Vite+ docs: https://viteplus.dev/guide/
- Playwright docs: https://playwright.dev/docs/intro
- TanStack Router docs: https://tanstack.com/router/latest/docs/overview
- TanStack Query docs: https://tanstack.com/query/latest/docs/framework/react/overview
- TanStack Form docs: https://tanstack.com/form/latest/docs/overview
- This project uses form composition with TanStack Form. More details can be found here: https://tanstack.com/form/latest/docs/framework/react/guides/form-composition
