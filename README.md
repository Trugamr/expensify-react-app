# [Expensify](https://trugamr.github.io/expensify-react-app)

A simple expense manager made using react and firebase.

### Features

- **Google Login**
  ![Expenses Summary Preview](/previews/login-preview.png)

- **Expenses Summary**
  ![Expenses Summary Preview](/previews/summary-preview.png)

- **Filter by Expense Name, Date or Amount**
  ![Expenses Summary Preview](/previews/filters-preview.png)

- **Add Expense with Date and Description**
  ![Expenses Summary Preview](/previews/add-expense-preview.png)

---

## Running Project Locally

Installing dependencies using npm

```sh
npm install
```

Update firebase config in `/src/firebase/firebase.js` file with your own config or create `.env` file in root directory with following environment variables

```sh
FIREBASE_API_KEY
FIREBASE_AUTH_DOMAIN
FIREBASE_DATABASE_URL
FIREBASE_PROJECT_ID
FIREBASE_STORAGE_BUCKET
FIREBASE_MESSAGING_SENDER_ID
FIREBASE_APP_ID
```

Running in development environment

```sh
npm run dev-server
```

Building and running in production environment

```sh
npm run build:prod
npm start
```

Running tests

```sh
npm run test
```

---

This project was done to learn the basic principles of [React](https://reactjs.org/), [React Redux](https://react-redux.js.org/), [React Router](https://reactrouter.com/), [Firebase](https://firebase.google.com) and bundling all of this together using [Webpack](https://webpack.js.org/).
