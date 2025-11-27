---

# 🧪 API Automation with Cypress

This project contains an automated test suite developed with **Cypress**, focused on validating API endpoints, authentication, and user and product management.

---

## 🚀 Technologies Used

* [Cypress](https://www.cypress.io/) – Front-end and API testing framework
* [Node.js](https://nodejs.org/) – JavaScript runtime environment
* [Jenkins](https://www.jenkins.io/) – Continuous integration and delivery (CI/CD)

---

## 📁 Project Structure

```
cypress/
├── config/                # Environment settings and data
│   ├── endpoints.js
│   └── testData.js
├── e2e/                   # Main tests
│   ├── auth/
│   │   └── login.cy.js
│   ├── products/
│   │   └── createProduct.cy.js
│   └── users/
│       ├── getUserById.cy.js
│       └── getUsers.cy.js
├── fixtures/              # Schemas and mocked data
│   ├── createProductSchema.json
│   ├── loginSchema.json
│   ├── testData.json
│   ├── userByIdSchema.json
│   └── usersSchema.json
└── logs/        
└── reports/     
└── screenshots/
│             
└── support/               # Commands and auxiliary services
    ├── api/
    │   ├── authService.js
    │   └── userService.js
    ├── helpers/
    │   ├── hashGenerator.js
    │   ├── jwtValidator.js
    │   ├── logger.js
    │   └── schemaValidator.js
    ├── commands.js
    └── e2e.js

cypress.config.js           # Main Cypress configuration
cypress.exemplo.env.json    # Example environment variables
package.json                # Project dependencies
package-lock.json           # Locked dependency tree
Jenkinsfile                 # Pipeline
```

---

## ⚙️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/MarceloRigon/desafio-api-cypress.git
```

2. **Install the dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `cypress.env.json` file based on `cypress.env.example.json` and insert your real credentials and endpoints.

---

### ⚙️ Optional MD5 Support

The project includes optional support for authentication via **dynamic MD5 hash**, implemented in the `AuthService` only for educational purposes or for use with future backends that require this type of validation.

You can enable MD5 mode by adjusting the `cypress.env.json` file:

```json
"USE_MD5": true
```

> 🔒 **Warning:** this mode **must not be used with DummyJSON**, because the server **does not recognize hash fields** in the request body.

---

### 🚫 Why MD5 Cannot Be Used with DummyJSON

The `/auth/login` endpoint from DummyJSON is designed to receive only `username` and `password`.
When MD5 mode is enabled, the client sends a different body, such as:

```json
{
  "username": "test_user",
  "timestamp": 1234567890,
  "hash": "9a761gd76gfha761ha..."
}
```

Since the backend **does not recognize the `timestamp` or `hash` fields**, the API returns the following error:

```
Response: 400 Bad Request
{
  "message": "Invalid credentials" 
}
```

Or in the Cypress log:

```
request POST 400 /auth/login
expected 400 to be one of [200, 201]
```

This confirms that DummyJSON **does not validate MD5 hashes** nor supports signed authentication.
For this reason, the default value of the flag remains:

```json
"USE_MD5": false
```

so that tests use the authentication format officially supported.

---

### 🧩 Conclusion

* The project supports **two authentication modes**:
  🔸 *Standard* — via `username` and `password` (default)
  🔸 *Optional* — via `MD5` hash (for other backends, disabled by default)

* When using DummyJSON, **always keep `"USE_MD5": false"`.**

* The `400 Bad Request` error occurs because the backend **does not recognize the hash-based login format**.

---

## ▶️ Running the Tests

### Interactive mode (Cypress GUI)

```bash
npx cypress open
```

### Headless mode (for CI/CD)

```bash
npx cypress run
```

By default, execution reports will be displayed in the terminal and also stored in the `reports`, `logs`, and `screenshots` folders.

---

## 🔄 Continuous Integration (Jenkins)

The `Jenkinsfile` defines a pipeline for build steps, dependency installation, and automated test execution.

---
