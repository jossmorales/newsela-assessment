# Newsela Assessment Playwright Test

This project contains a Playwright end-to-end test for the Newsela assignment workflow. It automates the login flow and validates the assignment creation process in Chromium.

## Prerequisites

Before running the tests, make sure you have the following installed:

- Node.js 18 or newer
- npm
- A browser-compatible environment for Playwright

## Setup

1. Open a terminal in the project root:

   ```bash
   cd c:\Users\Documents\newsela-test
   ```

2. Install project dependencies:

   ```bash
   npm install
   ```

3. Install the Playwright browser binaries:

   ```bash
   npx playwright install
   ```

4. Open the `.env` file in the project root and add your Newsela credentials:

   ```env
   USERNAME=your_username
   PASSWORD=your_password
   ```

   The project loads this file automatically through the Playwright config using `dotenv`.

## Running the tests

Run the full test suite:

```bash
npx playwright test
```

Run the test suite and open the HTML report afterward:

```bash
npm run test-report
```

Debug the test in Playwright's UI mode:

```bash
npm run test-debug
```

## Project structure

- `tests/` - Playwright test files
- `page-object/` - Page Object Model classes for login and assignment flows
- `playwright.config.ts` - Playwright configuration
- `package.json` - Scripts and dependencies

## Notes

- The default configuration targets the `chromium` project.
- Tests are configured to use a visible browser (`headless: false`) for local execution.
- The login flow expects `USERNAME` and `PASSWORD` environment variables to be present in `.env`.
