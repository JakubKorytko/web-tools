# Web Tools

[![Version](https://img.shields.io/github/v/tag/JakubKorytko/web-tools?style=for-the-badge&label=version)](https://img.shields.io/github/v/tag/JakubKorytko/web-tools?style=for-the-badge&label=version)
[![License](https://img.shields.io/github/license/JakubKorytko/web-tools?style=for-the-badge)](https://img.shields.io/github/license/JakubKorytko/web-tools?style=for-the-badge&label=license)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![React Testing-Library](https://img.shields.io/badge/-React_Testing_Library-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![jQuery](https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Stylelint](https://img.shields.io/badge/stylelint-%23FFFFFF.svg?style=for-the-badge&logo=stylelint&logoColor=%23000000)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Create React App](https://img.shields.io/badge/Create_React_App-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2309D3AC)

## Table of Contents

- [Web Tools](#web-tools)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Client installation](#client-installation)
    - [Server installation](#server-installation)
  - [Demo mode](#demo-mode)
  - [Sample user](#sample-user)
  - [Endpoints](#endpoints)
    - [Client endpoints](#client-endpoints)
      - [Client endpoints protected by authentication](#client-endpoints-protected-by-authentication)
    - [Server endpoints](#server-endpoints)
      - [Server authentication protected endpoints](#server-authentication-protected-endpoints)
  - [Production build](#production-build)
  - [Tests](#tests)
  - [Troubleshooting](#troubleshooting)
  - [Contributing](#contributing)
  - [Contact](#contact)
  - [License](#license)
  - [TODO / Upcoming features](#todo--upcoming-features)

## Introduction

Welcome to the Web Tools digital toolkit – a powerful solution designed to simplify your online experience. This project is crafted with the aim of providing lightning-fast link shortening and seamless file hosting, making your digital interactions smoother and more efficient.

In an era where the digital realm is vast and ever-expanding, managing links and files can become a cumbersome task. This toolkit is here to change that. Whether you're looking to share concise links or host files effortlessly, this project offers a robust set of tools to streamline your online activities.

## Prerequisites

**Note:** Versions stated below are the ones used during development. Other versions may work as well, but they have not been tested.

- [Node.js](https://nodejs.org/en/) `v20.10.0`
- [NPM](https://www.npmjs.com/) `v10.2.3`

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/JakubKorytko/web-tools
    ```

1. Enter the project directory:

    ```bash
    cd web-tools
    ```

**Note:** Install & run the client and the server apps (next steps) in separate terminals starting from the project directory.
Running the apps will freeze the terminal until you stop them.

### Client installation

1. Enter the client directory:

    ```bash
    cd client
    ```

1. Create `.env` file (or set environment variables manually):

    ```bash
    REACT_APP_SERVER_URL= # URL of the server app
    REACT_APP_SHORT_URL_PATH= # path to the link shortening endpoint, e.g. /short
    REACT_APP_FILE_URL_PATH= # path to the file hosting endpoint, e.g. /file
    REACT_APP_DEMO= # true if you want to use the demo mode, false otherwise (see below)
    ```

    *Refer to the [`client/.env.example`](client/.env.example) file for an example.*

1. Install dependencies:

    ```bash
    npm install
    ```

1. Start the app:

    ```bash
    npm start
    ```

### Server installation

1. Enter the server directory:

    ```bash
    cd server
    ```

1. Create `.env` file (or set environment variables manually):

    ```bash
    SECRET= # secret used to sign JWT tokens
    PORT= # port on which the server will run
    URI= # whole URI of the server, e.g. http://localhost:3000
    DEMO= # true if you want to use the demo mode, false otherwise (see below)
    ```

    *Refer to the [`server/.env.example`](server/.env.example) file for an example.*

1. Install dependencies:

    ```bash
    npm install
    ```

1. Start the app:

    ```bash
    npm start
    ```

**Note:** Both the client and the server apps need to be running for the project to work.

## Demo mode

In the environment variables, you can set the `DEMO` (`REACT_APP_DEMO` in the client app) variable to `true` to use the demo mode.
In the demo mode, many features are disabled (e.g. you cannot add new links or files to the database or delete existing ones).
This setting is designed strictly for future demo of the repository and does not provide any real functionality.
**You should always set it to `false` if you want to use the app normally.**
This setting will have its default value set to `false` in one of the next patches so that you don't have to worry about it.

## Sample user

The app comes with a sample user that you can use to log in and test the app.\
The user is hardcoded at the moment, but this will change in the future.

- username: `johndoe`
- password: `qwerty123`

To change the user credentials, edit the `server/src/auth.js` file.
Set the value of `CREDENTIALS` (line 3) to base64-encoded `id|username|password` string.

## Endpoints

### Client endpoints

- `GET /login` - login page
- `GET /link/:link` - redirect to the link from the database, params:
  - `link` - string, link to use
- `GET /file/:link` - get file from the database, params:
  - `link` - string, link to use

#### Client endpoints protected by authentication

These endpoints are protected by authentication. To access them, you need to log in first.
If you try to access them without logging in, you will be redirected to the login page.

- `GET /` - home page
- `GET /files` - file hosting page
- `GET /links` - link shortening page

### Server endpoints

The client app uses the server app for authentication and data storage.
There is no need to use the server app directly, but if you want to (or want to use the API for something else),
here are the available endpoints:

- `GET /get` - get table data, payload:
  - `table` - string, table name
- `GET /file/:link` - get file from the database, params:
  - `link` - string, link to use
- `GET /short/:link` - get link from the database, params:
  - `link` - string, link to use
- `POST /login` - login endpoint, payload:
  - `username` - string
  - `password` - string

#### Server authentication protected endpoints

These endpoints require a valid JWT token to work. The token should be passed in the `Authorization` header.

- `GET /` - temporary endpoint, returns a "WebTools API" message
- `POST /auth` - authentication endpoint, returns a username if the token is valid
- `POST /add` - add new link to the database, payload:
  - `src` - string, link to shorten
  - `link` - string, link to use
- `POST /addFile` - add new file to the database, payload (form-data):
  - `file` - file, file to upload
  - `link` - string, link to use
- `POST /del` - delete table data, payload:
  - `table` - string, table name
  - `id` - integer, row ID

## Production build

To build the app for production, run the following command **in the `client` directory**:

```bash
npm run build
```

This will create a production build of the app in the `client/build` directory.

As for the server, remember to set the `NODE_ENV` environment variable to `production` before running the app.

## Tests

---

**As for the `v0.1.1` version, the tests do not cover the majority of the code, and most of the existing tests do not pass due to changes in the project structure. This will be fixed in the next patch.**

---

To run the tests, use the following command **in the `client` or `server` directory** (depending on which tests you want to run):

```bash
npm test
```

Or, run the following command **in the root directory**:

```bash
npm test --prefix app
```

Where `app` is the name of the directory containing the tests (either `client` or `server`)

## Troubleshooting

If you are using Windows or your git client converts line endings to CRLF,
you may encounter the following error when trying to run the app:

```bash
error Expected linebreaks to be 'LF' but found 'CRLF'  linebreak-style
```

This is caused by the fact that the project uses the eslint.
To fix this, you can either:

- change the line endings to LF (recommended)
  - by simply running `npm run eslint -- --fix` in the both `client` and `server` directories
- disable (or change) the eslint rule
  - read more about it [here](https://eslint.style/rules/js/linebreak-style)

Note that if you change the line endings to LF and decide not to disable the eslint rule,
your editor or git client may convert them back to CRLF.
Make sure your editor and git config are set up correctly.

## Contributing

If you find issues or have suggestions for improvements,
feel free to open an issue or submit a pull request.
Contributions are welcome!

## Contact

If you have any questions, feel free to contact me at <jakub@korytko.me>.

## License

This project is released under the MIT License. See the [LICENSE](LICENSE) file for details.

## TODO / Upcoming features

This is a list of features that lead to the `v0.2.0` release:

(This list is not exhaustive and may change at any time.
Patch versions may and probably will be released in the meantime.
Keep in mind that the order of the items is not necessarily the order in which they will be implemented.)

- [ ] Add more tests and fix the existing ones
- [ ] Improve the existing API structure
- [ ] Improve the UI
- [ ] Clean up the code
- [ ] Add new technologies (for both the client and the server) and refactor the code accordingly
- [ ] Implement CI/CD
- [ ] Look for and fix potential security issues, vulnerabilities, and bugs
- [ ] Use TypeScript
