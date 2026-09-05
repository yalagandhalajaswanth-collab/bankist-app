# Bankist

Bankist is a small browser-based banking application built with vanilla HTML, CSS, and JavaScript. It demonstrates account login, balance calculations, transaction history, transfers, loan requests, account closure, and transaction sorting.

## Features

- Log in with a demo username and PIN
- View the current balance and transaction history
- See total deposits, withdrawals, and interest
- Transfer money between demo accounts
- Request a loan when the account meets the eligibility rule
- Close an account with username and PIN confirmation
- Sort account movements by amount
- Responsive banking dashboard layout

## Demo Accounts

Use the generated username and PIN for any of the accounts below:

| Account holder         | Username | PIN    |
| ---------------------- | -------- | ------ |
| Jonas Schmedtmann      | `js`     | `1111` |
| Jessica Davis          | `jd`     | `2222` |
| Steven Thomas Williams | `stw`    | `3333` |
| Sarah Smith            | `ss`     | `4444` |

## Getting Started

No build tools or dependencies are required.

1. Open `index.html` directly in a web browser, or serve the `starter` folder with a local static server.
2. Enter one of the demo usernames and PINs.
3. Use the dashboard forms to try transfers, loans, sorting, and account closure.

For example, with Python installed:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000> from the `starter` directory.

## Project Structure

```text
starter/
├── index.html          # Application markup
├── script.js           # Accounts, login, calculations, and operations
├── style.css           # Dashboard styling and layout
├── logo.png            # Bankist logo
├── icon.png            # Browser tab icon
├── Bankist-flowchart.png# Application flowchart
└── README.md           # Project documentation
```

## Important Notes

- This is a front-end demonstration only. Account data is stored in memory and resets when the page is refreshed.
- There is no real authentication, database, or backend connection.
- Do not use real banking credentials or financial information.
